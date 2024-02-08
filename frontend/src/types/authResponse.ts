type ZodError = {
  path: "name" | "email" | "password";
  pathError: string;
};

interface SignupResponse<T extends string = string> {
  status: "success" | "fail";
  message?: string;
  type?: T;
  error: T extends "zodError" ? ZodError[] : string;
}

export type { SignupResponse };
