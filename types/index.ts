export enum OpenAIModel {
  DAVINCI_TURBO = "gpt-3.5-turbo"
}

export interface Message {
  role: Role;
  content: string | [string];
}

export type Role = "assistant" | "user" | "assistant-image" | "assistant-images";
