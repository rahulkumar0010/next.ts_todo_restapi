"use server";
import { deleteMethod, postData, putMethod } from "@/helper/API";
import { revalidatePath } from "next/cache";

export const addTodo = async (formData: FormData) => {
  try {
    let title = formData.get("title");

    let response = await postData("http://localhost:3000/api/todos", {
      title: title as string,
      status: "active",
    });
    revalidatePath("/");
    return response;
  } catch (error: unknown) {
    if (typeof error === "string") {
      return {
        error: error.toUpperCase(), // works, `e` narrowed to string
      };
    } else if (error instanceof Error) {
      return {
        error: error.message, // works, `e` narrowed to Error
      };
    }
  }
};
export const todoUpdateStatus = async (data: {
  checked: boolean;
  id: string;
}) => {
  let { checked, id } = data;

  try {
    let response = await putMethod("http://localhost:3000/api/todos/" + id, {
      completed: checked,
      status: "completed",
    });
    revalidatePath("/");
    return response;
  } catch (error: unknown) {
    if (typeof error === "string") {
      return {
        error: error.toUpperCase(), // works, `e` narrowed to string
      };
    } else if (error instanceof Error) {
      return {
        error: error.message, // works, `e` narrowed to Error
      };
    }
  }
};
export const todoUpdate = async (data: { title: string; id: string }) => {
  let { title, id } = data;

  try {
    let response = await putMethod("http://localhost:3000/api/todos/" + id, {
      title: title,
      status: "active",
    });
    revalidatePath("/");
    return response;
  } catch (error: unknown) {
    if (typeof error === "string") {
      return {
        error: error.toUpperCase(), // works, `e` narrowed to string
      };
    } else if (error instanceof Error) {
      return {
        error: error.message, // works, `e` narrowed to Error
      };
    }
  }
};
export const todoDelete = async ({ id }: { id: string }) => {
  try {
    let response = await deleteMethod("http://localhost:3000/api/todos/" + id);
    revalidatePath("/");
    return response;
  } catch (error: unknown) {
    if (typeof error === "string") {
      return {
        error: error.toUpperCase(), // works, `e` narrowed to string
      };
    } else if (error instanceof Error) {
      return {
        error: error.message, // works, `e` narrowed to Error
      };
    }
  }
};
