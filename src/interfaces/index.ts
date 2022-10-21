export interface Options {
  q: string[];
  sort: string;
  limit: number;
  offset: number;
}

export interface ProblemOptions extends Options {
  tags: string[];
  difficulties: number[];
  premium: boolean;
}

export interface Problem {
  title: string;
  title_slug: string;
  tags: string[];
  id: number;
  frontend_id: number;
  is_premium: boolean;
}

export interface Tag {
  name: string;
  tag_slug: string;
}
