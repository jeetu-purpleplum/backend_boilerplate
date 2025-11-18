export interface CreateUserInput {
    email: string;
    name: string;
    password: string;
}

export interface UpdateUserInput {
    email: string;
    username: string;
    first_name: string;
    last_name: string;
    password_digest: string;
    primary_phone: string;
    country_code: string;
    status : string
}