// import TodoForm from "@/components/TodoForm";
import TodoFormFormik from "@/components/TodoFormFormik";
import Todos from "@/components/Todos";

export default function Home() {
  return (
    <main className="">
      <div className="flex justify-center mt-10 ">
        {/* <TodoForm /> */}
        <TodoFormFormik />
      </div>
      <Todos />
    </main>
  );
}
