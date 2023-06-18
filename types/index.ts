export enum OpenAIModel {
  DAVINCI_TURBO = "gpt-3.5-turbo",
}

export interface Message {
  role: Role;
  content: string | [string] | { center: any; zoom: number };
}

export type Role =
  | "assistant"
  | "user"
  | "assistant-image"
  | "assistant-images"
  | "assistant-map";

export type ReplaceResult = JSX.Element | string;

export interface ButtonProps {
  content: string;
}
