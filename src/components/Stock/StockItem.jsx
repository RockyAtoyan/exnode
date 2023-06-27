import cl from "./Stock.module.scss";
import {FC, useState} from "react";
import {StockItemType, getMessage} from "../../store/stockReducer";
import {checkInput} from "./Notification";
import {useLocation, useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import { createOffer, createOrder } from "../../store/offersReducer";


export const StockItem = ({ item, type, paidTypes }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const [sellMode,setSellMode] = useState(false)

    //const [giveValue,setGiveValue] = useState('')
    //const [takeValue,setTakeValue] = useState('')

    const [inputValue,setInputValue] = useState('')

    const [paidMode,setPaidMode] = useState(false)

    const [paidSelect, setPaidSelect] = useState(1)

    return <>
        {sellMode ? <div className={cl.sell}>
            <div className={cl.sell_main}>
                <div className={cl.item_info}>
                    <div className={cl.item_profile}>
                        {/*<div className={cl.item_img}>*/}
                        {/*    <img src={item.img} alt=""/>*/}
                        {/*    <span></span>*/}
                        {/*    <span></span>*/}
                        {/*</div>*/}
                        <div>
                            <div className={cl.item_name}>
                                <h2>{item.user.login}</h2>
                            </div>
                        </div>
                    </div>
                    <div className={cl.item_stat}>
                        <h3>{item.percent_success}% ордеров выполнено</h3>
                    </div>
                </div>
                <div className={cl.sell_content}>
                    <div>
                        <h2>Цена</h2>
                        <div>
                            <h2>{item.price}</h2>
                            <h3>{item.currency === 0 ? 'USDT' : 'BTC'}</h3>
                        </div>
                    </div>
                    <div className={cl.sell_item}>
                        <h2>Срок оплаты</h2>
                        <div>
                            <h2>15 минут</h2>
                        </div>
                    </div>
                    <div>
                        <h2>Доступно</h2>
                        <div>
                            <h2>{item.limit}</h2>
                            <h3>USDT</h3>
                        </div>
                    </div>
                    <div className={cl.item_paid}>
                        <h2>
                            Способ оплаты продавца
                        </h2>
                        <div>
                            <button>
                                {paidTypes[item.payment_method - 1]}
                            </button>
                        </div>
                    </div>
                </div>

            </div>
            <div className={cl.sell_form}>
                <div className={cl.sell_input}>
                    <h3>Я отдаю</h3>
                    <div>
                        <div>
                            <input type="text" value={inputValue} onChange={(event) => {
                                if(checkInput(event.currentTarget.value)) setInputValue(event.currentTarget.value)
                            }}/>
                            <h3>RUB</h3>
                        </div>
                        {inputValue && +inputValue < 500 && <h4>Min: 500.00 RUB</h4>}
                    </div>
                </div>
                <div className={cl.sell_input}>
                    <h3>Я получу</h3>
                    <div>
                        <div>
                            <input type="text" value={(+inputValue/item.price).toFixed(2)} />
                            <h3>USDT</h3>
                        </div>
                        {inputValue && +inputValue < 500 && <h4>Min: 5.67 USDT</h4>}
                    </div>
                </div>
                <div className={cl.sell_input}>
                    <button>Выберете способ оплаты</button>
                    {Array.isArray(item.payment_method) ?
                        <div className={cl.paid_items}>
                            {item.payment_method.map((method,idx) => {
                                return <div className={cl.paid_item + ' ' + cl.sell_btn} onClick={() => {
                                    if(paidSelect === method) setPaidSelect(false)
                                    else setPaidSelect(item.payment_method)
                                }}>
                                    <span style={method === paidSelect ? {background: '#64cb8c'} : {}}></span>
                                    <h3>{paidTypes[+item.payment_method - 1]}</h3>
                                </div>
                            })}
                        </div>
                        :
                        <div className={cl.paid_item + ' ' + cl.sell_btn} onClick={() => {
                            if(paidSelect === item.payment_method) setPaidSelect(false)
                            else setPaidSelect(item.payment_method)
                        }}>
                            <span style={item.payment_method === paidSelect ? {background: '#64cb8c'} : {}}></span>
                            <h3>{paidTypes[+item.payment_method - 1]}</h3>
                        </div>
                    }


                </div>
                <div className={cl.sell_info}>
                    <div>
                        <span>Расч. цена</span>
                        <div>
                            <img src="./assets/info.svg" alt=""/>
                            <div>
                                Цена криптовалюты часто меняется в связи с рыночными условиями.Цена, указанная на странице подтверждения ордера, является окончательной.
                            </div>
                        </div>
                        <span>1 USDT ≈ 88.13 RUB</span>
                    </div>
                    <div className={cl.sell_actions}>
                        <button onClick={() => setSellMode(false)}>Отменить</button>
                        <button disabled={!inputValue || paidSelect.length === 0} onClick={() => {
                            dispatch(createOrder({
                                offer_id: item.id,
                                sum:inputValue
                            }))
                            dispatch(getMessage(item.id))
                             if(!(location.pathname.split('/').slice(-1)[0] === 'chat')) navigate('/' + location.pathname.slice(1) + '/chat')
                            if (!localStorage.getItem('exnode-order-chat')) localStorage.setItem('exnode-order-chat', JSON.stringify({
                                id: item.id,
                                mode:true
                            }))
   
                        }}>Купить USDT</button>
                    </div>
                </div>
            </div>
        </div>
        :
            <div className={cl.item}>
                <div className={cl.item_info}>
                    <div className={cl.item_profile}>
                        {/*<div className={cl.item_img}>*/}
                        {/*    <img src={item.img} alt=""/>*/}
                        {/*    <span></span>*/}
                        {/*    <span></span>*/}
                        {/*</div>*/}
                        <div>
                            <div className={cl.item_name}>
                                <h2>{item.user.login}</h2>
                            </div>
                            <div className={cl.item_active}>
                                <h3>{!item.user.is_online && 'Не'} {!item.user.is_online  ? 'в' : 'В'} сети</h3>
                            </div>
                        </div>
                    </div>
                    <div className={cl.item_stat}>
                        <h3>{item.percent_success}% ордеров выполнено</h3>
                    </div>
                </div>
                <div className={cl.item_price}>
                    <h2>{item.price}</h2>
                    <h3>{item.currency === 0 ? 'USDT' : 'BTC'}</h3>
                </div>
                <div className={cl.item_limit}>
                    <div>
                        <h2>Доступно</h2>
                        <h2>
                            <span>{item.limit}</span>
                            <span>USDT</span>
                        </h2>
                    </div>
                    <div>
                        <h2>Лимит</h2>
                        <h2>
                    <span>
                        {item.limit_start}.00 - {item.limit_end}.00
                    </span>
                            <span>RUB</span>
                        </h2>
                        <span></span>
                    </div>
                </div>
                <div className={cl.item_paid}>
                    <button>
                        {paidTypes[item.payment_method - 1]}
                    </button>
                </div>
                <div className={cl.item_btn} onClick={() => setSellMode(true)}>
                    <button>{type === 1 ? 'Купить' : 'Продать'} USDT</button>
                </div>
            </div>
        }
    </>
}