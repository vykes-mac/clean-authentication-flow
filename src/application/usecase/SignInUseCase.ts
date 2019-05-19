import User from "@pbb/domain/User";
import IUserReadOnlyRepository from "../repositories/IUserReadOnlyRepository";
import ISigninUseCase from "./ISigninUseCase";
import IUserDto from "./IUserDto";

export default class SigninUseCase implements ISigninUseCase {

    private userReadOnlyRepository: IUserReadOnlyRepository;

    constructor(userReadOnlyRepository: IUserReadOnlyRepository) {
        this.userReadOnlyRepository = userReadOnlyRepository;
    }

    public async signin(userDto: IUserDto): Promise<IUserDto> {
        let user = new User(userDto.id, userDto.name,
                            userDto.email, userDto.password,
                             userDto.type);
        user = await this.userReadOnlyRepository.fetch(user);

        if (!user) {
            throw Error("user not found");
        }

        const foundUserDto = user;

        return foundUserDto;
    }

}
