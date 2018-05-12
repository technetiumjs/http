import { Route, Router } from "@yellow-snow/core";
import * as express from "express";
import { NextFunction } from "express-serve-static-core";
import { HttpRoute } from "./http.route";

export class HttpRouter extends Router {
    public init(router: express.Router) {
        this.routes.forEach((route: Route<any>) => {
            if (route instanceof HttpRoute) {
                router[route.verb](
                    route.path,
                    (
                        route.middleware ?
                            route.middleware :
                            (_REQ: express.Request, _RES: express.Response, next: NextFunction) => {
                                next();
                            }
                    ),
                    (req: express.Request, res: express.Response, next: NextFunction) => {
                        const ctrl = new (route.controller)(req, res, next);
                        ctrl[route.method]();
                    },
                );
            }
        });
    }
}
