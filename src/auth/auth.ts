import * as express from "express";

export interface Auth {
    canActivate(req: express.Request, roles?: string[]): Promise<boolean | number>;
}
