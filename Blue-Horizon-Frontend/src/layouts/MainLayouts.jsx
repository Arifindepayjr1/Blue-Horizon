import { Outlet } from "react-router-dom";
import NavigationMenu from "../components/NavigationMenu";
function MainLayout(){
    return(
        <>
            <NavigationMenu/>
            <Outlet/>
        </>
    )
}
export default MainLayout;