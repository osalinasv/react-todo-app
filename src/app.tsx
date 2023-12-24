import { AddTodo } from "./components/add-todo";
import { TodoList } from "./components/todo-list";
import { TodoContextProvider } from "./hooks/todos/provider";

function Header() {
  console.log("RENDER", "Header");
  return (
    <header className="max-w-screen-sm mx-auto text-center px-4 mb-12 mt-20">
      <h1 className="text-4xl font-bold">Todo List App</h1>
      <p className="text-xl leading-none mb-4 opacity-50">in React.js + Vite</p>

      <p className="max-w-prose [text-wrap:balance]">
        A simple todo app using React's useContext and useReducer; with
        persistance using local storage. Made for practice purposes.
      </p>
    </header>
  );
}

function Todos() {
  console.log("RENDER", "Todos");
  return (
    <TodoContextProvider>
      <main className="max-w-screen-sm mx-auto px-4">
        <AddTodo />
        <TodoList />
      </main>
    </TodoContextProvider>
  );
}

function App() {
  console.log("RENDER", "App");
  return (
    <>
      <Header />
      <Todos />
    </>
  );
}

export default App;
