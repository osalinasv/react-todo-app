import { ReactNode } from "react";

type TodoListContainerProps = {
  children: ReactNode;
};

export function TodoListContainer({ children }: TodoListContainerProps) {
  console.log("RENDER", "TodoListContainer");

  return (
    // biome-ignore lint/a11y/noRedundantRoles: Force role due to Tailwind's unstyled list not being read as a list
    <ul className="grid gap-2" role="list">
      {children}
    </ul>
  );
}
