import express from "express";
declare class App {
    app: express.Application;
    private readonly port;
    constructor();
    private connectDatabase;
    initializeMiddleware(): void;
    private initializeRoutes;
    private initializeErrorHandler;
    listen(): void;
}
export default App;
