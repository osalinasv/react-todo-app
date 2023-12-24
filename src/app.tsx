import { AddTodo } from "@/components/add-todo";
import { TodoList } from "@/components/todo-list";
import { TodoContextProvider } from "@/hooks/todos/provider";

function Header() {
  console.log("RENDER", "Header");
  return (
    <header className="text-center mb-12">
      <h1 className="text-4xl font-bold">Todo List App</h1>
      <p className="leading-none mb-4 text-muted-foreground">
        in React.js + Vite
      </p>

      <p className="max-w-prose [text-wrap:balance]">
        A simple todo app using React.js for practice purposes.
      </p>
    </header>
  );
}

function Todos() {
  console.log("RENDER", "Todos");
  return (
    <TodoContextProvider>
      <main>
        <AddTodo />
        <TodoList />
      </main>
    </TodoContextProvider>
  );
}

function App() {
  console.log("RENDER", "App");
  return (
    <div className="max-w-screen-sm mx-auto py-24 px-4">
      <Header />
      <Todos />
    </div>
  );
}

export default App;
