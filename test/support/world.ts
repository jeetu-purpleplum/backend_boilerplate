import { IWorldOptions, setWorldConstructor, World } from "@cucumber/cucumber";
import { AxiosResponse } from "axios";
import httpClient from "./httpClient";
import { getAuthToken } from "./authHelper";

export class CustomWorld extends World {
  response?: AxiosResponse;
  requestBody: Record<string, any> = {};
  headers: Record<string, string> = {};
  authToken?: string;

  constructor(options: IWorldOptions) {
    super(options);
  }

  async authenticate() {
    if (!this.authToken) {
      this.authToken = await getAuthToken();
      this.headers["Authorization"] = `Bearer ${this.authToken}`;
    }
  }

  async sendRequest(method: string, path: string) {
    const config = { headers: this.headers };
    switch (method.toUpperCase()) {
      case "GET":
        this.response = await httpClient.get(path, config);
        break;
      case "POST":
        this.response = await httpClient.post(path, this.requestBody, config);
        break;
      case "PUT":
        this.response = await httpClient.put(path, this.requestBody, config);
        break;
      case "DELETE":
        this.response = await httpClient.delete(path, config);
        break;
      default:
        throw new Error(`Unsupported method: ${method}`);
    }
  }
}

setWorldConstructor(CustomWorld);
