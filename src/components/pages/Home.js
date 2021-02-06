import React, {useContext} from 'react';
import Messager from './Messages/Messager';
import UserContext from "../../context/UserContext";

export default function Home() {
    const {token} = useContext(UserContext);

    return (
        <div>
            {token ? (
                <Messager />
            ) : (
                <></>
            )}
            
        </div>
    )
}
