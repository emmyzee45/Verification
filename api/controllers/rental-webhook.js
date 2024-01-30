const crypto = require('crypto');

// Your webhook secret
const webhookSecret = process.env.TEXTVERIFIED_API_KEY;

// Validate the webhook signature
function validateWebhookSignature(requestBody, signatureHeader) {
  // Extract the signature value without the prefix
  const signature = signatureHeader.replace('HMAC-SHA512=', '');

  // Generate HMAC-SHA512 hash from the request body
  const hmac = crypto.createHmac('sha512', webhookSecret);
  hmac.update(requestBody);
  const calculatedSignature = hmac.digest('base64');

  // Compare the calculated signature with the received signature
  return signature === calculatedSignature;
}