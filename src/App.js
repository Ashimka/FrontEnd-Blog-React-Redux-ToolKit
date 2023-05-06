import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Public from "./pages/Public";
import RequireAuth from "./components/RequireAuth";
import Welcome from "./components/Welcome";
import Login from "./pages/Login";
import UsersList from "./components/UsersList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} />
      {/* public routes */}
      <Route index element={<Public />} />
      <Route path="/login" element={<Login />} />

      {/* protected routes */}
      <Route element={<RequireAuth />}>
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/user/all" element={<UsersList />} />
      </Route>
    </Routes>
  );
}

export default App;
