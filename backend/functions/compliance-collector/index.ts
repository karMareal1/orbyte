/**
 * Cloud Function: Compliance Evidence Collector
 * Automatically collects compliance evidence from GCP resources
 */

import { CloudFunctionsEvent } from '@google-cloud/functions-framework';
import { BigQuery } from '@google-cloud/bigquery';

const bigquery = new BigQuery();

interface ComplianceEvidence {
  resource_id: string;
  resource_type: string;
  framework: 'NIST_800_53' | 'SOC_2' | 'ISO_27001';
  control_id: string;
  status: 'COMPLIANT' | 'NON_COMPLIANT' | 'NOT_APPLICABLE';
  evidence: Record<string, any>;
  timestamp: string;
}

export async function complianceCollector(
  event: CloudFunctionsEvent
): Promise<void> {
  console.log('Compliance evidence collection triggered');

  const datasetId = 'orbyte_compliance';
  const tableId = 'evidence_log';

  // Simulate evidence collection from GCP resources
  const evidence: ComplianceEvidence[] = await collectEvidence();

  // Insert into BigQuery
  await bigquery
    .dataset(datasetId)
    .table(tableId)
    .insert(evidence);

  console.log(`Inserted ${evidence.length} evidence records`);
}

async function collectEvidence(): Promise<ComplianceEvidence[]> {
  // In production, this would query GCP APIs (Cloud Asset Inventory, Security Command Center, etc.)
  return [
    {
      resource_id: 'project-123/compute-instance-1',
      resource_type: 'compute.instance',
      framework: 'NIST_800_53',
      control_id: 'AC-3',
      status: 'COMPLIANT',
      evidence: {
        encryption_enabled: true,
        iam_policy: 'restrictive',
      },
      timestamp: new Date().toISOString(),
    },
  ];
}

