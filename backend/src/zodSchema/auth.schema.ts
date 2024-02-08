import zod from "zod";

const signupSchema = zod.object({
  name: zod.string({ required_error: "Enter Name" }),
  email: zod
    .string({ required_error: "Enter Email" })
    .email("Enter Valid Email"),
  password: zod
    .string({ required_error: "Enter Password" })
    .min(6, "too short password"),
});

const signinSchema = zod.object({
  email: zod
    .string({ required_error: "Enter Email" })
    .email("Enter Valid Email"),
  password: zod
    .string({ required_error: "Enter Password" })
    .min(6, "too short password"),
});

export { signinSchema, signupSchema };
