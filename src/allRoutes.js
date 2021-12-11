// Pages
import IfNotAuth from "./components/auth/IfNotAuth";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import NotFound from "./pages/NotFound";
import RequireAuth from "./components/auth/RequireAuth";
import Profile from "./pages/Profile";
import Post from "./pages/Post";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditePost";

const appRoutes = [
  {
    path: "/",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
    children: [],
  },
  {
    path: "signup",
    element: (
      <IfNotAuth>
        <Layout>
          <SignUp />
        </Layout>
      </IfNotAuth>
    ),
  },
  {
    path: "signin",
    element: (
      <IfNotAuth>
        <Layout>
          <SignIn />
        </Layout>
      </IfNotAuth>
    ),
  },
  {
    path: "profile",
    element: (
      <RequireAuth>
        <Layout>
          <Profile />
        </Layout>
      </RequireAuth>
    ),
  },
  {
    path: "/post/:postid",
    element: (
      <Layout>
        <Post />
      </Layout>
    ),
  },
  {
    path: "/post/:postid/update",
    element: (
      <RequireAuth>
        <Layout>
          <EditPost />
        </Layout>
      </RequireAuth>
    ),
  },
  {
    path: "create",
    element: (
      <RequireAuth>
        <Layout>
          <CreatePost />
        </Layout>
      </RequireAuth>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default appRoutes;
