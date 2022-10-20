import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";

export default class API {
  public static getApiInstance(configs: CreateAxiosDefaults) {
    return axios.create(configs);
  }
}
