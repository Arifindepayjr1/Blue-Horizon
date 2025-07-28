import AppRoutes from "./routes/AppRoutes";
import { UserProvider } from "./context/UserContext";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { OtherUserProvider } from "./context/OtherUserContext";
function App(){
    return(
        <>
        <OtherUserProvider>
            <UserProvider>
                    <ToastContainer/>
                    <AppRoutes/>
            </UserProvider>
        </OtherUserProvider>
        </>
    )
}
export default App;