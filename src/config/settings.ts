function extractStringEnvVar(key: string): string {
  const value = import.meta.env[key];

  if (value === undefined) {
    throw new Error(`The environment variable "${key}" cannot be "undefined".`);
  }

  return value;
}

export const settings = {
  API_PORT: extractStringEnvVar("VITE_API_PORT"),
  API_ENDPOINT: extractStringEnvVar("VITE_API_ENDPOINT"),
} as const;
