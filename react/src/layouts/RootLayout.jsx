import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <div
      className="flex min-h-screen justify-center"
      style={{ backgroundColor: "var(--color-base-grey)" }}
    >
      <div
        className="flex min-h-screen w-full max-w-(--maxwidth-app-layout) flex-col"
        style={{ backgroundColor: "var(--color-base-white)" }}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default RootLayout;
