# Orbyte - System Architecture

## A. Executive Summary

**Orbyte (Orchestrated Byte Environment)** is a next-generation AI-powered platform that automates cloud compliance, sustainability monitoring, and remediation within a secure Google Cloud environment. The platform reduces audit preparation time by approximately 50%, enables 10-20% energy/emissions savings, and unifies compliance, engineering, and sustainability teams through intelligent automation.

### Key Capabilities

- **Automated Compliance Evidence Collection**: Continuous monitoring and evidence gathering for NIST 800-53, SOC 2, and ISO 27001
- **Sustainability Intelligence**: Real-time energy consumption and emissions tracking with optimization recommendations
- **AI-Powered Analysis**: Vertex AI (Gemini) integration for generating documentation, summaries, and actionable insights
- **Automated Remediation**: Playbook-based automated fixes for compliance gaps and sustainability opportunities
- **Natural Language Interface**: Chat-based guidance for compliance and green cloud usage

### Impact Metrics

- **50% reduction** in audit preparation time
- **10-20% energy/emissions savings** through automated optimization
- **Unified visibility** across compliance, security, and sustainability
- **100% private cloud** - all analysis stays within organization's GCP perimeter

---

## B. System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (Next.js)                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Dashboard   │  │  Chat UI     │  │  Analytics   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ REST API
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              API Layer (Cloud Functions)                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Compliance   │  │Sustainability│  │   Chat API   │      │
│  │    API       │  │     API      │  │              │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│  Compliance  │  │Sustainability│  │  Vertex AI  │
│   Engine     │  │    Engine    │  │   Service   │
└──────────────┘  └──────────────┘  └──────────────┘
        │                   │                   │
        └───────────────────┼───────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Data Layer (BigQuery)                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Compliance   │  │Sustainability│  │  Playbooks   │      │
│  │   Dataset    │  │   Dataset    │  │   Dataset    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│          Automated Collectors (Cloud Functions)              │
│  ┌──────────────┐  ┌──────────────┐                        │
│  │ Compliance   │  │Sustainability│                        │
│  │  Collector   │  │   Monitor    │                        │
│  └──────────────┘  └──────────────┘                        │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              GCP Resources (Monitoring)                      │
│  Cloud Asset Inventory, Security Command Center,            │
│  Billing API, Carbon Footprint API                          │
└─────────────────────────────────────────────────────────────┘
```

### Component Overview

1. **Frontend Layer**: Next.js React application with dashboard and chat interface
2. **API Layer**: RESTful APIs built with Next.js API routes and Cloud Functions
3. **Engine Layer**: Core business logic for compliance and sustainability
4. **AI Layer**: Vertex AI (Gemini) integration for intelligent analysis
5. **Data Layer**: BigQuery for time-series data storage and analytics
6. **Collector Layer**: Automated Cloud Functions for data ingestion

### Security Architecture

- **Private Cloud Deployment**: All components run within customer's GCP project
- **IAM-based Access Control**: Fine-grained permissions using GCP IAM
- **Data Encryption**: At-rest and in-transit encryption
- **Audit Logging**: All actions logged to Cloud Logging
- **VPC Isolation**: Optional VPC deployment for enhanced security

---

## C. Data Pipeline

### Data Flow

```
GCP Resources
    │
    ├─► Cloud Asset Inventory ──► Compliance Collector ──► BigQuery (evidence_log)
    │
    ├─► Billing API ────────────► Sustainability Monitor ──► BigQuery (metrics)
    │
    └─► Security Command Center ─► Compliance Collector ──► BigQuery (evidence_log)
    
BigQuery
    │
    ├─► Compliance Engine ──► Compliance Mappings ──► Dashboard
    │
    └─► Sustainability Engine ──► Savings Opportunities ──► Dashboard
