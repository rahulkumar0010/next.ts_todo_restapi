import { Todo, updateTodoProps } from "@/types";

export async function getData(url: string, tag: string) {
  const res = await fetch(url, { cache: "no-store", next: { tags: [tag] } });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function postData(url: string, data: Todo) {
  const rawResponse = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const content = await rawResponse.json();

  return content;
}
export async function putMethod(url: string, data: updateTodoProps) {
  const rawResponse = await fetch(url, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const content = await rawResponse.json();

  return content;
}
export async function deleteMethod(url: string) {
  const rawResponse = await fetch(url, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const content = await rawResponse.json();

  return content;
}
