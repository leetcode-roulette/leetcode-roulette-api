import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";

export default class API {
  public static getApiInstance(configs: CreateAxiosDefaults): AxiosInstance {
    return axios.create(configs);
  }
}
