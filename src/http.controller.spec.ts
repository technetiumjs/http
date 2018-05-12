import { Controller } from "@yellow-snow/core";
import * as chai from "chai";
import { HttpController } from "./http.controller";

const expect = chai.expect;

let ctrl: Controller;
const ne: any = undefined;

describe("Controller", () => {
    describe("TestController", () => {
        beforeEach(() => {
            ctrl = new HttpController(ne, ne, ne);
        });
        it("should instantiate", () => {
            // tslint:disable-next-line:no-unused-expression
            expect(ctrl).not.to.be.undefined;
        });
    });
});
