import IUserReadOnlyRepository from "@pbb/application/repositories/IUserReadOnlyRepository";
import SigninUseCase from "@pbb/application/usecase/SignInUseCase";
import { TYPES } from "@pbb/constants/types";
import { inject, injectable } from "inversify";

@injectable()
export default class AuthServiceLocator {

    constructor(@inject(TYPES.IUserReadOnlyRepository)
                private readRepository: IUserReadOnlyRepository) { }

    public GetSignInUseCase() {
        return new SigninUseCase(this.readRepository);
    }
}
