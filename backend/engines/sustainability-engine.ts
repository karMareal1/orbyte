/**
 * Sustainability Engine
 * Calculates energy consumption, emissions, and identifies optimization opportunities
 */

import { BigQuery } from '@google-cloud/bigquery';

interface ResourceMetrics {
  resource_id: string;
  resource_type: string;
  region: string;
  energy_kwh: number;
  emissions_kg_co2: number;
  utilization: number;
  idle_hours: number;
}

interface SavingsOpportunity {
  resource_id: string;
  opportunity_type: 'SHUTDOWN_IDLE' | 'MIGRATE_REGION' | 'OPTIMIZE_CONFIG';
  potential_savings_percent: number;
  estimated_emissions_reduction_kg: number;
  description: string;
}

export class SustainabilityEngine {
  private bigquery: BigQuery;
  private carbonIntensityByRegion: Record<string, number> = {
    'us-central1': 0.412,
    'us-east1': 0.412,
    'us-west1': 0.412,
    'europe-west1': 0.276,
    'europe-west4': 0.276,
    'asia-east1': 0.570,
    'asia-southeast1': 0.570,
  };

  constructor() {
    this.bigquery = new BigQuery();
  }

  /**
   * Calculate total emissions for a time period
   */
  async calculateEmissions(
    startDate: Date,
    endDate: Date
  ): Promise<{ total_emissions_kg: number; total_energy_kwh: number }> {
    const query = `
      SELECT 
        SUM(emissions_kg_co2) as total_emissions_kg,
        SUM(energy_kwh) as total_energy_kwh
      FROM \`orbyte_sustainability.metrics\`
      WHERE timestamp BETWEEN @startDate AND @endDate
    `;

    const [rows] = await this.bigquery.query({
      query,
      params: {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      },
    });

    return rows[0] as { total_emissions_kg: number; total_energy_kwh: number };
  }

  /**
   * Identify savings opportunities
   */
  async identifySavingsOpportunities(): Promise<SavingsOpportunity[]> {
    const opportunities: SavingsOpportunity[] = [];

    // Query for idle resources
    const idleQuery = `
      SELECT 
        resource_id,
        resource_type,
        region,
        idle_hours,
        emissions_kg_co2
      FROM \`orbyte_sustainability.metrics\`
      WHERE idle_hours > 720  -- 30 days
      AND utilization < 0.1
    `;

    const [idleResources] = await this.bigquery.query(idleQuery);

    for (const resource of idleResources as ResourceMetrics[]) {
      opportunities.push({
        resource_id: resource.resource_id,
        opportunity_type: 'SHUTDOWN_IDLE',
        potential_savings_percent: 1,
        estimated_emissions_reduction_kg: resource.emissions_kg_co2 * 0.3,
        description: `Shutdown unused instance: ${resource.resource_id}`,
      });
    }

    // Query for resources in high-carbon regions
    const highCarbonQuery = `
      SELECT 
        resource_id,
        region,
        emissions_kg_co2,
        carbon_intensity
      FROM \`orbyte_sustainability.metrics\`
      WHERE carbon_intensity > 0.5
      AND region IN ('asia-east1', 'asia-southeast1')
    `;

    const [highCarbonResources] = await this.bigquery.query(highCarbonQuery);

    for (const resource of highCarbonResources as any[]) {
      const targetRegion = 'europe-west1';
      const newIntensity = this.carbonIntensityByRegion[targetRegion];
      const savingsPercent =
        ((resource.carbon_intensity - newIntensity) / resource.carbon_intensity) *
        100;

      opportunities.push({
        resource_id: resource.resource_id,
        opportunity_type: 'MIGRATE_REGION',
        potential_savings_percent: Math.round(savingsPercent),
        estimated_emissions_reduction_kg: resource.emissions_kg_co2 * (savingsPercent / 100),
        description: `Migrate to greener region: ${targetRegion}`,
      });
    }

    return opportunities;
  }

  /**
   * Calculate sustainability score
   */
  async calculateSustainabilityScore(): Promise<number> {
    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);

    const emissions = await this.calculateEmissions(last30Days, new Date());

    // Normalize score (0-100) based on industry benchmarks
    // Assume 1000 kg CO2/month is baseline for medium-sized org
    const baseline = 1000;
    const score = Math.max(
      0,
      100 - (emissions.total_emissions_kg / baseline) * 100
    );

    return Math.min(100, score);
  }

  /**
   * Get regional emissions breakdown
   */
  async getRegionalEmissions(): Promise<Record<string, number>> {
    const query = `
      SELECT 
        region,
        SUM(emissions_kg_co2) as total_emissions
      FROM \`orbyte_sustainability.metrics\`
      WHERE timestamp >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 30 DAY)
      GROUP BY region
    `;

    const [rows] = await this.bigquery.query(query);

    const breakdown: Record<string, number> = {};
    let total = 0;

    for (const row of rows as any[]) {
      breakdown[row.region] = row.total_emissions;
      total += row.total_emissions;
    }

    // Convert to percentages
    const percentages: Record<string, number> = {};
    for (const [region, emissions] of Object.entries(breakdown)) {
      percentages[region] = (emissions / total) * 100;
    }

    return percentages;
  }
}

