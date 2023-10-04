"use client";

import { createContext, useContext, ReactNode, useReducer } from "react";
import todoReducer from "@/reducers/todoReducer";
import { Todo } from "@/types";

interface TodoContextData {
  todos: Todo;
  addTodo: (todo: Todo) => void;
  removeTodo: (id: string) => void;
}

const TodoContext = createContext<TodoContextData>({} as TodoContextData);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, dispatch] = useReducer(todoReducer, { todos: {} });

  const addTodo = (todo: Todo) => {
    dispatch({ type: "ADD_TODO", payload: todo });
  };

  const removeTodo = (id: string) => {
    dispatch({ type: "REMOVE_TODO", payload: { id } });
  };

  const value = {
    todos,
    addTodo,
    removeTodo,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context)
    throw new Error("useTodoContext must be used within a TodoProvider");
  return context;
};
