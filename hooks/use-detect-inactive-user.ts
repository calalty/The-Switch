import { useEffect, useState } from "react";

export const useDetectInactiveUser = () => {
  const [isUserInactive, setIsUserInactive] = useState<boolean>(false);

  const setExpiryTime = () => {
    const expiryTime = Date.now() + 30 * 1000; // 30 seconds in milliseconds
    localStorage.setItem("expiryTime", expiryTime.toString());
  };

  const checkForInactivity = () => {
    const expiryTime = localStorage.getItem("expiryTime");
    if (expiryTime && +expiryTime < Date.now()) {
      setIsUserInactive(true);
    }
  };

  useEffect(() => {
    setExpiryTime();

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setExpiryTime();
      } else {
        checkForInactivity();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      checkForInactivity();
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return isUserInactive;
};
