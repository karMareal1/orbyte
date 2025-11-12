-- Orbyte BigQuery Schemas
-- Compliance Dataset

CREATE SCHEMA IF NOT EXISTS `orbyte_compliance`
OPTIONS(
  description="Compliance evidence and mapping data"
);

-- Evidence Log Table
CREATE TABLE IF NOT EXISTS `orbyte_compliance.evidence_log` (
  resource_id STRING NOT NULL,
  resource_type STRING NOT NULL,
  framework STRING NOT NULL, -- NIST_800_53, SOC_2, ISO_27001
  control_id STRING NOT NULL,
  status STRING NOT NULL, -- COMPLIANT, NON_COMPLIANT, NOT_APPLICABLE
  evidence JSON,
  timestamp TIMESTAMP NOT NULL,
  collected_by STRING,
  source_system STRING
)
PARTITION BY DATE(timestamp)
CLUSTER BY framework, control_id
OPTIONS(
  description="Raw compliance evidence collected from GCP resources"
);

-- Compliance Mappings Table
CREATE TABLE IF NOT EXISTS `orbyte_compliance.compliance_mappings` (
  resource_id STRING NOT NULL,
  framework STRING NOT NULL,
  control_id STRING NOT NULL,
  control_name STRING,
  status STRING NOT NULL,
  evidence_count INTEGER,
  last_assessed TIMESTAMP NOT NULL,
  gaps ARRAY<STRING>,
  remediation_playbook_id STRING
)
PARTITION BY DATE(last_assessed)
CLUSTER BY framework, control_id
OPTIONS(
  description="Mapped compliance status by framework and control"
);

-- Compliance Scores Table
CREATE TABLE IF NOT EXISTS `orbyte_compliance.compliance_scores` (
  resource_id STRING,
  framework STRING NOT NULL,
  score FLOAT64 NOT NULL, -- 0-100
  total_controls INTEGER,
  compliant_controls INTEGER,
  calculated_at TIMESTAMP NOT NULL
)
PARTITION BY DATE(calculated_at)
CLUSTER BY framework
OPTIONS(
  description="Calculated compliance scores by framework"
);

-- Sustainability Dataset
CREATE SCHEMA IF NOT EXISTS `orbyte_sustainability`
OPTIONS(
  description="Sustainability metrics and emissions data"
);

-- Sustainability Metrics Table
CREATE TABLE IF NOT EXISTS `orbyte_sustainability.metrics` (
  resource_id STRING NOT NULL,
  resource_type STRING NOT NULL,
  region STRING NOT NULL,
  energy_kwh FLOAT64 NOT NULL,
  emissions_kg_co2 FLOAT64 NOT NULL,
  timestamp TIMESTAMP NOT NULL,
  carbon_intensity FLOAT64, -- kg CO2 per kWh
  utilization FLOAT64, -- 0-1
  idle_hours INTEGER,
  instance_type STRING,
  project_id STRING
)
PARTITION BY DATE(timestamp)
CLUSTER BY region, resource_type
OPTIONS(
  description="Resource-level sustainability metrics"
);

-- Savings Opportunities Table
CREATE TABLE IF NOT EXISTS `orbyte_sustainability.savings_opportunities` (
  opportunity_id STRING NOT NULL,
  resource_id STRING NOT NULL,
  opportunity_type STRING NOT NULL, -- SHUTDOWN_IDLE, MIGRATE_REGION, OPTIMIZE_CONFIG
  potential_savings_percent FLOAT64,
  estimated_emissions_reduction_kg FLOAT64,
  estimated_cost_savings_usd FLOAT64,
  description STRING,
  status STRING, -- OPEN, IN_PROGRESS, COMPLETED, REJECTED
  created_at TIMESTAMP NOT NULL,
  completed_at TIMESTAMP
)
PARTITION BY DATE(created_at)
CLUSTER BY opportunity_type, status
OPTIONS(
  description="Identified sustainability savings opportunities"
);

-- Playbooks Dataset
CREATE SCHEMA IF NOT EXISTS `orbyte_playbooks`
OPTIONS(
  description="Remediation playbooks and execution logs"
);

-- Playbooks Table
CREATE TABLE IF NOT EXISTS `orbyte_playbooks.playbooks` (
  playbook_id STRING NOT NULL,
  name STRING NOT NULL,
  description STRING,
  category STRING NOT NULL, -- COMPLIANCE, SUSTAINABILITY, SECURITY
  steps JSON NOT NULL,
  preconditions ARRAY<STRING>,
  postconditions ARRAY<STRING>,
  created_at TIMESTAMP NOT NULL,
  created_by STRING,
  version INTEGER
)
OPTIONS(
  description="Remediation playbook definitions"
);

-- Playbook Executions Table
CREATE TABLE IF NOT EXISTS `orbyte_playbooks.executions` (
  execution_id STRING NOT NULL,
  playbook_id STRING NOT NULL,
  status STRING NOT NULL, -- PENDING, RUNNING, SUCCESS, FAILED, ROLLED_BACK
  steps_completed INTEGER,
  total_steps INTEGER,
  errors ARRAY<STRING>,
  started_at TIMESTAMP NOT NULL,
  completed_at TIMESTAMP,
  executed_by STRING
)
PARTITION BY DATE(started_at)
CLUSTER BY playbook_id, status
OPTIONS(
  description="Playbook execution logs"
);

-- AI Generated Content Dataset
CREATE SCHEMA IF NOT EXISTS `orbyte_ai`
OPTIONS(
  description="AI-generated summaries, reports, and analysis"
);

-- AI Reports Table
CREATE TABLE IF NOT EXISTS `orbyte_ai.reports` (
  report_id STRING NOT NULL,
  report_type STRING NOT NULL, -- COMPLIANCE_SUMMARY, SUSTAINABILITY_REPORT, REMEDIATION_PLAYBOOK
  content STRING NOT NULL,
  context JSON,
  generated_at TIMESTAMP NOT NULL,
  model_used STRING,
  prompt_version STRING
)
PARTITION BY DATE(generated_at)
CLUSTER BY report_type
OPTIONS(
  description="AI-generated reports and summaries"
);

