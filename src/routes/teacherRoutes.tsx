import { Route } from "react-router-dom";
import TeacherLogin from "../pages/teacher/TeacherLogin";
import TeacherDashboard from "../pages/teacher/TeacherDashboard";
import AddStudent from "../pages/teacher/AddStudent";
import ViewStudents from "../pages/teacher/ViewStudents";
import MarkAttendance from "../pages/teacher/MarkAttendance";
import TeacherChat from "../pages/teacher/TeacherChat";
import AuthGuard from "../components/auth/AuthGuard";
import EditStudent from "../pages/teacher/EditStudent";

export const teacherRoutes = (
  <>
    <Route path="/teacher/login" element={<TeacherLogin />} />
    <Route
      path="/teacher/dashboard"
      element={
        <AuthGuard role="teacher">
          <TeacherDashboard />
        </AuthGuard>
      }
    />
    <Route
      path="/teacher/students"
      element={
        <AuthGuard role="teacher">
          <ViewStudents />
        </AuthGuard>
      }
    />
    <Route
      path="/teacher/add-student"
      element={
        <AuthGuard role="teacher">
          <AddStudent />
        </AuthGuard>
      }
    />
    <Route
      path="/teacher/mark-attendance"
      element={
        <AuthGuard role="teacher">
          <MarkAttendance />
        </AuthGuard>
      }
    />
    <Route
      path="/teacher/chat"
      element={
        <AuthGuard role="teacher">
          <TeacherChat />
        </AuthGuard>
      }
    />
    <Route path="/teacher/edit-student/:id" element={<EditStudent />} />
  </>
);
