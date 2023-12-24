import { FormEvent, useState } from "react";
import { useTodoContext } from "../hooks/todos/context";
import type { Todo } from "../types/todo";

type TodoItemProps = Todo & {
  setEditing: (editing: boolean) => void;
};

function DisplayTodoItem({
  id,
  content,
  completed,
  setEditing,
}: TodoItemProps) {
  console.log("RENDER", "DisplayTodoItem", id);
  const { setCompleted, removeTodo } = useTodoContext();

  return (
    <div className="flex flex-nowrap items-center border rounded h-12 p-2 gap-2 bg-white shadow">
      <button
        type="button"
        role="checkbox"
        aria-checked={completed}
        onClick={() => setCompleted(id, !completed)}
        className="group p-1 border rounded-full bg-gray-50 hover:bg-gray-100/70 focus-visible:bg-gray-100/70 aria-checked:border-indigo-300 transition-colors"
      >
        <span className="block size-3 rounded-full group-aria-checked:bg-indigo-600">
          {" "}
        </span>
      </button>

      <span className="grow text-ellipsis leading-none">{content}</span>

      <button
        type="button"
        onClick={() => setEditing(true)}
        className="flex p-1 items-center justify-center border rounded bg-gray-50 hover:bg-gray-100/70 focus-visible:bg-gray-100/70 transition-colors"
        aria-label="Edit"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          className="size-6"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M4.21 20.52a.73.73 0 0 1-.52-.21a.75.75 0 0 1-.22-.6l.31-3.84A.73.73 0 0 1 4 15.4L15.06 4.34a3.19 3.19 0 0 1 2.28-.86a3.3 3.3 0 0 1 2.25.91a3.31 3.31 0 0 1 .11 4.5L8.63 20a.77.77 0 0 1-.46.22l-3.89.35Zm1-4.26L5 19l2.74-.25l10.9-10.92A1.72 1.72 0 0 0 17.31 5a1.61 1.61 0 0 0-1.19.42ZM15.59 4.87"
          />
        </svg>
      </button>

      <button
        type="button"
        onClick={() => removeTodo(id)}
        className="flex p-1 items-center justify-center border rounded text-red-500 bg-red-50 hover:bg-red-100/70 focus-visible:bg-red-100/70 transition-colors"
        aria-label="Delete"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          className="size-6"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M20 8.7H4a.75.75 0 1 1 0-1.5h16a.75.75 0 0 1 0 1.5"
          />
          <path
            fill="currentColor"
            d="M16.44 20.75H7.56A2.4 2.4 0 0 1 5 18.49V8a.75.75 0 0 1 1.5 0v10.49c0 .41.47.76 1 .76h8.88c.56 0 1-.35 1-.76V8A.75.75 0 1 1 19 8v10.49a2.4 2.4 0 0 1-2.56 2.26m.12-13a.74.74 0 0 1-.75-.75V5.51c0-.41-.48-.76-1-.76H9.22c-.55 0-1 .35-1 .76V7a.75.75 0 1 1-1.5 0V5.51a2.41 2.41 0 0 1 2.5-2.26h5.56a2.41 2.41 0 0 1 2.53 2.26V7a.75.75 0 0 1-.75.76Z"
          />
          <path
            fill="currentColor"
            d="M10.22 17a.76.76 0 0 1-.75-.75v-4.53a.75.75 0 0 1 1.5 0v4.52a.75.75 0 0 1-.75.76m3.56 0a.75.75 0 0 1-.75-.75v-4.53a.75.75 0 0 1 1.5 0v4.52a.76.76 0 0 1-.75.76"
          />
        </svg>
      </button>
    </div>
  );
}

function EditTodoItem({ id, content, setEditing }: TodoItemProps) {
  console.log("RENDER", "EditTodoItem", id);
  const { editTodo } = useTodoContext();

  const onEditSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const newContent = formData.get("content");
    if (!newContent) return false;

    editTodo(id, newContent as string);
    setEditing(false);
  };

  return (
    <form
      onSubmit={onEditSubmit}
      className="flex flex-nowrap items-center border rounded h-12 pe-2 gap-2 bg-white shadow"
    >
      <input
        type="text"
        name="content"
        defaultValue={content}
        className="h-full p-2 rounded grow"
      />

      <button
        type="submit"
        className="flex p-1 items-center justify-center border rounded bg-gray-50 hover:bg-gray-100/70 focus-visible:bg-gray-100/70 transition-colors"
        aria-label="Confirm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          className="size-6"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M9 18.25a.74.74 0 0 1-.53-.25l-5-5a.75.75 0 1 1 1.06-1L9 16.44L19.47 6a.75.75 0 0 1 1.06 1l-11 11a.74.74 0 0 1-.53.25"
          />
        </svg>
      </button>

      <button
        type="button"
        onClick={() => setEditing(false)}
        className="flex p-1 items-center justify-center border rounded text-red-500 bg-red-50 hover:bg-red-100/70 focus-visible:bg-red-100/70 transition-colors"
        aria-label="Cancel"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          className="size-6"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="m13.06 12l4.42-4.42a.75.75 0 1 0-1.06-1.06L12 10.94L7.58 6.52a.75.75 0 0 0-1.06 1.06L10.94 12l-4.42 4.42a.75.75 0 0 0 0 1.06a.75.75 0 0 0 1.06 0L12 13.06l4.42 4.42a.75.75 0 0 0 1.06 0a.75.75 0 0 0 0-1.06Z"
          />
        </svg>
      </button>
    </form>
  );
}

export function TodoItem(todo: Todo) {
  console.log("RENDER", "TodoItem", todo.id);
  const [editing, setEditing] = useState(false);
  return editing ? (
    <EditTodoItem setEditing={setEditing} {...todo} />
  ) : (
    <DisplayTodoItem setEditing={setEditing} {...todo} />
  );
}
