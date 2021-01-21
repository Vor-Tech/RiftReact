import React from "react"
import {Link} from "react-router-dom";
import AuthOptions from "../auth/AuthOptions";

export default function Navbar() {
    return (
        <div>
            <Link to="/"><h1>Rift</h1></Link>
            <AuthOptions />
        </div>
    )
}
