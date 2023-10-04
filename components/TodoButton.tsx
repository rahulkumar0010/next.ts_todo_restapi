"use client";
import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import toast from "react-hot-toast";
import { useTodoContext } from "@/context/todoContext";
import { Todo } from "@/types";
import { todoDelete } from "@/action/action";

function TodoButton({ res }: { res: Todo }) {
  const todoAction = useTodoContext();

  const handleClick = async (id: string) => {
    let response = await todoDelete({ id });
    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success(response.message);
    }
  };
  return (
    <div className="flex gap-1">
      {!res.completed && (
        <span onClick={() => todoAction.addTodo(res)}>
          <FaRegEdit className="text-blue-600 cursor-pointer" size={20} />
        </span>
      )}
      <span onClick={() => handleClick(res._id as string)}>
        <MdDeleteOutline className="text-red-600 cursor-pointer" size={20} />
      </span>
    </div>
  );
}

export default TodoButton;
