import zod from "zod";

const AddUrlSchema = zod.object({
  url: zod.string({ required_error: "Enter Url" }).url(),
});

export { AddUrlSchema };
