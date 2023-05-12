import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import UserPage from "./pages/UserPage";
import Login from "./pages/Login";
import UsersList from "./components/UsersList";
import Home from "./pages/Home";
import FullPost from "./pages/FullPost";
import Register from "./pages/Register";
import Unauthorized from "./pages/Unauthorized";

const ROLES = {
  "admin": 777,
  "user": 333,
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="post/:id" element={<FullPost />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* protected route for the user */}
        <Route element={<RequireAuth allowedRoles={[ROLES.user]} />}>
          <Route path="user/me" element={<UserPage />} />
        </Route>
        {/* protected route for admin */}
        <Route element={<RequireAuth allowedRoles={[ROLES.admin]} />}>
          <Route path="user/all" element={<UsersList />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
