#!/bin/bash
echo "=== Checking for empty files ==="
find . -type f -empty -not -path "*/node_modules/*" -not -path "*/venv/*" -not -path "*/.git/*" | tee /tmp/empty.txt
COUNT=$(wc -l < /tmp/empty.txt | tr -d ' ')
echo ""
echo "Empty files found: $COUNT"
echo ""

echo "=== Checking expected file count ==="
EXPECTED=58
ACTUAL=$(find . -type f -not -path "*/node_modules/*" -not -path "*/venv/*" -not -path "*/.git/*" | wc -l | tr -d ' ')
echo "Expected: $EXPECTED  |  Actual: $ACTUAL"

echo ""
echo "=== Verifying critical files ==="
for f in \
  "frontend/src/App.jsx" \
  "frontend/src/api/chat.js" \
  "frontend/src/api/stripe.js" \
  "frontend/src/pages/chat/Chats.jsx" \
  "frontend/src/pages/worker/Payouts.jsx" \
  "gateway/src/index.js" \
  "gateway/src/routes/stripe.js" \
  "backend/app/main.py" \
  "backend/app/routes/stripe_webhook.py" \
  "backend/app/services/cloudinary_service.py" \
  "firebase/realtime-database.rules.json" \
  ; do
  if [ -s "$f" ]; then
    SIZE=$(wc -c < "$f" | tr -d ' ')
    echo "✅ $f ($SIZE bytes)"
  else
    echo "❌ MISSING or EMPTY: $f"
  fi
done