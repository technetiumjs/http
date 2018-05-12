import { Route } from "@yellow-snow/core";
import { HttpController } from ".";
import { HttpVerb } from "./http-verb";

export class HttpRoute<T extends HttpController> implements Route<T> {
    public path: string;
    public verb: HttpVerb;
    public controller!: { new(...args: any[]): T };
    public method!: keyof T;
    constructor(
        path: string,
        verb: HttpVerb,
        controller: { new(...args: any[]): T },
        method: keyof T,
    ) {
        this.path = path;
        this.verb = verb;
        this.controller = controller;
        this.method = method;
    }
}
