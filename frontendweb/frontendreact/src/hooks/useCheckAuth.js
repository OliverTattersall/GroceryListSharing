import { useEffect } from "react";
import { checkIfActiveUser } from "../api/api";
import { useNavigate } from "react-router";


export const useCheckAuth = (user, userContextObject) => {
    const navigate = useNavigate(); 
    useEffect(()=>{
        if(!user){
            setTimeout(()=>{
                if(checkIfActiveUser()){
                    userContextObject.refreshUser();
                }else{
                    navigate('/login'); 
                }
            }, 500);
        }else if(!user.emailVerified){
            navigate('/profile');
        }
    }, [user]);
}