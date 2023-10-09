import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "../config/config.env") });

interface ENV {
  NODE_ENV: string | undefined;
  PORT: string | undefined;
  DB_USER: string | undefined;
  DB_DATABASE: string | undefined;
  DB_PASSWORD: string | undefined;
  DB_PORT: string | undefined;
  DB_HOST: string | undefined;
  SECRET_KEY: string | undefined;
  ADMIN_EMAIL: string | undefined;
  ADMIN_PASSWORD: string | undefined;
  PAYME_ENDPOINT: string | undefined;
  PAYME_ID: string | undefined;
  PAYME_PASSWORD: string | undefined;
}

interface ConfigInterface {
  NODE_ENV: string;
  PORT: string;
  DB_USER: string;
  DB_DATABASE: string;
  DB_PASSWORD: string;
  DB_PORT: string;
  DB_HOST: string;
  SECRET_KEY: string;
  ADMIN_EMAIL: string;
  ADMIN_PASSWORD: string;
  PAYME_ENDPOINT: string;
  PAYME_ID: string;
  PAYME_PASSWORD: string;
}

class Config {
  private getConfig(): ENV {
    return {
      NODE_ENV: process.env.NODE_ENV,
      PORT: process.env.PORT,
      DB_USER: process.env.DB_USER,
      DB_DATABASE: process.env.DB_DATABASE,
      DB_PASSWORD: process.env.DB_PASSWORD,
      DB_PORT: process.env.DB_PORT,
      DB_HOST: process.env.DB_HOST,
      SECRET_KEY: process.env.SECRET_KEY,
      ADMIN_EMAIL: process.env.ADMIN_EMAIL,
      ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
      PAYME_ENDPOINT: process.env.PAYME_ENDPOINT,
      PAYME_ID: process.env.PAYME_ID,
      PAYME_PASSWORD: process.env.PAYME_PASSWORD,
    };
  }

  private getSanitzedConfig(config: ENV): ConfigInterface {
    for (const [key, value] of Object.entries(config)) {
      if (value === undefined) {
        throw new Error(`Missing key ${key} in config.env`);
      }
    }

    return config as ConfigInterface;
  }

  public sanitizedConfig(): ConfigInterface {
    return this.getSanitzedConfig(this.getConfig());
  }
}

const config = new Config();

export default config.sanitizedConfig();
