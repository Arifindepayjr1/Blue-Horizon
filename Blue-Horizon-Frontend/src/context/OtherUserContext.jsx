import { createContext } from "react";
import { useState } from "react";

const OtherUserContext = createContext();

export function OtherUserProvider({children}){
     const [otherUser , setOtherUser] = useState({});
     const otherUser_obj = {
        id: otherUser.id,
        name: otherUser.name,
        username: otherUser.username,
        email: otherUser.eamil,
        bio: otherUser.bio,
        profilePicture_url: otherUser.profilePicture?.url || null,
        profilePicture_id: otherUser.profilePicture?.id || null,
        createdAt: otherUser.createdAt
    }

    return(
        <>
            <OtherUserContext.Provider value={{otherUser_obj , setOtherUser}}>
                {children}
            </OtherUserContext.Provider>
        </>
    )
}

export default OtherUserContext;