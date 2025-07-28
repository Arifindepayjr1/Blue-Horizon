import { createContext } from "react";
import {useState} from "react";
const UserContext = createContext();

export function UserProvider({children}){
    const [currentUser , setCurrentUser] = useState(null);

    let testUser = false;
    if(currentUser === null){
        testUser = false;
    }
    const user =  {
        id: currentUser?.id,
        name: currentUser?.name,
        username: currentUser?.username,
        email: currentUser?.email,
        bio: currentUser?.bio,
        profilePicture_url: currentUser?.profilePicture?.url || null,
        profilePicture_id: currentUser?.profilePicture?.id || null
    };

    if(currentUser){
        testUser = true;
    }

    return (
        <UserContext.Provider value={{testUser , user , setCurrentUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;