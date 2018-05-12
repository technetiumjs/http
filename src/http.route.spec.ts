import * as chai from "chai";
import { HttpController } from ".";
import { HttpRoute } from "./http.route";

const expect = chai.expect;

class TestHttpController extends HttpController {
    public doSomething(): void {
        // do something
    }
}

describe("HttpRoute", () => {
    it("should take a reference to TestController class and one of it's methods", () => {
        const route = new HttpRoute("/", "get", TestHttpController, "doSomething");
        // tslint:disable-next-line:no-unused-expression
        expect(route).not.to.be.undefined;
    });
});
