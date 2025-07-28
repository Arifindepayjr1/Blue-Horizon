import { createContext } from "react";
import {useState} from "react";
const UserContext = createContext();

export function UserProvider({children}){
    const [currentUser , setCurrentUser] = useState({});
    const user = {
        id: currentUser.id,
        name: currentUser.name,
        username: currentUser.username,
        email: currentUser.eamil,
        bio: currentUser.bio,
        profilePicture_url: currentUser.profilePicture?.url || null,
        profilePicture_id: currentUser.profilePicture?.id || null
    }

    return (
        <UserContext.Provider value={{user , setCurrentUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;