```

### Data Collection Schedule

- **Compliance Evidence**: Every 6 hours (configurable)
- **Sustainability Metrics**: Every 1 hour
- **Risk Assessment**: Real-time via Security Command Center webhooks
- **Playbook Execution**: On-demand or scheduled

### Data Retention

- **Evidence Log**: 7 years (compliance requirement)
- **Metrics**: 2 years (with monthly aggregation)
- **Playbook Executions**: 1 year
- **AI Reports**: 90 days

---

## D. AI Layer

### Vertex AI Integration

**Model**: Gemini Pro
**Location**: us-central1 (configurable)

### AI Capabilities

1. **Compliance Summaries**: Generate executive summaries from compliance data
2. **Sustainability Reports**: Create comprehensive sustainability analysis
3. **Remediation Playbooks**: Generate step-by-step remediation instructions
4. **Natural Language Q&A**: Answer compliance and sustainability questions
5. **Gap Analysis**: Identify and explain compliance gaps

### Prompt Engineering

All prompts follow a structured format:
- Role definition
- Context provision
- Output format specification
- Example-based learning

### Cost Optimization

- Caching of frequently requested analyses
- Batch processing for reports
- Token optimization in prompts

---

## E. Compliance Engine

### Supported Frameworks

1. **NIST 800-53**: 20+ controls mapped
2. **SOC 2**: Type II controls
3. **ISO 27001**: 14 control domains

### Compliance Mapping Logic

```typescript
Evidence → Framework Control → Status → Score
```

### Control Mapping Examples

| GCP Resource | Evidence | NIST 800-53 | SOC 2 | ISO 27001 |
|-------------|----------|-------------|-------|-----------|
| Compute Instance | Encryption enabled | SC-28 | CC6.7 | A.10.1.1 |
| IAM Policy | Restrictive access | AC-3 | CC6.2 | A.9.1.1 |
| Cloud Logging | Logging enabled | AU-2 | CC7.2 | A.12.4.1 |

### Scoring Algorithm

```
Compliance Score = (Compliant Controls / Total Controls) × 100
```

### Gap Identification

- Compares required vs. present evidence
- Identifies missing controls
- Prioritizes by risk level

---

## F. Sustainability Engine

### Metrics Calculated

1. **Energy Consumption**: kWh per resource
2. **Emissions**: kg CO2 equivalent
3. **Carbon Intensity**: Regional carbon factors
4. **Utilization**: Resource efficiency
5. **Idle Time**: Unused resource hours

### Regional Carbon Intensity

| Region | Carbon Intensity (kg CO2/kWh) |
|--------|-------------------------------|
| us-central1 | 0.412 |
| us-east1 | 0.412 |
| europe-west1 | 0.276 |
| asia-east1 | 0.570 |

### Savings Opportunities

1. **Shutdown Idle Resources**: >30 days idle, <10% utilization
2. **Migrate to Greener Regions**: High-carbon to low-carbon regions
3. **Optimize Configuration**: Right-size instances, enable auto-scaling

### Scoring Algorithm

```
Sustainability Score = 100 - (Actual Emissions / Baseline) × 100
Baseline = 1000 kg CO2/month (medium org)
```

---

## G. Automated Playbooks

### Playbook Structure

```json
{
  "id": "playbook-123",
  "name": "Enable Encryption on Storage",
  "category": "COMPLIANCE",
  "steps": [
    {
      "id": "step-1",
      "action": "Enable encryption on bucket",
      "command": "gsutil encryption set gs://bucket-name",
      "validation": "Check encryption status",
      "rollback": "Disable encryption"
    }
  ],
  "preconditions": ["IAM permission: storage.buckets.update"],
  "postconditions": ["Encryption enabled", "Compliance status updated"]
}
```

### Playbook Categories

1. **Compliance**: Fix compliance gaps
2. **Sustainability**: Optimize resource usage
3. **Security**: Remediate security issues

### Execution Flow

```
Generate Playbook → Validate Preconditions → Execute Steps → 
Validate Postconditions → Update Status → Log Results
```

### Rollback Mechanism

- Each step can have a rollback command
- Automatic rollback on failure
- Manual rollback option available

---

## H. Dashboard Specs

### Dashboard Components

1. **Compliance Status Panel**
   - Overall compliance indicator
   - Framework-specific scores
   - Visual grid representation
   - Key metrics (emissions, regional breakdown)

2. **Savings Opportunities Panel**
   - List of identified opportunities
   - Potential savings percentage
   - Actionable recommendations

3. **Risk Assessment Panel**
   - Security issues count
   - Risk trends over time
   - Critical vs. low-risk breakdown

4. **Compliance & Emissions Trends**
   - Dual-line chart
   - 6-month historical view
   - Compliance score vs. emissions

5. **Risk Assessment Trends**
   - Risk score over time
   - Weekly granularity

### Data Refresh

- Real-time: Risk assessment
- 1 hour: Compliance status
- 6 hours: Trends and opportunities

---

## I. API Specs

### Compliance API

**GET /api/compliance**
- Query params: `framework`, `resourceId`
- Returns: Compliance score, gaps, status

**GET /api/compliance/score**
- Query params: `framework`
- Returns: Numerical score (0-100)

### Sustainability API

**GET /api/sustainability**
- Query params: `action` (emissions, opportunities, score, regional)
- Returns: Metrics based on action

**GET /api/sustainability/opportunities**
- Returns: List of savings opportunities

### Chat API

**POST /api/chat**
- Body: `{ message: string, context?: object }`
- Returns: `{ response: string, timestamp: string }`

### Playbook API

**POST /api/playbooks/generate**
- Body: `{ issue: string, category: string, context: object }`
- Returns: Generated playbook

**POST /api/playbooks/execute**
- Body: `{ playbookId: string }`
- Returns: Execution status

---

## J. Code Examples

### Example 1: Compliance Evidence Collection

```typescript
import { ComplianceEngine } from '@/backend/engines/compliance-engine';

