import React from "react";
import { getData } from "@/helper/API";
import { Todo } from "@/types";
import TodoCheckbox from "./TodoCheckbox";
import TodoButton from "./TodoButton";

async function Todos() {
  const data = await getData("http://localhost:3000/api/todos", "todos");

  return (
    <>
      {data?.data && data?.data.length > 0 ? (
        <div className="grid place-content-center gap-2 mt-4  ">
          {data?.data.map(
            (res: Todo, i: number): JSX.Element => (
              <div
                key={res._id}
                className=" rounded-md shadow-[0_8px_30px_rgb(0,10,0,0.12)] p-2 w-80 bg-slate-100 flex justify-between"
              >
                <div className="flex gap-1">
                  <TodoCheckbox res={res} i={i} />
                  <p
                    className={`text-black ${
                      res.completed ? "line-through" : ""
                    }`}
                  >
                    {res.title}
                  </p>
                </div>
                <TodoButton res={res} />
              </div>
            )
          )}
        </div>
      ) : (
        <div>
          <p className="text-center">No Data</p>
        </div>
      )}
    </>
  );
}

export default Todos;
