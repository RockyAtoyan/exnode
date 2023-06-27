import {useEffect, useRef, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import cl from './Chat.module.scss'
import { useDispatch, useSelector } from "react-redux";
import { createMessage, getMessage } from "../../store/stockReducer";
import { log } from "console";
import {getFetching, getMessageItems} from "../../store/selectors";


export const Chat = () => {
    const dispatch:any = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const scroll = useRef<HTMLDivElement>(null)

    const chat = useSelector(getMessageItems)
    const fetching = useSelector(getFetching)

    const [chatMode, setChatMode] = useState(false)

    const [sendValue, setSendValue] = useState('')

    const [login,setLogin] = useState('')
    
    useEffect(() => {
        if (JSON.parse(localStorage.getItem('exnode-order-chat') + '') && JSON.parse(localStorage.getItem('exnode-order-chat') + '').id) {
            dispatch(getMessage(JSON.parse(localStorage.getItem('exnode-order-chat') + '').id))
        }
    }, [])

    useEffect(() => {
        if(JSON.parse(localStorage.getItem('exnode-order-chat') + '') && JSON.parse(localStorage.getItem('exnode-order-chat') + '').name) setLogin(JSON.parse(localStorage.getItem('exnode-order-chat') + '').name)
    },[chat])

    useEffect(() => {
        scroll.current?.scrollIntoView({behavior:'smooth'})
    },[chat])

    useEffect(() => {
        let timer
        if(chatMode && JSON.parse(localStorage.getItem('exnode-order-chat') + '') && JSON.parse(localStorage.getItem('exnode-order-chat') + '').name) timer = setInterval(() => {
            dispatch(getMessage(JSON.parse(localStorage.getItem('exnode-order-chat') + '')?.id))
        },3000)
        else {
            clearInterval(timer)
        }
    },[chatMode])

    useEffect(() => {
        // if(location.pathname.split('/').slice(-1)[0] === 'chat') setChatMode(true)
        if (JSON.parse(localStorage.getItem('exnode-order-chat') + '') && JSON.parse(localStorage.getItem('exnode-order-chat') + '').mode) setChatMode(true)
    }, [location,fetching])


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
                <h2>{login}</h2>
                <h3>
                    <span>Order: </span>
                    <span>{JSON.parse(localStorage.getItem('exnode-order-chat') + '') && JSON.parse(localStorage.getItem('exnode-order-chat') + '').id}</span>
                </h3>
            </div>
            <div className={cl.messages}>
                <div className={cl.messages__btns}>
                    <button>Аппеляция</button>
                    <button>Оплатить</button>
                </div>
                {chat?.map((el:any,idx:number) => {
                    return <div key={el.id} className={cl.get + ' ' + cl.message}>
                        <h2>
                            <span>{el.user.login}</span>
                            <span>{el.text}</span>
                            {el.timestamp && <span>{timeConverter(el.timestamp)}</span>}
                        </h2>
                    </div>
                }).reverse()}
                <div ref={scroll}></div>
            </div>
            <div className={cl.textarea}>
                <input type={'text'} value={sendValue} onChange={(event) => {setSendValue(event.currentTarget.value)}} placeholder={'Ваше сообщение'}/>
            <button onClick={() => {
                    const id = JSON.parse(localStorage.getItem('exnode-order-chat') + '').id
                    if(sendValue && id) {
                        dispatch(createMessage({
                            order_id: id,
                            text: sendValue
                        }))
                        setSendValue('')
                        scroll.current?.scrollIntoView({behavior:'smooth'})
                    }
                    }}>
                    <img src="./assets/send.png" alt=""/>
                </button>
            </div>

    </div>
}


function timeConverter(UNIX_timestamp:any){
    let a = new Date(UNIX_timestamp * 1000);
    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let hour = a.getHours();
    let min = a.getMinutes();
    let sec = a.getSeconds();
    // let time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    let time = (hour > 10 ? hour : ('0' + hour )) + ':' + (min > 10 ? min : ('0' + min )) + ':' + (sec > 10 ? sec : ('0' + sec )) ;
    return time;
}