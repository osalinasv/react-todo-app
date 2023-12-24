import { cn } from "@/lib/utils";
import { ReactNode, Suspense } from "react";
import { NavLink, Outlet } from "react-router-dom";

function Link({ to, children }: { to: string; children: ReactNode }) {
  console.log("RENDER", "Link");
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring text-primary underline-offset-4 hover:underline h-9 px-4 py-2",
          { underline: isActive },
        )
      }
    >
      {children}
    </NavLink>
  );
}

export function Root() {
  console.log("RENDER", "Root");
  return (
    <div className="max-w-screen-sm mx-auto py-24 px-4">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold">Todo List App</h1>
        <p className="leading-none mb-4 text-muted-foreground">
          in React.js + Vite
        </p>

        <p className="max-w-prose [text-wrap:balance]">
          A simple todo app using React.js in two flavors:
        </p>

        <nav className="mt-2">
          <ul className="inline-flex gap-2">
            <li>
              <Link to="/">With Context</Link>
            </li>
            <li>
              <Link to="/zustand">With Zustand</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}
