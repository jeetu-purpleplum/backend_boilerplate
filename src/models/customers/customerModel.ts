// import { Model } from "objection";
import { secondaryConnection } from "../../utils/db";
import BaseModel from "../baseModel";

export default class CustomerModel extends BaseModel {
    id!: number;
    name!: string;
    email!: string;
    password!: string;

    static get tableName() {
        return "customers"; // ✅ must match your DB table name exactly
    }

    static knex() {
        return secondaryConnection; 
    }

    static get idColumn() {
        return "id";
    }

    static get jsonSchema() {
        return {
        type: "object",
        required: ["name", "email", "password"],

        properties: {
            id: { type: "integer" },
            name: { type: "string", minLength: 1, maxLength: 255 },
            email: { type: "string", format: "email" },
            password: { type: "string", minLength: 6 },
        },
        };
    }

    static externalProps = ["*"];
}
