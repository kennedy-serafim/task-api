import { Router } from "express";

export class Routes {
    private router: Router;

    constructor() {
        this.router = Router();
    }

    routes() {
        return this.router;
    }
}
