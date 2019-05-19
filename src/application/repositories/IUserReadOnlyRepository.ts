import User from "@pbb/domain/User";

export default interface IUserReadOnlyRepository {
    fetch(user: User): Promise<User>;
}
