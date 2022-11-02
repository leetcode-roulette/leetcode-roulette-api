import { config } from "dotenv";
import LeetcodeRouletteAPI, { Problem, Tag } from "../src";

beforeAll(() => {
  config(); // Configure environment variables
})

describe("GET /v1/problems", () => {
  test("Successfully gets all problems", async () => {
    const api: LeetcodeRouletteAPI = new LeetcodeRouletteAPI(process.env.API_HOSTNAME);
    const problems: Problem[] = await api.getProblems();
    expect(problems).not.toBeUndefined();
  });

  test("Successfully gets problems with filters", async () => {
    const api: LeetcodeRouletteAPI = new LeetcodeRouletteAPI(process.env.API_HOSTNAME);
    const problems: Problem[] = await api.getProblems({
      tags: ["array"],
      difficulty: [1],
      premium: false
    });
    expect(problems).not.toBeUndefined();
  });
});

describe("GET /v1/problem/:id", () => {
  test("Successfully gets a problem by id", async () => {
    const api: LeetcodeRouletteAPI = new LeetcodeRouletteAPI(process.env.API_HOSTNAME);
    const problem: Problem | undefined = await api.getProblem(1);
    expect(problem).not.toBeUndefined();
  });
});

describe("GET /v1/tags", () => {
  test("Successfully gets all tags", async () => {
    const api: LeetcodeRouletteAPI = new LeetcodeRouletteAPI(process.env.API_HOSTNAME);
    const tags: Tag[] = await api.getTags();
    expect(tags).not.toBeUndefined();
  });
});
