import { Todo } from "@/types";
import mongoose, { Schema, Model } from "mongoose";

// Schema
const schema = new Schema<Todo, Model<Todo>>({
  title: { type: String, required: true },
  status: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

// type Todo = InferSchemaType<typeof schema>;

// `TodoModel` will have `name: string`, etc.
const TodoModel = mongoose.models.Todo ?? mongoose.model("Todo", schema);
export default TodoModel;
