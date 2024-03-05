import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PrivateRoute from "./components/PrivateRoute";
import CreatePost from "./pages/CreatePost";
import UpdatePost from "./pages/UpdatePost";
import PostPage from "./pages/PostPage";
import CreateVoucher from "./pages/CreateVoucher";
import CreatePerdm from "./pages/CreatePerdm";
import TimeSheet from "./pages/TimeSheet";
import UpdatePerdm from "./pages/UpdatePerdm";
import CreateVaccibox from "./pages/CreateVaccibox";
import CreateMaintance from "./pages/CreateMaintance";
import CreateReport from "./pages/CreateReport";
import CreateForm from "./pages/CreateForm";
import UpdateVoucher from "./pages/UpdateVoucher";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route element={<PrivateRoute />}> */}
        <Route
          path="/voucher"
          element={<CreateVoucher />}
          allowedRoles={["admin", "staff"]}
        />
        <Route
          path="/perdm"
          element={<CreatePerdm />}
          allowedRoles={["admin", "staff"]}
        />
        <Route
          path="/update-perdm/:perdmId"
          element={<UpdatePerdm />}
          allowedRoles={["admin", "staff"]}
        />
        <Route
          path="/update-voucher/:voucherId"
          element={<UpdateVoucher />}
          allowedRoles={["admin", "staff"]}
        />
        <Route
          path="/timesheet"
          element={<TimeSheet />}
          allowedRoles={["admin", "staff"]}
        />
        {/* </Route> */}
        <Route
          path="/vaccibox"
          element={<CreateVaccibox />}
          allowedRoles={["admin", "staff"]}
        />
        <Route
          path="/maintenance"
          element={<CreateMaintance />}
          allowedRoles={["admin", "staff"]}
        />
        <Route
          path="/reports"
          element={<CreateReport/>}
          allowedRoles={["admin", "staff"]}

        />
         <Route
          path="/form"
          element={<CreateForm/>}
          allowedRoles={["admin", "staff"]}
        />

        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/update-post/:postId" element={<UpdatePost />} />

        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/post/:postSlug" element={<PostPage />} />
      </Routes>
    </BrowserRouter>
  );
}
