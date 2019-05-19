import ISigninUseCase from "@pbb/application/usecase/ISigninUseCase";
import IUserDto from "@pbb/application/usecase/IUserDto";
import AuthServiceLocator from "@pbb/configuration/usecases/AuthServiceLocator";
import { TYPES } from "@pbb/constants/types";
import * as express from "express";
import { inject } from "inversify";
import {controller, httpPost, interfaces, request, response } from "inversify-express-utils";

@controller("/auth")
export default class AuthController implements interfaces.Controller {
    private readonly signInUseCase: ISigninUseCase;

    constructor(@inject(TYPES.AuthServiceLocator) serviceLocator: AuthServiceLocator) {
        this.signInUseCase = serviceLocator.GetSignInUseCase();
    }

    @httpPost("/signin")
    public async sigin(@request() req: express.Request, @response() res: express.Response) {
        const userDto: IUserDto = req.body;
        return this.signInUseCase.signin(userDto)
                    .then((foundUserDto: IUserDto) => res.status(200).json(foundUserDto))
                    .catch((err: Error) => res.status(400).json({error: err.message}));
    }
}
