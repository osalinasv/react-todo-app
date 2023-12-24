import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusIcon } from "@radix-ui/react-icons";
import { useRef, type FormEvent } from "react";

type AddTodoProps = {
  addTodo: (content: string) => void;
};

export function AddTodo({ addTodo }: AddTodoProps) {
  console.log("RENDER", "AddTodo");
  const input = useRef<HTMLInputElement>(null);

  const addTodoOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const newTodo = formData.get("newTodo");
    if (!newTodo) return false;

    addTodo(newTodo as string);

    if (input.current) {
      input.current.value = "";
    }
  };

  return (
    <form onSubmit={addTodoOnSubmit} className="flex flex-nowrap mb-4 gap-2">
      <Input
        ref={input}
        type="text"
        name="newTodo"
        required
        maxLength={50}
        placeholder="Create a new todo item"
        className="grow h-12 shadow-md"
      />

      <Button type="submit" className="h-12 shadow-md">
        <PlusIcon className="mr-2" />
        Add
      </Button>
    </form>
  );
}
