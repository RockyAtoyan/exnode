import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import cl from './Chat.module.scss'
import { useDispatch, useSelector } from "react-redux";
import { createMessage, getMessage } from "../../store/stockReducer";
import { log } from "console";
import { getMessageItems } from "../../store/selectors";


export const Chat = () => {
    const dispatch:any = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const chat = useSelector(getMessageItems)

    const [chatMode, setChatMode] = useState(false)

    const [sendValue, setSendValue] = useState('')
    
    useEffect(() => {
        if (JSON.parse(localStorage.getItem('exnode-order-chat') + '') && JSON.parse(localStorage.getItem('exnode-order-chat') + '').id) dispatch(getMessage(JSON.parse(localStorage.getItem('exnode-order-chat') + '').id))
    }, [])
    

    useEffect(() => {
        // if(location.pathname.split('/').slice(-1)[0] === 'chat') setChatMode(true)
        if (JSON.parse(localStorage.getItem('exnode-order-chat') + '') && JSON.parse(localStorage.getItem('exnode-order-chat') + '').mode) setChatMode(true)
    }, [location])


    return !chatMode ? <></> : <div className={cl.chat}>
            <button className={cl.close} onClick={() => {
                console.log(location.pathname.split('/').slice(1,location.pathname.split('/').length - 1).join('/'))
                setChatMode(false)
                localStorage.removeItem('exnode-order-chat')
                if(location.pathname.split('/').slice(-1)[0] === 'chat') navigate('/' + location.pathname.split('/').slice(1,location.pathname.split('/').length - 1).join('/'))
            }}>
                <img src="./assets/plus.svg" alt=""/>
            </button>
            <div className={cl.info}>
                <h2>JungSangLee</h2>
                <h3>
                    <span>Order: </span>
                    <span>{JSON.parse(localStorage.getItem('exnode-order-chat') + '') && JSON.parse(localStorage.getItem('exnode-order-chat') + '').id}</span>
                </h3>
            </div>
            <div className={cl.messages}>
                <button>Оплатить</button>
                <div className={cl.send}>
                    <h2>Example</h2>
                </div>
                <div className={cl.get}>
                    <h2>
                        Example
                    </h2>
                </div>
                {chat?.map((el:any,idx:number) => {
                    return <div key={el.id} className={cl.get}>
                        <h2>
                            {el.text}
                        </h2>
                    </div>
                }).reverse()}

            </div>
            <div className={cl.textarea}>
                <input type={'text'} value={sendValue} onChange={(event) => {setSendValue(event.currentTarget.value)}} placeholder={'Ваше сообщение'}/>
            <button onClick={() => {
                    debugger
                    const id = JSON.parse(localStorage.getItem('exnode-order-chat') + '').id
                    if(sendValue && id) {
                        dispatch(createMessage({
                            order_id: id,
                            text: sendValue
                        }))
                        setSendValue('')
                    }
                    }}>
                    <img src="./assets/send.png" alt=""/>
                </button>
            </div>

    </div>
}