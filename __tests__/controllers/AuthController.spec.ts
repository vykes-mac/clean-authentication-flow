import "reflect-metadata";
// tslint:disable-next-line:ordered-imports
import chai from "chai";
import "mocha";
import { it } from "mocha";
import sinon, { SinonSandbox } from "sinon";
import sinonChai from "sinon-chai";
import AuthServiceLocator from "../../src/configuration/usecases/AuthServiceLocator";
import AuthController from "../../src/entrypoint/controllers/AuthController";
import FakeUserRepository from "../helpers/FakeRepository";
import {mockRequest, mockResponse } from "../helpers/helpers";

const { expect } = chai;

chai.use(sinonChai);

describe("Auth Controller", () => {
    let sut: AuthController;
    let sandbox: SinonSandbox = null;
    let serviceLocator: AuthServiceLocator;
    let fakeRepository: FakeUserRepository;

    const user = {
        email: "baller@gg.com",
        id : "1234",
        name: "Ken",
        password: "pass",
        type: "email"
    };

    const req: any = mockRequest(user);
    const res: any = mockResponse();

    beforeEach(() => {
        fakeRepository = new FakeUserRepository();
        serviceLocator = new AuthServiceLocator(fakeRepository);
        sandbox = sinon.createSandbox();

        sut = new AuthController(serviceLocator);

    });

    afterEach(() => {
        sandbox.restore();
    });

    describe("sign", () => {
        it("should return 400 on empty request", async () => {
            sandbox.spy(res, "status");
            sandbox.spy(res, "json");

            const emptyReq: any = { body: {} };
            await sut.sigin(emptyReq, res);

            expect(res.status).to.have.been.calledWith(400);
        });

        it("should return 200 and a user", async () => {
            sandbox.spy(res, "status");
            sandbox.spy(res, "json");

            await sut.sigin(req, res);

            expect(res.status).to.have.been.calledWith(200);
            expect(res.json).to.have.been.calledWith(user);
        });
    });

});
