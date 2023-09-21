import express from "express";

class App {
  public app: express.Application;
  private port: string | number;

  constructor() {
    this.app = express();
    this.port = 3000;
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
