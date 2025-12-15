import { Route, Routes } from "react-router-dom";
import SplashScreen from "./Pages/SplashScreen/SplashScreen";
import { Login } from "./Pages/Login/Login";
import { Home } from "./Pages/Home/Home";
import { LogsPage } from "./Pages/LogsPage/LogsPage";
import { UserManagement } from "./Pages/UserManagement/UserManagement";
import { RegisterUser } from "./Pages/RegisterUser/RegisterUser";
import { RegisterUser02 } from "./Pages/RegisterUser02/RegisterUser02";
import { NewOccurrence } from "./Pages/NewOccurrence/NewOccurrence";
import { Dashboard } from "./Pages/Dashboard/Dashboard";



export function App() {
  return (
    <Routes>
      <Route path="/" element={<SplashScreen onFinish={() => window.location.replace("/Login")} />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/Logs" element={<LogsPage />} />
      <Route path="/UserManagement" element={<UserManagement />} />
      <Route path="/RegisterUser" element={<RegisterUser />} />
      <Route path="/RegisterUser/02" element={<RegisterUser02 />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/NewOccurrence" element={<NewOccurrence />} />
      <Route path="*" element={<h1>Página Não Encontrada - Erro 404</h1>} />
    </Routes>
  )
}

