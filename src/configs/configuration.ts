export const RequiredEnvVars = ['SERVER_PORT'];

interface Configuration {
  server: {
    port: number;
  };
  baconNode: {
    url: string;
  };
}

const DEFAULT_SERVER_PORT = 3000;

export const configuration = (): Configuration => {
  const defaultConfiguration = {
    server: {
      port:
        parseInt(process.env.SERVER_PORT as string, 10) || DEFAULT_SERVER_PORT,
    },
    baconNode: {
      url: process.env.BACON_NODE_URL as string,
    },
  };
  return defaultConfiguration;
};

export const validateEnvironmentVars = (): void => {
  if (process.env.NODE_ENV === undefined) {
    process.env.NODE_ENV = 'development';
  }

  RequiredEnvVars.forEach((v) => {
    if (!process.env[v]) throw Error(`Missing required env variable ${v}`);
  });
};
