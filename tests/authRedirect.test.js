const test = require('node:test');
const assert = require('node:assert/strict');
const { getLoginRedirectUrl } = require('../src/utils/loginRedirect');

test('admin user is redirected to dashboard after login', () => {
  assert.equal(getLoginRedirectUrl({ role: 'admin' }, '/profile'), '/admin');
});

test('non-admin user keeps the provided return URL', () => {
  assert.equal(getLoginRedirectUrl({ role: 'user' }, '/profile'), '/profile');
});

test('safe returnUrl is preserved when provided', () => {
  assert.equal(getLoginRedirectUrl({ role: 'user' }, '/profile'), '/profile');
});
