/**
 * Compliance Engine
 * Maps evidence against compliance frameworks (NIST 800-53, SOC 2, ISO 27001)
 */

import { BigQuery } from '@google-cloud/bigquery';

export type Framework = 'NIST_800_53' | 'SOC_2' | 'ISO_27001';
export type ComplianceStatus = 'COMPLIANT' | 'NON_COMPLIANT' | 'PARTIAL' | 'NOT_APPLICABLE';

interface ComplianceControl {
  framework: Framework;
  control_id: string;
  control_name: string;
  description: string;
  evidence_requirements: string[];
}

interface ComplianceMapping {
  resource_id: string;
  framework: Framework;
  control_id: string;
  status: ComplianceStatus;
  evidence_count: number;
  last_assessed: string;
  gaps: string[];
}

export class ComplianceEngine {
  private bigquery: BigQuery;

  constructor() {
    this.bigquery = new BigQuery();
  }

  /**
   * Map evidence to compliance frameworks
   */
  async mapEvidenceToFrameworks(
    resourceId: string,
    evidence: Record<string, any>
  ): Promise<ComplianceMapping[]> {
    const mappings: ComplianceMapping[] = [];

    // NIST 800-53 mappings
    if (evidence.encryption_enabled) {
      mappings.push({
        resource_id: resourceId,
        framework: 'NIST_800_53',
        control_id: 'SC-28',
        status: 'COMPLIANT',
        evidence_count: 1,
        last_assessed: new Date().toISOString(),
        gaps: [],
      });
    }

    if (evidence.iam_policy === 'restrictive') {
      mappings.push({
        resource_id: resourceId,
        framework: 'NIST_800_53',
        control_id: 'AC-3',
        status: 'COMPLIANT',
        evidence_count: 1,
        last_assessed: new Date().toISOString(),
        gaps: [],
      });
    }

    // SOC 2 mappings
    if (evidence.logging_enabled) {
      mappings.push({
        resource_id: resourceId,
        framework: 'SOC_2',
        control_id: 'CC6.1',
        status: 'COMPLIANT',
        evidence_count: 1,
        last_assessed: new Date().toISOString(),
        gaps: [],
      });
    }

    // ISO 27001 mappings
    if (evidence.access_controls) {
      mappings.push({
        resource_id: resourceId,
        framework: 'ISO_27001',
        control_id: 'A.9.1.1',
        status: 'COMPLIANT',
        evidence_count: 1,
        last_assessed: new Date().toISOString(),
        gaps: [],
      });
    }

    return mappings;
  }

  /**
   * Calculate overall compliance score
   */
  async calculateComplianceScore(
    framework: Framework,
    resourceId?: string
  ): Promise<number> {
    // Query BigQuery for compliance status
    const query = `
      SELECT 
        COUNT(*) as total_controls,
        SUM(CASE WHEN status = 'COMPLIANT' THEN 1 ELSE 0 END) as compliant_controls
      FROM \`orbyte_compliance.compliance_mappings\`
      WHERE framework = @framework
      ${resourceId ? 'AND resource_id = @resourceId' : ''}
    `;

    const options = {
      query,
      params: { framework, resourceId: resourceId || null },
    };

    const [rows] = await this.bigquery.query(options);
    const row = rows[0] as { total_controls: number; compliant_controls: number };

    if (row.total_controls === 0) return 0;

    return (row.compliant_controls / row.total_controls) * 100;
  }

  /**
   * Identify compliance gaps
   */
  async identifyGaps(framework: Framework): Promise<string[]> {
    const query = `
      SELECT DISTINCT control_id, control_name
      FROM \`orbyte_compliance.compliance_mappings\`
      WHERE framework = @framework
      AND status IN ('NON_COMPLIANT', 'PARTIAL')
    `;

    const [rows] = await this.bigquery.query({
      query,
      params: { framework },
    });

    return rows.map((row: any) => `${row.control_id}: ${row.control_name}`);
  }
}

