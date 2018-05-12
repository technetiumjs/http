import { Route } from "@yellow-snow/core";
import * as express from "express";
import { HttpController } from ".";
import { HttpVerb } from "./http-verb";

export class HttpRoute<T extends HttpController> implements Route<T> {
    public path: string;
    public verb: HttpVerb;
    public controller!: { new(...args: any[]): T };
    public method!: keyof T;
    public middleware: express.RequestHandler | undefined;
    constructor(
        path: string,
        verb: HttpVerb,
        controller: { new(...args: any[]): T },
        method: keyof T,
        middleware?: express.RequestHandler,
    ) {
        this.path = path;
        this.verb = verb;
        this.controller = controller;
        this.method = method;
        this.middleware = middleware;
    }
}
