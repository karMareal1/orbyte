#!/bin/bash

# Orbyte API Testing Script
# Run this after starting the dev server with: npm run dev

echo "🧪 Testing Orbyte API Endpoints..."
echo ""

BASE_URL="http://localhost:3000"

echo "1. Testing Compliance API..."
curl -s "$BASE_URL/api/compliance" | jq '.' || echo "❌ Failed"
echo ""

echo "2. Testing Compliance API with NIST 800-53..."
curl -s "$BASE_URL/api/compliance?framework=NIST_800_53" | jq '.' || echo "❌ Failed"
echo ""

echo "3. Testing Sustainability API..."
curl -s "$BASE_URL/api/sustainability" | jq '.' || echo "❌ Failed"
echo ""

echo "4. Testing Sustainability Opportunities..."
curl -s "$BASE_URL/api/sustainability?action=opportunities" | jq '.' || echo "❌ Failed"
echo ""

echo "5. Testing Chat API..."
curl -s -X POST "$BASE_URL/api/chat" \
  -H "Content-Type: application/json" \
  -d '{"message": "What is our compliance status?"}' | jq '.' || echo "❌ Failed"
echo ""

echo "✅ API Testing Complete!"
echo ""
echo "💡 Tip: Install jq for better JSON formatting:"
echo "   Windows: choco install jq"
echo "   Mac: brew install jq"
echo "   Linux: apt-get install jq"

