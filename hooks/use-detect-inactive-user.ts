import { useEffect, useState } from "react";


export const useDetectInactiveUser = () => {
    const [isUserInactive, setIsUserInactive] = useState<boolean>(false)

    const setExpiryTime = () => {
        const expiryTime = Date.now() + 300000;
        localStorage.setItem("expiryTime", expiryTime.toString());
    };
    
    const checkForInactivity = () => {
        const expiryTime = localStorage.getItem("expiryTime");
        if (expiryTime && +expiryTime < Date.now()) {
            setIsUserInactive(true)
        }
    }

    useEffect(() => {
        setExpiryTime();
    
        window.addEventListener("click", setExpiryTime);
        window.addEventListener("keypress", setExpiryTime);
        window.addEventListener("scroll", setExpiryTime);
        window.addEventListener("mousemove", setExpiryTime);
    
        return () => {
            window.removeEventListener("click", setExpiryTime);
            window.removeEventListener("keypress", setExpiryTime);
            window.removeEventListener("scroll", setExpiryTime);
            window.removeEventListener("mousemove", setExpiryTime);
        };
    }, []);
    
    useEffect(() => {
        const interval = setInterval(() => {
            checkForInactivity();
        }, 10000)
    
        return () => {
            clearInterval(interval)
        };
    }, [])

    return isUserInactive
}