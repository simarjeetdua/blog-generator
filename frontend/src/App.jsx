import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes.jsx";
import Navbar from "./components/Navbar.jsx";


function App(){
  return (
    <BrowserRouter>
     <AppRoutes/>
     <Navbar/>
    </BrowserRouter>
  );
}
export default App;