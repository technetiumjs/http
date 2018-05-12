import * as chai from "chai";
import { HttpVerb } from "./http-verb";

const expect = chai.expect;

describe("HttpVerb", () => {
    const verbs: HttpVerb[] = [
        "all",
        "delete",
        "get",
        "head",
        "options",
        "patch",
        "post",
        "put",
    ];
    verbs.forEach((verb: HttpVerb) => {
        it(`should have verb ${verb}`, () => {
            // tslint:disable-next-line:no-unused-expression
            expect(verb).not.to.be.undefined;
        });
    });
});
