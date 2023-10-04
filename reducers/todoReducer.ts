import { Todo } from "@/types";

interface TodoAction {
  type: string;
  payload?: any;
}

const todoReducer = (state: { todos: Todo | {} }, action: TodoAction) => {
  switch (action.type) {
    case "ADD_TODO":
      return (state.todos = action.payload);

    case "REMOVE_TODO":
      return (state.todos = {});

    case "SET_TODOS":
      return (state.todos = action.payload);

    default:
      return state;
  }
};

export default todoReducer;
