import Ajv from 'ajv';
import members from '../members.json';
import membersSchema from '../members.schema.json';

const ajv = new Ajv();
const validate = ajv.compile(membersSchema);
const valid = validate(members);

describe('members.json', () => {
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
