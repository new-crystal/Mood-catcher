import { Routes, Route } from "react-router-dom";

import Signup from "../page/Signup";
import Login from "../page/Login";
import SignupGenderAge from "../components/signupComponents/SignupGenderAge";

const Router = () => {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/login/detail" element={<SignupGenderAge />} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
};

export default Router;
