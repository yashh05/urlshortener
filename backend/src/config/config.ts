import dotenv from "dotenv";

dotenv.config();

interface ENV {
  PORT: number | undefined;
  MONGO_URI: string | undefined;
  JWT_SECRET: string | undefined;
  SALT_ROUNDS: number | undefined;
}

interface Config {
  MONGO_URI: string;
  PORT: number;
  JWT_SECRET: string;
  SALT_ROUNDS: number;
}

const getConfig = (): ENV => {
  return {
    PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    SALT_ROUNDS: process.env.PORT ? Number(process.env.SALT_ROUNDS) : undefined,
  };
};

const getSanitzedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }
  return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;
