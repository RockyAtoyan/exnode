import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import cl from './Chat.module.scss'


export const Chat = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const [chatMode, setChatMode] = useState(false)

    useEffect(() => {
        // if(location.pathname.split('/').slice(-1)[0] === 'chat') setChatMode(true)
        if (localStorage.getItem('exnode-order-chat')) setChatMode(true)
    }, [location])


    return !chatMode ? <></> : <div className={cl.chat}>
            <button className={cl.close} onClick={() => {
                console.log(location.pathname.split('/').slice(1,location.pathname.split('/').length - 1).join('/'))
                setChatMode(false)
                localStorage.removeItem('exnode-order-chat')
                if(location.pathname.split('/').slice(-1)[0] === 'chat') navigate(location.pathname.split('/').slice(1,location.pathname.split('/').length - 1).join('/'))
            }}>
                <img src="./assets/plus.svg" alt=""/>
            </button>
            <div className={cl.info}>
                <h2>JungSangLee</h2>
                <h3>
                    <span>Order: </span>
                    <span>1</span>
                </h3>
            </div>
            <div className={cl.messages}>
                <button>Оплатить</button>
                <div className={cl.send}>
                    <h2>Example</h2>
                </div>
                <div className={cl.get}>
                    <h2>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi architecto aspernatur at deserunt dignissimos doloremque dolores ducimus et fugiat, laboriosam laborum laudantium minus non odio porro sapiente sunt, temporibus, vitae?</h2>
                </div>

            </div>
            <div className={cl.textarea}>
                <input type={'text'} placeholder={'Ваше сообщение'}/>
                <button>
                    <img src="./assets/send.png" alt=""/>
                </button>
            </div>

    </div>
}