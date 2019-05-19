import IUserReadOnlyRepository from "../../src/application/repositories/IUserReadOnlyRepository";
import User from "../../src/domain/User";

export default class FakeUserRepository implements IUserReadOnlyRepository {

    public users = [{
        email: "baller@gg.com",
        id : "1234",
        name: "Ken",
        password: "pass",
        type: "email"
    },
    {
        email: "tester@gmail.com",
        id : "1556",
        name: "Ren",
        password: "pass123",
        type: "email"
    }];

    public async fetch(user: User): Promise<User> {
        const res =  await this.users.find((x) => x.email === user.email);
        if (!res) {
            return null;
        }

        if (res.password !== user.password) {
            throw Error("Invalid email or password");
        }

        user.id = res.id;
        user.name = res.name;
        return user;
    }

    public async add(user: User): Promise<User> {
        const max = 9999;
        const min = 1000;
        user.id = (Math.floor(Math.random() * (+max - +min)) + +min).toString();

        this.users.push({
            email: user.email,
            id: user.id,
            name: user.name,
            password: user.password,
            type: user.type
        });
        return user;
    }

}
