import IUserDto from "./IUserDto";

export default interface ISigninUseCase {
    signin(userDto: IUserDto): Promise<IUserDto>;
}
