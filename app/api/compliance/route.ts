import { NextRequest, NextResponse } from 'next/server';
import { ComplianceEngine } from '@/backend/engines/compliance-engine';

const complianceEngine = new ComplianceEngine();

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const framework = searchParams.get('framework') as 'NIST_800_53' | 'SOC_2' | 'ISO_27001' | null;
  const resourceId = searchParams.get('resourceId');

  try {
    if (framework) {
      const score = await complianceEngine.calculateComplianceScore(framework, resourceId || undefined);
      const gaps = await complianceEngine.identifyGaps(framework);

      return NextResponse.json({
        framework,
        score,
        gaps,
        resourceId: resourceId || 'all',
      });
    }

    // Return overall compliance status
    return NextResponse.json({
      status: 'COMPLIANT',
      frameworks: {
        NIST_800_53: 85,
        SOC_2: 92,
        ISO_27001: 78,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

