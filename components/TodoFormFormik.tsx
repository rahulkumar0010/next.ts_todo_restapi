"use client";
import { addTodo, todoUpdate } from "@/action/action";
import { Formik, Form, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { formValue } from "@/types";
import toast from "react-hot-toast";
import { useTodoContext } from "@/context/todoContext";

function TodoFormFormik() {
  const { todos, removeTodo } = useTodoContext();

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required!"),
  });
  const handleSubmit = async (
    value: formValue,
    { resetForm }: FormikHelpers<formValue>
  ) => {
    const formData = new FormData();
    formData.append("title", value.title);

    const response = todos.title
      ? await todoUpdate({ id: todos._id as string, title: value.title })
      : await addTodo(formData);
    console.log("response ", response);
    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success(response.message);
      resetForm();
      removeTodo(todos._id as string)
    }
  };
  return (
    <div className="px-5 py-2 max-w-md w-full bg-slate-100 rounded overflow-hidden shadow-lg text-black">
      <Formik
        initialValues={{ title: todos?.title ? todos.title : "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ handleChange, handleBlur, values }) => (
          <Form>
            <label htmlFor="title" className="font-medium text-slate-700">
              Title
            </label>
            <input
              id="title"
              type="text"
              name="title"
              placeholder="Title"
              className="w-full p-1 border-slate-400 outline-blue-400 border rounded-md"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <ErrorMessage
              name="title"
              component="div"
              className="text-red-500"
            />
            {/* {titleErr && <small className="text-red-500">Title is required!</small>} */}
            <button
              type="submit"
              className="bg-blue-600 mt-5 px-4 py-2 rounded-md float-right text-white"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default TodoFormFormik;
