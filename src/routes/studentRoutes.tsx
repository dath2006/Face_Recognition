import { Route } from 'react-router-dom';
import StudentLogin from '../pages/student/StudentLogin';
import StudentDashboard from '../pages/student/StudentDashboard';
import Statistics from '../pages/student/Statistics';
import StudentChat from '../pages/student/StudentChat';
import AuthGuard from '../components/auth/AuthGuard';

export const studentRoutes = (
  <>
    <Route path="/student/login" element={<StudentLogin />} />
    <Route
      path="/student/dashboard"
      element={
        
        <AuthGuard role="student">
          <StudentDashboard />
         </AuthGuard>
      }
    />
    <Route
      path="/student/statistics"
      element={
        
         <AuthGuard role="student">
          <Statistics />
        </AuthGuard> 
      }
    />
    <Route
      path="/student/chat"
      element={
         
         <AuthGuard role="student">
         <StudentChat />
         </AuthGuard> 
      }
    />
  </>
);