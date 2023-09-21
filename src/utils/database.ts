import { Sequelize } from "sequelize";
import config from "../config/config";

export const sequelize = new Sequelize(
  config.DB_DATABASE,
  config.DB_USER,
  config.DB_PASSWORD,
  {
    dialect: "postgres",
    host: config.DB_HOST,
    port: parseInt(config.DB_PORT),
    logging: true,
  }
);

const DB = async function () {
  try {
    await sequelize.sync({ force: false });
    console.log("Connected to DATABASE");
  } catch (error) {
    console.log(error);
  }
};

export const models = {};

export default DB;
