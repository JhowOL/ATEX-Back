require('dotenv').config({ path: '.env.test' });

module.exports = {
  testEnvironment: 'node',
  coverageThreshold: {
    global: { lines: 80 },
  },
};
