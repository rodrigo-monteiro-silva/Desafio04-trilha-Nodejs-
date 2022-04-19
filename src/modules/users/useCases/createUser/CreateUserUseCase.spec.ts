import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { CreateUserError } from "./CreateUserError";
import { CreateUserUseCase } from "./CreateUserUseCase";

let createUserUseCase: CreateUserUseCase;
let usersRepository: IUsersRepository;

describe("Create User", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(usersRepository);
  });

  it("should be able to create a new user", async () => {
    const user = await createUserUseCase.execute({
      name: "john",
      email: "john@malinator.com",
      password: "123123",
    });

    expect(user).toHaveProperty("id");
  });

  it("should not be able to create a new user with existent email", async () => {
    await createUserUseCase.execute({
      name: "john",
      email: "john@malinator.com",
      password: "123123",
    });

    await expect(
      createUserUseCase.execute({
        name: "john",
        email: "john@malinator.com",
        password: "123123",
      })
    ).rejects.toBeInstanceOf(CreateUserError);
  });
});
