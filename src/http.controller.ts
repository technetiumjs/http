import { Controller } from "@yellow-snow/core";
import * as express from "express";
import { NextFunction } from "express-serve-static-core";

export class HttpController implements Controller {
    protected req: express.Request;
    protected res: express.Response;
    protected next: NextFunction;
    constructor(req: express.Request, res: express.Response, next: NextFunction) {
        this.req = req;
        this.res = res;
        this.next = next;
    }
}
