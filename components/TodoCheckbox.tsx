"use client";
import { todoUpdateStatus } from "@/action/action";
import { Todo } from "@/types";
import React from "react";

function TodoCheckbox({ res, i }: { res: Todo; i: number }) {
  return (
    <div className="flex items-center h-5">
      <input
        type="checkbox"
        className="w-4 h-4 text-blue-600 cursor-pointer bg-gray-100 border-gray-300 rounded-md outline-none focus:rounded-lg focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        id={`${res.title}${i}`}
        name={`${res.title}${i}`}
        checked={res.completed}
        onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
          await todoUpdateStatus({
            checked: e.target.checked,
            id: res._id as string,
          });
        }}
        disabled={res.completed}
      />
    </div>
  );
}

export default TodoCheckbox;
