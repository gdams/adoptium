import Ajv from 'ajv';
import adopters from '../adopters.json';
import adoptersSchema from '../members.schema.json';

const ajv = new Ajv();
const validate = ajv.compile(adoptersSchema);
const valid = validate(adopters);

describe('adopters.json', () => {
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
