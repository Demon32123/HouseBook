import { createBrowserRouter } from "react-router";
import { AuthenticatedLayout } from "./components/AuthenticatedLayout";
import { GuestLayout } from "./components/GuestLayout";
import { DashboardPage } from "./components/DashboardPage";
import { MyLibrary } from "./components/MyLibrary";
import { BookDetail } from "./components/BookDetail";
import { AddBook } from "./components/AddBook";
import { LendingPage } from "./components/LendingPage";
import { CommunityPage } from "./components/CommunityPage";
import { UserLibrary } from "./components/UserLibrary";
import { ProfilePage } from "./components/ProfilePage";
import { LoginPage } from "./components/LoginPage";
import { RegisterPage } from "./components/RegisterPage";
import { NotFound } from "./components/NotFound";

export const router = createBrowserRouter([
  // Guest routes (login, register)
  {
    Component: GuestLayout,
    children: [
      { path: "/login", Component: LoginPage },
      { path: "/register", Component: RegisterPage },
    ],
  },
  // Authenticated routes
  {
    path: "/",
    Component: AuthenticatedLayout,
    children: [
      { index: true, Component: DashboardPage },
      { path: "library", Component: MyLibrary },
      { path: "book/:id", Component: BookDetail },
      { path: "add", Component: AddBook },
      { path: "edit/:id", Component: AddBook },
      { path: "lending", Component: LendingPage },
      { path: "community", Component: CommunityPage },
      { path: "community/:userId", Component: UserLibrary },
      { path: "profile", Component: ProfilePage },
      { path: "*", Component: NotFound },
    ],
  },
]);
