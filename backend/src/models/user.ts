import { InferSchemaType, Schema, model } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },
  profilePictureURL: { type: String },
});

type User = InferSchemaType<typeof userSchema>;

export default model<User>("User", userSchema);
