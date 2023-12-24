import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTodoContext } from "@/hooks/todos/context";
import type { Todo } from "@/types/todo";
import {
  CheckIcon,
  Cross2Icon,
  Pencil1Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { FormEvent, useState } from "react";

type TodoItemActionsProps = {
  onEdit: () => void;
  onRemove: () => void;
};

function TodoItemActions({ onEdit, onRemove }: TodoItemActionsProps) {
  return (
    <>
      <Button
        type="button"
        size="icon"
        variant="secondary"
        aria-label="Edit todo"
        className="size-8 shrink-0"
        onClick={onEdit}
      >
        <Pencil1Icon />
      </Button>

      <Button
        type="button"
        size="icon"
        variant="destructive"
        aria-label="Delete todo"
        className="size-8 shrink-0"
        onClick={onRemove}
      >
        <TrashIcon />
      </Button>
    </>
  );
}

type TodoItemEditActionsProps = {
  onCancel: () => void;
};

function TodoItemEditActions({ onCancel }: TodoItemEditActionsProps) {
  return (
    <>
      <Button
        type="submit"
        size="icon"
        variant="secondary"
        aria-label="Confirm edit"
        className="size-8 shrink-0"
      >
        <CheckIcon />
      </Button>

      <Button
        type="button"
        size="icon"
        variant="destructive"
        aria-label="Cancel edit"
        className="size-8 shrink-0"
        onClick={onCancel}
      >
        <Cross2Icon />
      </Button>
    </>
  );
}

type TodoItemProps = Todo & {
  editTodo: (content: string) => void;
  removeTodo: () => void;
  setCompleted: (completed: boolean) => void;
};

export function TodoItem({
  id,
  content,
  completed,
  setCompleted,
  removeTodo,
  editTodo,
}: TodoItemProps) {
  console.log("RENDER", "TodoItem", id);
  const [editing, setEditing] = useState(false);

  const onEditSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const newContent = formData.get("content");
    if (!newContent) return false;

    editTodo(newContent as string);
    setEditing(false);
  };

  return (
    <form
      onSubmit={onEditSubmit}
      className="flex w-full items-center gap-2 p-2 rounded-lg border bg-card text-card-foreground shadow"
    >
      <Button
        type="button"
        role="checkbox"
        size="icon"
        variant="accent"
        disabled={editing}
        aria-checked={completed}
        className="group shrink-0 size-6 rounded-full text-accent-foreground"
        onClick={() => setCompleted(!completed)}
      >
        <CheckIcon className="opacity-0 group-aria-checked:opacity-100 transition-opacity" />
      </Button>

      {editing ? (
        <Input
          type="text"
          name="content"
          required
          maxLength={50}
          defaultValue={content}
          className="h-auto self-stretch border-none py-0 px-2 grow bg-secondary/50"
        />
      ) : (
        <p className="text-sm break-all text-ellipsis leading-none px-2 grow">
          {content}
        </p>
      )}

      {editing ? (
        <TodoItemEditActions onCancel={() => setEditing(false)} />
      ) : (
        <TodoItemActions
          onEdit={() => setEditing(true)}
          onRemove={() => removeTodo()}
        />
      )}
    </form>
  );
}