const engine = new ComplianceEngine();
const score = await engine.calculateComplianceScore('NIST_800_53');
const gaps = await engine.identifyGaps('NIST_800_53');
```

### Example 2: Sustainability Analysis

```typescript
import { SustainabilityEngine } from '@/backend/engines/sustainability-engine';

const engine = new SustainabilityEngine();
const emissions = await engine.calculateEmissions(startDate, endDate);
const opportunities = await engine.identifySavingsOpportunities();
```

### Example 3: AI-Powered Summary

```typescript
import { VertexAIService } from '@/backend/ai/vertex-ai-service';

const ai = new VertexAIService('project-id');
const summary = await ai.generateComplianceSummary('NIST_800_53', complianceData);
```

### Example 4: Playbook Execution

```typescript
import { PlaybookExecutor } from '@/backend/playbooks/playbook-executor';

const executor = new PlaybookExecutor(vertexAI, complianceEngine, sustainabilityEngine);
const playbook = await executor.generatePlaybook('Enable encryption', 'COMPLIANCE', context);
const result = await executor.executePlaybook(playbook);
```

---

## K. Developer Deliverables

### Project Structure

```
orbyte/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── chat/              # Chat page
│   └── page.tsx           # Dashboard page
├── components/            # React components
│   ├── Dashboard.tsx
│   ├── Header.tsx
│   └── panels/           # Dashboard panels
├── backend/              # Backend services
│   ├── engines/          # Business logic engines
│   ├── functions/        # Cloud Functions
│   ├── ai/               # AI services
│   └── playbooks/        # Playbook system
├── backend/database/     # BigQuery schemas
└── docs/                 # Documentation
```

### Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure GCP**
   - Set `GOOGLE_CLOUD_PROJECT` environment variable
   - Create service account with required permissions
   - Enable APIs: BigQuery, Vertex AI, Cloud Functions

3. **Setup BigQuery**
   ```bash
   bq mk --dataset orbyte_compliance
   bq mk --dataset orbyte_sustainability
   bq mk --dataset orbyte_playbooks
   bq mk --dataset orbyte_ai
   ```
   Then run `backend/database/bigquery-schemas.sql`

4. **Deploy Cloud Functions**
   ```bash
   gcloud functions deploy compliance-collector --runtime nodejs20
   gcloud functions deploy sustainability-monitor --runtime nodejs20
   ```

5. **Run Development Server**
   ```bash
   npm run dev
   ```

### Environment Variables

```env
GOOGLE_CLOUD_PROJECT=your-project-id
NEXT_PUBLIC_API_URL=http://localhost:3000/api
VERTEX_AI_LOCATION=us-central1
```

### Testing

- Unit tests for engines
- Integration tests for API routes
- E2E tests for dashboard

### Deployment

- Frontend: Vercel or Cloud Run
- Backend: Cloud Functions
- Database: BigQuery (managed)

---

## Conclusion

Orbyte provides a comprehensive, AI-powered solution for cloud compliance and sustainability. The architecture is designed for scalability, security, and ease of deployment within a customer's private GCP environment.

