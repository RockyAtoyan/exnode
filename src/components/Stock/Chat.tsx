import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import cl from './Chat.module.scss'


export const Chat = () => {
    const location = useLocation()

    const [chatMode,setChatMode] = useState(false)

    useEffect(() => {
        if(location.pathname.split('/').slice(-1)[0] === 'chat') setChatMode(true)
    },[location])


    return !chatMode ? <></> : <div className={cl.chat}></div>
}