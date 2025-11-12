import { NextRequest, NextResponse } from 'next/server';
import { VertexAIService } from '@/backend/ai/vertex-ai-service';

// Initialize Vertex AI service (in production, use environment variables)
const vertexAI = new VertexAIService(
  process.env.GOOGLE_CLOUD_PROJECT || 'your-project-id'
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, context } = body;

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // In production, fetch actual context from BigQuery
    const defaultContext = {
      compliance_status: 'COMPLIANT',
      frameworks: ['NIST_800_53', 'SOC_2', 'ISO_27001'],
      emissions_last_30_days: 4.5,
    };

    const response = await vertexAI.answerComplianceQuestion(
      message,
      context || defaultContext
    );

    return NextResponse.json({
      response,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

