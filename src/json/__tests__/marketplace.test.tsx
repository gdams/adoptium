import Ajv from 'ajv';
import marketplace from '../marketplace.json';
import marketplaceSchema from '../marketplace.schema.json';

const ajv = new Ajv();
const validate = ajv.compile(marketplaceSchema);
const valid = validate(marketplace);

describe('marketplace.json', () => {
  it('should be a valid JSON schema', () => {
    if (!valid) {
      if (validate.errors) {
        const errorMessages = validate.errors.map((error) => error.message).join('\n');
        console.error('Validation errors:', errorMessages);
      } else {
        console.error('AJV validation failed, but no error details were provided.');
      }
    }
    expect(valid).toBeTruthy();
  });
});
