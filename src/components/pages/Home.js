import React, {useContext} from 'react';
import Messager from './Messages/Messager';
import UserContext from "../../context/UserContext";

export default function Home() {
    const {userData} = useContext(UserContext);

    return (
        <div>
            {userData?.token ? (
                <Messager />
            ) : (
                <></>
            )}
            
        </div>
    )
}
