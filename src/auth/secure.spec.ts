import * as chai from "chai";
import { HttpController } from "../";
import { Auth } from "./auth";
import { Secure } from "./secure";

const expect = chai.expect;

const ne: any = undefined;

describe("Secure", () => {
    it("should be called before method it's attached to", (done) => {
        let i: number = 0;
        class Authenticate implements Auth {
            public status: number = 200;
            public async canActivate(_REQ: any): Promise<number> {
                i++;
                return this.status;
            }
        }
        // tslint:disable-next-line:max-classes-per-file
        class TestHttpController extends HttpController {
            @Secure(Authenticate)
            public testMethod() {
                expect(i).to.equal(1);
                done();
            }
        }

        const ctrl = new TestHttpController(ne, ne, ne);
        ctrl.testMethod();
    });
    it("should call canActivate each time a new class is instantiated", (done) => {
        let i: number = 0;
        let called = false;
        // tslint:disable-next-line:max-classes-per-file
        class Authenticate implements Auth {
            public status: number = 200;
            public async canActivate(_REQ: any): Promise<number> {
                i++;
                return this.status;
            }
        }
        // tslint:disable-next-line:max-classes-per-file
        class TestHttpController extends HttpController {
            @Secure(Authenticate)
            public testMethod() {
                if (i === 2 && !called) {
                    called = true;
                    done();
                }
            }
        }
        const ctrl1 = new TestHttpController(ne, ne, ne);
        const ctrl2 = new TestHttpController(ne, ne, ne);
        ctrl1.testMethod();
        ctrl2.testMethod();
    });
    it("should resolve a 401 is Auth returns false", (done) => {
        let status: number;
        // tslint:disable-next-line:max-classes-per-file
        class Authenticate implements Auth {
            public async canActivate(_REQ: any): Promise<boolean> {
                return false;
            }
        }
        // tslint:disable-next-line:max-classes-per-file
        const res: any = {
            send: () => {
                expect(status).to.equal(401);
                done();
            },
            status: (code: number) => {
                status = code;
            },
        };
        // tslint:disable-next-line:max-classes-per-file
        class TestHttpController extends HttpController {
            @Secure(Authenticate)
            public async testMethod() {
                chai.assert.fail();
            }
        }
        const ctrl = new TestHttpController(ne, res, ne);
        ctrl.testMethod();
    });
    it("should an arbitrary number returned by Auth that is not 200", (done) => {
        let status: number;
        const EXPECTED_CODE: number = 500;
        // tslint:disable-next-line:max-classes-per-file
        class Authenticate implements Auth {
            public async canActivate(_REQ: any): Promise<number> {
                return EXPECTED_CODE;
            }
        }
        // tslint:disable-next-line:max-classes-per-file
        const res: any = {
            send: () => {
                expect(status).to.equal(EXPECTED_CODE);
                done();
            },
            status: (code: number) => {
                status = code;
            },
        };
        // tslint:disable-next-line:max-classes-per-file
        class TestHttpController extends HttpController {
            @Secure(Authenticate)
            public async testMethod() {
                chai.assert.fail();
            }
        }
        const ctrl = new TestHttpController(ne, res, ne);
        ctrl.testMethod();
    });
    it("should call final method when canActivate resolves 200", (done) => {
        // tslint:disable-next-line:max-classes-per-file
        class Authenticate implements Auth {
            public async canActivate(_REQ: any): Promise<number> {
                return 200;
            }
        }
        // tslint:disable-next-line:max-classes-per-file
        class TestHttpController extends HttpController {
            @Secure(Authenticate)
            public async testMethod() {
                done();
            }
        }
        const ctrl = new TestHttpController(ne, ne, ne);
        ctrl.testMethod();
    });
    it("should pass an array of roles to canActivate if roles are defined", (done) => {
        // tslint:disable-next-line:max-classes-per-file
        class Authenticate implements Auth {
            public async canActivate(_REQ: any, roles: any): Promise<number> {
                expect(roles).to.deep.equal(["hello", "world"]);
                return 200;
            }
        }
        // tslint:disable-next-line:max-classes-per-file
        class TestHttpController extends HttpController {
            @Secure(Authenticate, ["hello", "world"])
            public async testMethod() {
                done();
            }
        }
        const ctrl = new TestHttpController(ne, ne, ne);
        ctrl.testMethod();
    });
    it("should create an array of roles if passed a simple string", (done) => {
        // tslint:disable-next-line:max-classes-per-file
        class Authenticate implements Auth {
            public async canActivate(_REQ: any, roles: any): Promise<number> {
                expect(roles).to.be.instanceof(Array);
                return 200;
            }
        }
        // tslint:disable-next-line:max-classes-per-file
        class TestHttpController extends HttpController {
            @Secure(Authenticate, "hello")
            public async testMethod() {
                done();
            }
        }
        const ctrl = new TestHttpController(ne, ne, ne);
        ctrl.testMethod();
    });
});
