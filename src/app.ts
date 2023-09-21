import express from "express";
import database from "./utils/database";
import config from "./config/config";

class App {
  public app: express.Application;
  private port: string | number;

  constructor() {
    this.app = express();
    this.port = config.PORT || 3000;
    this.connectDatabase();
  }

  private connectDatabase(): void {
    database();
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log("================================================");
      console.log(`🚀 App is listening on the PORT: ${this.port}`);
      console.log("================================================");
    });
  }
}

export default App;
