function extractStringEnvVar(key: keyof NodeJS.ProcessEnv): string {
  const value = process.env[key];

  if (value === undefined) {
    throw new Error(`The environment variable "${key}" cannot be "undefined".`);
  }

  return value;
}

export const settings = {
  API_PORT: extractStringEnvVar('VITE_API_PORT'),
} as const;