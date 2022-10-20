import { AxiosInstance, AxiosResponse, CreateAxiosDefaults } from "axios";
import API from "./api";
import { Options, Problem, ProblemOptions, Tag } from "./interfaces";

export class LeetcodeRouletteAPI {
  private axiosInstance: AxiosInstance;

  constructor(hostname: string = "https://api.leetcoderoulette.com", configs: CreateAxiosDefaults = {}) {
    this.axiosInstance = API.getApiInstance({
      ...configs,
      url: hostname
    });
  }

  public async getProblems(options?: Partial<ProblemOptions>): Promise<Problem[]> {
    let problems: Problem[] = [];

    try {
      const data = await this.axiosInstance.get("/v1/problems", {
        params: options
      });
      problems = data.data.questions;
    } catch(e) {
      console.log(e);
    }

    return problems;
  }

  public async getProblem(id: number): Promise<Problem | undefined> {
    let problem: Problem | undefined;

    try {
      const data: AxiosResponse = await this.axiosInstance.get("/v1/problem/" + id);
      problem = data.data.question;
    } catch(e) {
      console.log(e);
    }

    return problem;
  }

  public async getTags(options?: Partial<Options>): Promise<Tag[]> {
    let tags: Tag[] = [];

    try {
      const data: AxiosResponse = await this.axiosInstance.get("/v1/tags", {
        params: options
      });

      tags = data.data.tags;
    } catch(e) {
      console.log(e);
    }

    return tags;
  }
}

export {
  Options,
  ProblemOptions,
  Problem,
  Tag
}
