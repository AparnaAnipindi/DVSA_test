import type { APIRequestContext } from '@playwright/test';
import { ConfidentialClientApplication } from '@azure/msal-node';

function getEnvVar(name: string, fallback?: string): string {
  const value = process.env[name] || fallback;
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

const msalConfig = {
  auth: {
    clientId: getEnvVar('CLIENT_ID'),
    authority: `https://login.microsoftonline.com/${getEnvVar('TENANT_ID')}`,
    clientSecret: getEnvVar('CLIENT_SECRET'),
  },
};

const cca = new ConfidentialClientApplication(msalConfig);

export async function getBearerToken(): Promise<string> {
  const SCOPE = getEnvVar('SCOPE', 'https://tapi.dvsa.gov.uk/.default');
  const result = await cca.acquireTokenByClientCredential({
    scopes: [SCOPE],
  });
  if (!result || !result.accessToken) throw new Error('Failed to acquire access token');
  process.env.ACCESS_TOKEN = result.accessToken;
  return result.accessToken;
}

export function getApiKey(): string {
  return getEnvVar('API_KEY');
}

// Helper to fetch a bearer token using Playwright's APIRequestContext (no MSAL caching)
export async function fetchBearerToken(request: APIRequestContext): Promise<string> {
  const TENANT_ID = getEnvVar('TENANT_ID');
  const CLIENT_ID = getEnvVar('CLIENT_ID');
  const CLIENT_SECRET = getEnvVar('CLIENT_SECRET');
  const SCOPE = getEnvVar('SCOPE', 'https://tapi.dvsa.gov.uk/.default');
  const url = `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token`;
  const params = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    scope: SCOPE,
  });
  const response = await request.post(url, {
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    form: Object.fromEntries(params.entries()),
  });
  if (!response.ok()) throw new Error('Failed to fetch token with Playwright');
  const data = await response.json();
  process.env.ACCESS_TOKEN = data.access_token;
  return data.access_token;
}
