import EntityValidator from '@/EntityValidator/EntityValidator';
import EntityValidatorRequest from '@/EntityValidator/EntityValidatorRequest';
import { ValidationStatus } from '@/Store/ValidationStatus';

describe('EntityValidator', () => {
  it('fails validating against empty schema', async () => {
    const validator = new EntityValidator('https://example.com');
    const validationRequest = new EntityValidatorRequest(
      {},
      'Q1',
      'https://exmaple.com',
    );

    const validationResponse = await validator.validate(validationRequest);

    expect(validationResponse.status).toBe(ValidationStatus.Nonconformant);
  });
});
