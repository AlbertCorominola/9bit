/**
 * Environment variable validation
 * Runs only on server-side to ensure required variables are set
 */

const REQUIRED_ENV_VARS = ['RESEND_API_KEY'] as const;
const OPTIONAL_ENV_VARS = ['FORMSPREE_ENDPOINT'] as const;

function validateEnv(): void {
  // Only validate on server-side
  if (typeof window !== 'undefined') {
    return;
  }

  const missing = REQUIRED_ENV_VARS.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    const missingList = missing.join(', ');
    throw new Error(
      `❌ Missing required environment variables: ${missingList}\n` +
      `Please create a .env.local file with these variables.\n` +
      `See .env.local.example for reference.`
    );
  }

  // Log optional variables for debugging
  const missingOptional = OPTIONAL_ENV_VARS.filter((key) => !process.env[key]);
  if (missingOptional.length > 0) {
    console.warn(
      `⚠️  Optional environment variables not set: ${missingOptional.join(', ')}`
    );
  }

  console.log('✅ All required environment variables are set');
}

// Validate on module load
try {
  validateEnv();
} catch (error) {
  console.error(error);
  process.exit(1);
}

export {};