import IUserReadOnlyRepository from "@pbb/application/repositories/IUserReadOnlyRepository";
import User from "@pbb/domain/User";
import { injectable } from "inversify";

@injectable()
export default  class UserRepository implements IUserReadOnlyRepository {

    public async fetch(user: User): Promise<User> {
        throw new Error("Method not implemented.");
    }

}
