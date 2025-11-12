import { NextRequest, NextResponse } from 'next/server';
import { SustainabilityEngine } from '@/backend/engines/sustainability-engine';

const sustainabilityEngine = new SustainabilityEngine();

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const action = searchParams.get('action');

  try {
    switch (action) {
      case 'emissions':
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 30);

        const emissions = await sustainabilityEngine.calculateEmissions(startDate, endDate);
        return NextResponse.json(emissions);

      case 'opportunities':
        const opportunities = await sustainabilityEngine.identifySavingsOpportunities();
        return NextResponse.json({ opportunities });

      case 'score':
        const score = await sustainabilityEngine.calculateSustainabilityScore();
        return NextResponse.json({ score });

      case 'regional':
        const regional = await sustainabilityEngine.getRegionalEmissions();
        return NextResponse.json({ regional });

      default:
        return NextResponse.json({
          emissions_last_30_days_kg: 4.5,
          energy_last_30_days_kwh: 10.9,
          regional_breakdown: {
            'us-central1': 32,
            'europe-west1': 45,
            'asia-east1': 23,
          },
        });
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

