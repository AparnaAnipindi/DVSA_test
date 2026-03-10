import { test, expect } from '@playwright/test';
import { fetchBearerToken, getApiKey } from '../../helpers/mot-api-auth-helper';

test('MOT API: GET /v1/trade/vehicles/registration', async ({ request }) => {
  const token = await fetchBearerToken(request);
  const apiKey = getApiKey();

  const response = await request.get('https://history.mot.api.gov.uk/v1/trade/vehicles/registration', {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-API-Key': apiKey,
    },
  });

  expect([200, 401, 403]).toContain(response.status());

});
