// Only import auth helpers if running API tests
async function globalSetup() {
  const project = process.env.PLAYWRIGHT_TEST_PROJECT;
  if (project === 'api') {
    // Dynamically import to avoid loading auth code for UI tests
    const { getBearerToken, getApiKey } = await import('./helpers/mot-api-auth-helper');
    await getBearerToken();
    getApiKey();
  }
}

export default globalSetup;
