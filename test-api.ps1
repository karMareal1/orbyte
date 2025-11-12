# Orbyte API Testing Script (PowerShell)
# Run this after starting the dev server with: npm run dev

Write-Host "🧪 Testing Orbyte API Endpoints..." -ForegroundColor Cyan
Write-Host ""

$baseUrl = "http://localhost:3000"

Write-Host "1. Testing Compliance API..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/compliance" -Method Get
    $response | ConvertTo-Json -Depth 10
} catch {
    Write-Host "❌ Failed: $_" -ForegroundColor Red
}
Write-Host ""

Write-Host "2. Testing Compliance API with NIST 800-53..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/compliance?framework=NIST_800_53" -Method Get
    $response | ConvertTo-Json -Depth 10
} catch {
    Write-Host "❌ Failed: $_" -ForegroundColor Red
}
Write-Host ""

Write-Host "3. Testing Sustainability API..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/sustainability" -Method Get
    $response | ConvertTo-Json -Depth 10
} catch {
    Write-Host "❌ Failed: $_" -ForegroundColor Red
}
Write-Host ""

Write-Host "4. Testing Sustainability Opportunities..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/sustainability?action=opportunities" -Method Get
    $response | ConvertTo-Json -Depth 10
} catch {
    Write-Host "❌ Failed: $_" -ForegroundColor Red
}
Write-Host ""

Write-Host "5. Testing Chat API..." -ForegroundColor Yellow
try {
    $body = @{
        message = "What is our compliance status?"
    } | ConvertTo-Json

    $response = Invoke-RestMethod -Uri "$baseUrl/api/chat" -Method Post -Body $body -ContentType "application/json"
    $response | ConvertTo-Json -Depth 10
} catch {
    Write-Host "❌ Failed: $_" -ForegroundColor Red
}
Write-Host ""

Write-Host "✅ API Testing Complete!" -ForegroundColor Green

