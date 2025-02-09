const formHandler = require('./formHandler');

test('Test input validation', () => {
  expect(formHandler.validateInput('')).toBe(false);
  expect(formHandler.validateInput('https://example.com')).toBe(true);
});
const validateInput = (input) => {
 
  const urlPattern = /^(https?:\/\/)?([a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5})?(:[0-9]{1,5})?(\/.*)?$/;
  return urlPattern.test(input);
};

module.exports = { validateInput };
