import CustomerModel from "../../models/customers/customerModel";
import UsersModel from "../../models/users/userModel";
import { CreateUserInput, UpdateUserInput } from "../../types/users";


export  async function getAllUsers() {
    return await UsersModel.query();
}

export  async function getUserById(id: string) {
    return await UsersModel.query().findById(id);
}

export  async function createUser(data: CreateUserInput) {
    await CustomerModel.query().insert(data)
    return await UsersModel.query().insert(data).returning("*");
}

export  async function updateUser(id: string, data: UpdateUserInput) {
    return await UsersModel.query().patchAndFetchById(id, data);
}

export  async function deleteUser(id: string) {
    return await UsersModel.query().deleteById(id);
}

