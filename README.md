# Orbyte - Orchestrated Byte Environment

> AI-powered cloud compliance and sustainability platform for Google Cloud

## Overview

Orbyte is a next-generation AI copilot that automates cloud compliance, sustainability monitoring, and remediation inside a secure Google Cloud environment. The platform reduces audit preparation time by ~50% and enables 10-20% energy/emissions savings.

## Features

- 🔒 **Automated Compliance**: Continuous evidence collection for NIST 800-53, SOC 2, ISO 27001
- 🌱 **Sustainability Intelligence**: Real-time energy and emissions tracking with optimization recommendations
- 🤖 **AI-Powered Analysis**: Vertex AI (Gemini) integration for intelligent insights
- ⚡ **Automated Remediation**: Playbook-based automated fixes
- 💬 **Natural Language Chat**: Ask questions about compliance and sustainability

## Quick Start

### Prerequisites

- Node.js 18+
- Google Cloud Project with billing enabled
- Service account with BigQuery and Vertex AI permissions

### Installation

```bash
# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your GCP project ID

# Initialize BigQuery datasets
# See docs/ARCHITECTURE.md for schema setup

# Run development server
npm run dev
```

Visit `http://localhost:3000` to see the dashboard.

## Project Structure

```
orbyte/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── chat/              # Chat interface
│   └── page.tsx           # Dashboard
├── components/            # React components
│   ├── Dashboard.tsx
│   ├── Header.tsx
│   └── panels/           # Dashboard panels
├── backend/              # Backend services
│   ├── engines/          # Compliance & Sustainability engines
│   ├── functions/        # Cloud Functions
│   ├── ai/               # Vertex AI integration
│   └── playbooks/        # Automated playbooks
├── backend/database/     # BigQuery schemas
└── docs/                 # Documentation
```

## Architecture

See [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) for comprehensive architecture documentation.

## Key Components

### Compliance Engine
Maps evidence against compliance frameworks and calculates scores.

### Sustainability Engine
Tracks energy consumption, emissions, and identifies optimization opportunities.

### AI Layer
Vertex AI (Gemini) integration for generating summaries, reports, and playbooks.

### Automated Playbooks
Executable remediation playbooks for compliance and sustainability issues.

## API Endpoints

- `GET /api/compliance` - Get compliance status
- `GET /api/sustainability` - Get sustainability metrics
- `POST /api/chat` - Chat with Orbyte AI

See [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) for full API documentation.

## Development

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint
npm run lint
```

## Deployment

### Frontend (Vercel)
```bash
vercel deploy
```

### Cloud Functions
```bash
gcloud functions deploy compliance-collector --runtime nodejs20
gcloud functions deploy sustainability-monitor --runtime nodejs20
```

## Documentation

- [Architecture Documentation](./docs/ARCHITECTURE.md) - Complete system architecture
- [BigQuery Schemas](./backend/database/bigquery-schemas.sql) - Database schema definitions

## License

Proprietary - All rights reserved

## Support

For questions or issues, please contact the Orbyte team.

