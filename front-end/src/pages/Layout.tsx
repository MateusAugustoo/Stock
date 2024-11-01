import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { BottomBarNavigate } from "../components/BottonBarNavigate";
import { Loading } from "../components/Loading";

export function Layout() {
  return (
    <>
      <div className="h-screen flex flex-col px-4 pt-7 bg-lime-50">
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>

        <BottomBarNavigate />
      </div>
    </>
  )
}