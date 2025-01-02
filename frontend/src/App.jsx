import { Route, Routes } from "react-router";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Layout from "./Layout/navlayout";
import ProtectedRoute from "./Layout/protectedRoute";
import Users from "./pages/users";

function App() {
  return (
    <Routes>
      <Route
        index
        element={
          <ProtectedRoute>
            <Layout>
              <Home />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="users"
        element={
          <ProtectedRoute>
            <Layout>
              <Users />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="login"
        element={
          <Layout>
            <Login />
          </Layout>
        }
      />
      <Route
        path="register"
        element={
          <Layout>
            <Register />
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
