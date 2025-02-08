import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";

function WelcomePage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState("");

    useEffect(() => {
        const userToken = localStorage.getItem("userToken");
        const userName = localStorage.getItem("userName");
        setIsAuthenticated(!!userToken);
        setUsername(userName)
    }, []);

    if (isAuthenticated) {
        return <Typography variant="h5">{`Welcome ${username}`}</Typography>;
    }

    return <Typography variant="h5">{'You are not authenticated'}</Typography>;

}

export default WelcomePage;
