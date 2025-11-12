# Orbyte Deployment Guide

## Prerequisites

1. **Google Cloud Project**
   - Active GCP project with billing enabled
   - Required APIs enabled:
     - BigQuery API
     - Vertex AI API
     - Cloud Functions API
     - Cloud Asset Inventory API
     - Security Command Center API (optional)

2. **Service Account**
   - Create service account with following roles:
     - BigQuery Admin
     - Vertex AI User
     - Cloud Functions Developer
     - Security Reviewer (for compliance collection)

3. **Node.js Environment**
   - Node.js 18+ installed
   - npm or yarn package manager

## Step 1: Clone and Install

```bash
git clone <repository-url>
cd orbyte
npm install
```

## Step 2: Configure Environment

Create `.env.local` file:

```env
GOOGLE_CLOUD_PROJECT=your-project-id
NEXT_PUBLIC_API_URL=http://localhost:3000/api
VERTEX_AI_LOCATION=us-central1
```

## Step 3: Setup BigQuery

### Create Datasets

```bash
bq mk --dataset ${GOOGLE_CLOUD_PROJECT}:orbyte_compliance
bq mk --dataset ${GOOGLE_CLOUD_PROJECT}:orbyte_sustainability
bq mk --dataset ${GOOGLE_CLOUD_PROJECT}:orbyte_playbooks
bq mk --dataset ${GOOGLE_CLOUD_PROJECT}:orbyte_ai
```

### Create Tables

```bash
bq query --use_legacy_sql=false < backend/database/bigquery-schemas.sql
```

Or run the SQL file directly in BigQuery console.

## Step 4: Deploy Cloud Functions

### Compliance Collector

```bash
cd backend/functions/compliance-collector
gcloud functions deploy compliance-collector \
  --runtime nodejs20 \
  --trigger-http \
  --entry-point complianceCollector \
  --set-env-vars GOOGLE_CLOUD_PROJECT=${GOOGLE_CLOUD_PROJECT} \
  --service-account your-service-account@project.iam.gserviceaccount.com
```

### Sustainability Monitor

```bash
cd backend/functions/sustainability-monitor
gcloud functions deploy sustainability-monitor \
  --runtime nodejs20 \
  --trigger-http \
  --entry-point sustainabilityMonitor \
  --set-env-vars GOOGLE_CLOUD_PROJECT=${GOOGLE_CLOUD_PROJECT} \
  --service-account your-service-account@project.iam.gserviceaccount.com
```

### Schedule Functions (Optional)

```bash
# Compliance collector every 6 hours
gcloud scheduler jobs create http compliance-collector-job \
  --schedule="0 */6 * * *" \
  --uri="https://REGION-PROJECT.cloudfunctions.net/compliance-collector" \
  --http-method=POST

# Sustainability monitor every hour
gcloud scheduler jobs create http sustainability-monitor-job \
  --schedule="0 * * * *" \
  --uri="https://REGION-PROJECT.cloudfunctions.net/sustainability-monitor" \
  --http-method=POST
```

## Step 5: Deploy Frontend

### Option A: Vercel (Recommended)

```bash
npm install -g vercel
vercel login
vercel deploy
```

Configure environment variables in Vercel dashboard.

### Option B: Cloud Run

```bash
# Build Docker image
docker build -t gcr.io/${GOOGLE_CLOUD_PROJECT}/orbyte-frontend .

# Push to Container Registry
docker push gcr.io/${GOOGLE_CLOUD_PROJECT}/orbyte-frontend

# Deploy to Cloud Run
gcloud run deploy orbyte-frontend \
  --image gcr.io/${GOOGLE_CLOUD_PROJECT}/orbyte-frontend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

### Option C: Local Development

```bash
npm run dev
```

Visit `http://localhost:3000`

## Step 6: Verify Deployment

1. **Check BigQuery Tables**
   ```bash
   bq ls orbyte_compliance
   bq ls orbyte_sustainability
   ```

2. **Test API Endpoints**
   ```bash
   curl http://localhost:3000/api/compliance
   curl http://localhost:3000/api/sustainability
   ```

3. **Check Cloud Functions**
   ```bash
   gcloud functions list
   ```

## Step 7: Initial Data Population

Run the collectors manually to populate initial data:

```bash
# Trigger compliance collector
curl -X POST https://REGION-PROJECT.cloudfunctions.net/compliance-collector

# Trigger sustainability monitor
curl -X POST https://REGION-PROJECT.cloudfunctions.net/sustainability-monitor
```

## Monitoring and Maintenance

### View Logs

```bash
# Cloud Functions logs
gcloud functions logs read compliance-collector --limit 50

# Application logs (if using Cloud Run)
gcloud run services logs read orbyte-frontend --limit 50
```

### Update Deployment

```bash
# Update functions
gcloud functions deploy compliance-collector --source backend/functions/compliance-collector

# Update frontend
vercel deploy --prod
```

## Troubleshooting

### Common Issues

1. **Permission Denied**
   - Verify service account has required roles
   - Check IAM bindings

2. **BigQuery Errors**
   - Verify datasets and tables exist
   - Check service account has BigQuery Admin role

3. **Vertex AI Errors**
   - Verify Vertex AI API is enabled
   - Check region configuration

4. **Function Timeout**
   - Increase timeout: `--timeout 540s`
   - Optimize query performance

## Security Considerations

1. **Service Account Keys**
   - Never commit keys to repository
   - Use Workload Identity when possible
   - Rotate keys regularly

2. **API Security**
   - Implement authentication for production
   - Use API keys or OAuth
   - Enable CORS restrictions

3. **Data Access**
   - Use least privilege principle
   - Enable audit logging
   - Encrypt sensitive data

## Cost Optimization

1. **BigQuery**
   - Use partitioned tables
   - Set up table expiration
   - Use query caching

2. **Cloud Functions**
   - Optimize cold start times
   - Use appropriate memory allocation
   - Monitor execution times

3. **Vertex AI**
   - Cache AI responses
   - Batch requests when possible
   - Use appropriate model tiers

