import { join } from "path";
import express, { json, static as static_ } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";

import database from "./utils/database";
import config from "./config/config";
import { HttpException } from "./exceptions/HttpException";
import errorMiddleware from "./middlewares/error-handler.middleware";

// Routes
import Router from "./routes/index.route";

class App {
  public app: express.Application;
  private readonly port: string | number;

  constructor() {
    this.app = express();
    this.port = config.PORT || 3000;
    this.initializeMiddleware();
    this.connectDatabase();
    this.initializeRoutes();
    this.initializeErrorHandler();
  }

  private connectDatabase(): void {
    database().then(() => {
      console.log("DATABASE CONNECTED")
    });
  }

  public initializeMiddleware(): void {
    this.app.use(
      "/uploads/images",
      static_(join(__dirname, "../", "uploads", "images"))
    );
    // Serving the Frontend
    this.app.use(static_(join(__dirname, "../client/build")));

    this.app.use(fileUpload());
    this.app.use(cors());
    this.app.use(json());
    this.app.use(cookieParser());
  }

  private initializeRoutes(): void {
    this.app.use("/api/v1", Router);
    this.app.get("*", (req, res, next) => {
      res.sendFile(join(__dirname, "../client/build/index.html"), (err) => {
        return next(new HttpException(404,`${req.path} yo'li mavjud emas` ));
      });
    });
    this.app.all("*", () => {
      throw new HttpException(400, "Route Not Found");
    });
  }

  private initializeErrorHandler(): void {
    this.app.use(errorMiddleware);
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
