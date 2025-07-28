import { Routes , Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayouts.jsx";
import Home from "../pages/Home.jsx";
import Write from "../pages/Write.jsx";
import Profile from "../pages/Profile.jsx";

import AuthLayout from "../layouts/AuthLayouts.jsx";
import Register from "../pages/register.jsx";
import Login from "../pages/login.jsx";

import About from "../pages/About.jsx";
import SaveLater from "../pages/SaveLater.jsx";
import Likes from "../pages/Likes.jsx";
import EditProfile from "../pages/EditProfile.jsx";
import PostID from "../pages/PostID.jsx";

import Dashboard from "../pages/Dashboard.jsx";
import Content from "../pages/Content.jsx";

function AppRoutes(){

    return(
        <>
            <Routes>
                    <Route element={<MainLayout/>}>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/write" element={<Write/>}/>
                        <Route path="/profile/:id" element={<Profile/>}>
                            <Route path="about" element={<About/>}/>
                            <Route path="post" element={<PostID/>}/>
                            <Route path="save-later" element={<SaveLater/>}/>
                            <Route path="likes" element={<Likes/>}/>
                            <Route path="edit-profile" element={<EditProfile/>}/>
                            <Route path="content" element={<Content/>}/>
                        </Route>
                        <Route path="/dashboard" element={<Dashboard/>}/>
                    </Route>

                    <Route element={<AuthLayout/>}>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>
                    </Route>
            </Routes>
        </>
    )

}
export default AppRoutes;