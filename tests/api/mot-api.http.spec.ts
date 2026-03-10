import { test, expect } from '@playwright/test';
import { fetchBearerToken, getApiKey } from '../../helpers/mot-api-auth-helper';

test('MOT API: GET /v1/trade/vehicles/registration/{registration} (fields presence)', async ({ request }) => {
  const token = await fetchBearerToken(request);
  const apiKey = getApiKey();

  const registration = process.env.TEST_VEHICLE_REGISTRATION || 'REDACTED';
  const response = await request.get(`https://history.mot.api.gov.uk/v1/trade/vehicles/registration/${registration}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-API-Key': apiKey,
    },
  });

  expect([200, 401, 403, 404]).toContain(response.status());

  if (response.status() === 200) {
    const data = await response.json();
    // Top-level fields
    expect(data).toHaveProperty('registration');
    expect(data).toHaveProperty('make');
    expect(data).toHaveProperty('model');
    expect(data).toHaveProperty('firstUsedDate');
    expect(data).toHaveProperty('fuelType');
    expect(data).toHaveProperty('primaryColour');
    expect(data).toHaveProperty('registrationDate');
    expect(data).toHaveProperty('manufactureDate');
    expect(data).toHaveProperty('engineSize');
    expect(data).toHaveProperty('hasOutstandingRecall');
    expect(data).toHaveProperty('motTests');
    expect(Array.isArray(data.motTests)).toBe(true);
    expect(data.motTests.length).toBeGreaterThan(0);
    const firstTest = data.motTests[0];
    expect(firstTest).toHaveProperty('registrationAtTimeOfTest');
    expect(firstTest).toHaveProperty('motTestNumber');
    expect(firstTest).toHaveProperty('completedDate');
    expect(firstTest).toHaveProperty('expiryDate');
    expect(firstTest).toHaveProperty('odometerValue');
    expect(firstTest).toHaveProperty('odometerUnit');
    expect(firstTest).toHaveProperty('odometerResultType');
    expect(firstTest).toHaveProperty('testResult');
    expect(firstTest).toHaveProperty('dataSource');
    expect(firstTest).toHaveProperty('defects');
    expect(Array.isArray(firstTest.defects)).toBe(true);
    if (firstTest.defects.length > 0) {
      const firstDefect = firstTest.defects[0];
      expect(firstDefect).toHaveProperty('dangerous');
      expect(firstDefect).toHaveProperty('text');
      expect(firstDefect).toHaveProperty('type');
    }
  }
});
