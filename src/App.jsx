import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddExpense from "./pages/AddExpense";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import BudgetPage from "./pages/BudgetPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AuthProvider, { UserContext } from "./context/AuthContext";
import Header from "./components/Header";
import { useContext } from "react";
import UpdateBudget from "./pages/UpdateBudget";
import Analytics from "./pages/Analytics";


const App = () => {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  )
}

const MainApp = () => {
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;
  return (
    <Router>
      {token && <Header />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-expense"
          element={
            <ProtectedRoute>
              <AddExpense />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-expenses"
          element={
            <ProtectedRoute>
              <BudgetPage />
            </ProtectedRoute>
          }
        />
        <Route path="/update-budget" element={
          <ProtectedRoute>
            <UpdateBudget />
          </ProtectedRoute>
        } />
        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />

        {/* Default to Login if route is not found */}
        <Route path="*" element={<Login />} />

      </Routes>
    </Router>
  );
};

export default App;
