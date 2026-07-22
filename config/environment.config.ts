export const ENV_CONFIG = {
  qa: {
    UI_BASE_URL: 'https://www.saucedemo.com',
    API_BASE_URL: 'https://jsonplaceholder.typicode.com',
    SAUCE_USERNAME: 'standard_user',
  },
  staging: {
    UI_BASE_URL: 'https://www.saucedemo.com',
    API_BASE_URL: 'https://jsonplaceholder.typicode.com',
    SAUCE_USERNAME: 'performance_glitch_user',
  },
};

const currentEnv = (process.env.TEST_ENV || 'qa') as keyof typeof ENV_CONFIG;
export const config = ENV_CONFIG[currentEnv];