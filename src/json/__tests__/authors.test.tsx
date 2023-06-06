import Ajv from 'ajv';
import authors from '../authors.json';
import authorsSchema from '../authors.schema.json';

const ajv = new Ajv();
const validate = ajv.compile(authorsSchema);
const valid = validate(authors);

describe('authors.json', () => {
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
