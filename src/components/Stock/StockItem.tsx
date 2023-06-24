import cl from "./Stock.module.scss";
import {FC, useState} from "react";
import {StockItemType} from "../../store/stockReducer";
import {checkInput} from "./Notification";
import {useNavigate} from "react-router-dom";


export const StockItem:FC<{ item: StockItemType }> = ({item}) => {
    const navigate = useNavigate()

    const [sellMode,setSellMode] = useState(false)

    //const [giveValue,setGiveValue] = useState('')
    //const [takeValue,setTakeValue] = useState('')

    const [inputValue,setInputValue] = useState('')

    const [paidMode,setPaidMode] = useState(false)

    const [paidSelect, setPaidSelect] = useState<any>([])

    return <>
        {sellMode ? <div className={cl.sell}>
            <div className={cl.sell_main}>
                <div className={cl.item_info}>
                    <div className={cl.item_profile}>
                        <div className={cl.item_img}>
                            <img src={item.img} alt=""/>
                        </div>
                        <div>
                            <div className={cl.item_name}>
                                <h2>{item.name}</h2>
                            </div>
                        </div>
                    </div>
                    <div className={cl.item_stat}>
                        <h3>{item.ordersCount} ордеров / {item.ordersProcent}% выполнено</h3>
                    </div>
                </div>
                <div className={cl.sell_content}>
                    <div>
                        <h2>Цена</h2>
                        <div>
                            <h2>{item.price}</h2>
                            <h3>{item.monetType}</h3>
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
                            <h2>{item.limit.available}</h2>
                            <h3>USDT</h3>
                        </div>
                    </div>
                    <div className={cl.item_paid}>
                        <h2>
                            Способ оплаты продавца
                        </h2>
                        <div>
                            <button>
                                {item.paidType}
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
                            <input type="text" value={inputValue} onChange={(event) => {
                                if(checkInput(event.currentTarget.value)) setInputValue(event.currentTarget.value)
                            }}/>
                            <h3>USDT</h3>
                        </div>
                        {inputValue && +inputValue < 500 && <h4>Min: 5.67 USDT</h4>}
                    </div>
                </div>
                <div className={cl.sell_input}>
                    <button>Выберете способ оплаты</button>
                    <div className={cl.paid_item + ' ' + cl.sell_btn} onClick={() => {
                        if (paidSelect.includes(item.paidType)) setPaidSelect((prevState: any) => [...prevState.slice(0, paidSelect.indexOf(item.paidType)), ...prevState.slice(paidSelect.indexOf(item.paidType) + 1)])
                        else setPaidSelect((prevState: any) => [...prevState, item.paidType])
                    }}>
                        <span style={paidSelect.includes(item.paidType) ? {background: '#64cb8c'} : {}}></span>
                        <h3>{item.paidType}</h3>
                    </div>
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
                            navigate('chat')
                        }}>Купить USDT</button>
                    </div>
                </div>
            </div>
        </div>
        :
            <div className={cl.item}>
                <div className={cl.item_info}>
                    <div className={cl.item_profile}>
                        <div className={cl.item_img}>
                            <img src={item.img} alt=""/>
                            <span></span>
                            <span></span>
                        </div>
                        <div>
                            <div className={cl.item_name}>
                                <h2>{item.name}</h2>
                            </div>
                            <div className={cl.item_active}>
                                <h3>{!item.active && 'Не'} {!item.active ? 'в' : 'В'} сети</h3>
                            </div>
                        </div>
                    </div>
                    <div className={cl.item_stat}>
                        <h3>{item.ordersCount} ордеров / {item.ordersProcent}% выполнено</h3>
                    </div>
                    <div className={cl.item_btns}>
                        <div className={cl.item_likes}>
                            <img src="./assets/like.png" alt=""/>
                            <h4>{item.likesCount}</h4>
                        </div>
                        <div className={cl.item_dislikes}>
                            <img src="./assets/dislike.png" alt=""/>
                            <h4>{item.dislikesCount}</h4>
                        </div>
                    </div>
                </div>
                <div className={cl.item_price}>
                    <h2>{item.price}</h2>
                    <h3>{item.monetType}</h3>
                </div>
                <div className={cl.item_limit}>
                    <div>
                        <h2>Доступно</h2>
                        <h2>
                            <span>{item.limit.available}</span>
                            <span>USDT</span>
                        </h2>
                    </div>
                    <div>
                        <h2>Лимит</h2>
                        <h2>
                    <span>
                        {item.limit.range[0]}.00 - {item.limit.range[1]}.00
                    </span>
                            <span>RUB</span>
                        </h2>
                        <span></span>
                    </div>
                </div>
                <div className={cl.item_paid}>
                    <button>
                        {item.paidType}
                    </button>
                </div>
                <div className={cl.item_btn} onClick={() => setSellMode(true)}>
                    <button>Продать USDT</button>
                </div>
            </div>
        }
    </>
}