"use client";
import { addTodo } from "@/action/action";
import React, { useRef } from "react";

function TodoForm() {
  const ref = useRef<HTMLFormElement>(null);
  return (
    <div className="px-5 py-2 max-w-md w-full bg-slate-100 rounded overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)] text-black">
      <form
        ref={ref}
        action={async (formData: FormData) => {
          await addTodo(formData);
          ref.current?.reset();
        }}
      >
        <label htmlFor="title" className="font-medium text-slate-700">
          Title
        </label>
        <input
          id="title"
          type="text"
          name="title"
          placeholder="Title"
          className="w-full p-1 border-slate-400 outline-blue-400 border rounded-md"
        />
        {/* {titleErr && <small className="text-red-500">Title is required!</small>} */}
        <button className="bg-blue-600 mt-5 px-4 py-2 rounded-md float-right text-white">
          Submit
        </button>
      </form>
    </div>
  );
}

export default TodoForm;
