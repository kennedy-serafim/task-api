import express from "express";
import compression from "compression";
import cors from "cors";
import { Routes } from "./routes/Routes";

export class App {
    public app: express.Application;
    private routesPrefix: string;

    constructor() {
        this.app = express();
        this.routesPrefix = "/api/v1";
        this.config();
        this.routes();
    }

    public start(): void {
        this.app.listen(this.app.get("port"), () => {
            console.log(`API is running at PORT = ${this.app.get("port")}`);
        });
    }

    public config(): void {
        this.app.set("port", process.env.PORT || 3000);
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(compression());
        this.app.use(cors());
    }

    public routes(): void {
        this.app.use(`${this.routesPrefix}`, new Routes().routes());
    }
}
