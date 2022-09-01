import { Routes, Route } from "react-router-dom";

import Signup from "../page/Signup";
import Login from "../page/Login";
import SignupGenderAge from "../components/signupComponents/SignupGenderAge";
import Edit_profile from "../page/Edit_profile";

const Router = () => {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/edit_profile" element={<Edit_profile />} />
      <Route path="/login/detail" element={<SignupGenderAge />} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
};

export default Router;
