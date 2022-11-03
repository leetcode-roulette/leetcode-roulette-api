import axios, { AxiosInstance, AxiosResponse, CreateAxiosDefaults } from "axios";

export interface Options {
	q: string[];
	sort: string;
	limit: number;
	offset: number;
}

export interface ProblemOptions extends Options {
	tags: string[];
	difficulty: number[];
	premium: boolean;
}

export interface Problem {
	title: string;
	title_slug: string;
	tags: string[];
	id: number;
	frontend_id: number;
	is_premium: boolean;
	description: string;
	hints: Array<string>;
	accepted: number;
	submitted: number;
	acceptance_rate: string;
	difficulty: number;
}

export interface Tag {
	name: string;
	tag_slug: string;
}

interface Params {
	tags: string;
	difficulty: string;
	premium: boolean;
}

export default class LeetcodeRouletteAPI {
	private axiosInstance: AxiosInstance;

	constructor(hostname: string = "https://api.leetcoderoulette.com", configs: CreateAxiosDefaults = {}) {
		this.axiosInstance = axios.create({
			...configs,
			baseURL: hostname,
		});
	}

	public async getProblems(options?: Partial<ProblemOptions>): Promise<Problem[]> {
		let problems: Problem[] = [];

		try {
			const data = await this.axiosInstance.get("/v1/problems", {
				params: { ...options, ...this.getParamaterizedOptions(options) },
			});
			problems = data.data.questions;
		} catch (e) {
			throw e;
		}

		return problems;
	}

	private getParamaterizedOptions(options?: Partial<ProblemOptions>): Object | undefined {
		if (!options) {
			return;
		}

		const params: Params = {
			tags: options.tags ? options.tags.join(",") : "",
			difficulty: options.difficulty ? options.difficulty.map((difficulty) => difficulty.toString()).join(",") : "",
			premium: Boolean(options.premium),
		};

		return params;
	}

	public async getProblem(id: number): Promise<Problem | undefined> {
		let problem: Problem | undefined;

		try {
			const data: AxiosResponse = await this.axiosInstance.get(`/v1/problems/${id}`);
			problem = data.data.question;
		} catch (e) {
			throw e;
		}

		return problem;
	}

	public async getTags(options?: Partial<Options>): Promise<Tag[]> {
		let tags: Tag[] = [];

		try {
			const data: AxiosResponse = await this.axiosInstance.get("/v1/tags", {
				params: options,
			});

			tags = data.data.tags;
		} catch (e) {
			throw e;
		}

		return tags;
	}
}
