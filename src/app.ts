import express from "express";
import compression from "compression";
import cors from "cors";
import passport from 'passport';
import './database';
import { router } from "./routes/Routes";

export default class App {
    public app: express.Application;

    constructor() {
        this.app = express();
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
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(compression());
        this.app.use(cors());
        this.app.use(passport.initialize());
        // this.app.use('/public', express.static(path.join(__dirname, 'public')));
    }

    public routes(): void {
        this.app.use(router);
    }
}
