// Load environment variables from .env file
import dotenv from 'dotenv';
dotenv.config();

/**
 * Get environment variable with fallback
 * @param {string} key - Environment variable name
 * @param {string} defaultValue - Default value if not found
 * @returns {string}
 */
function getEnv(key, defaultValue = '') {
    return process.env[key] || defaultValue;
}

// Export test configuration
export const config = {
    baseUrl: getEnv('BASE_URL', 'https://www.saucedemo.com'),
    credentials: {
        username: getEnv('TEST_USERNAME', 'standard_user'),
        password: getEnv('TEST_PASSWORD', 'secret_sauce'),
        lockedOutUser: getEnv('TEST_LOCKED_OUT_USER', 'locked_out_user'),
        problemUser: getEnv('TEST_PROBLEM_USER', 'problem_user'),
        performanceGlitchUser: getEnv('TEST_PERFORMANCE_GLITCH_USER', 'performance_glitch_user'),
        errorUser: getEnv('TEST_ERROR_USER', 'error_user'),
        visualUser: getEnv('TEST_VISUAL_USER', 'visual_user'),
    },
    testEnv: getEnv('TEST_ENV', 'staging'),
    timeout: parseInt(getEnv('TIMEOUT', '30000'))
};

export default config;
