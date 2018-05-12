import * as chai from "chai";
import { HttpController, HttpRoute } from ".";
import { HttpRouter } from "./http.router";

const expect = chai.expect;

class TestHttpController extends HttpController {
    public hello(): void {
        // do something
    }
}

describe("HttpRouter", () => {
    it("should take an instance of HttpRoute", () => {
        const route = new HttpRoute("", "get", TestHttpController, "hello");
        const routes = [route];
        const router = new HttpRouter(routes);
        // tslint:disable-next-line:no-unused-expression
        expect(router).not.to.be.undefined;
    });
});
