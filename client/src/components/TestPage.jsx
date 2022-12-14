import React from "react";
import useAuth from "../hooks/useAuth";

const TestPage = () => {
    const {auth} = useAuth()

    console.log(auth)


    return (
        <div>It worked!</div>
    )
}

export default TestPage