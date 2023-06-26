// @ts-ignore

import cl from './Stock.module.scss'
import React, {useEffect, useRef, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    getErrorMessage,
    getFilterMode,
    getFilterTypes,
    getNotificationMode,
    getPaidMode,
    getPaidTypes,
    getStockItems,
    getSuccessMessage,
    getSummMode
} from "../../store/selectors";
import { ToastContainer, toast } from 'react-toastify';
import {getOffersItems, setFilterMode, setNotificationModeAC, setPaidMode, setSummMode} from "../../store/stockReducer";
import {Notification} from "./Notification";
import {StockItem} from "./StockItem";
import {Chat} from "./Chat";
import {getOffers,} from "../../store/offersReducer"


export const Stock = React.memo(() => {
    
    const dispatch:any = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const stockItems = useSelector(getStockItems)

    const summ = useRef<HTMLDivElement>(null)
    const paid= useRef<HTMLDivElement>(null)
    const filter = useRef<HTMLDivElement>(null)
    const currencySelect = useRef<HTMLDivElement>(null)

    const paidTypes = useSelector(getPaidTypes)
    const filterTypes = useSelector(getFilterTypes)
    const successMessage = useSelector(getSuccessMessage)
    const errorMessage = useSelector(getErrorMessage)

    const [toggle, setToggle] = useState(location.pathname === '/' ? 'buy' : (location.pathname.split('/')[1] === 'buy' ? 'buy' : 'sell'))
    const [moneyToggle, setMoneyToggle] = useState(location.pathname === '/' ? 'usdt' : (location.pathname.split('/')[2] === 'usdt' ? 'usdt' : 'btc'))

    const [viewMode,setViewMode] = useState(false)

    //const [notificationMode,setNotificationMode] = useState(false)

    const notificationMode = useSelector(getNotificationMode)

    const [summValue, setSummValue] = useState('')
    const [summToggle, setSummToggle] = useState(false)

    const [paidValue, setPaidValue] = useState<any>([])
    const [paidSelect, setPaidSelect] = useState<any>([])
    const [paidSelectMode, setPaidSelectMode] = useState(false)

    const [filterValue, setFilterValue] = useState(0)

    const [fiatValue, setFiatValue] = useState('')

    const items = stockItems
        // .filter(item => summValue ? item.price >= +summValue : true)
        // .filter(item => paidValue.length > 0 ? paidValue.includes(paidTypes[item.payment_method]) : true)
        .map(item => {
            return <StockItem key={item.id} item={item} type={toggle === 'buy' ? 1 : 2} paidTypes={paidTypes} />
        })

    useEffect(() => {
        // @ts-ignore
        dispatch(getOffers({
            type: toggle ? 2 : 1,
            currency:moneyToggle ? 'usdt' : 'buy',
            limit:summValue,
            payment_method:paidValue.length === 1 ? paidValue[0] : paidValue,
            sort:filterValue === 0 ? 'timestamp' : 'price',
        }));
    }, []);

    useEffect(() => {
        if (paidSelect.length === 0) setPaidValue(paidTypes.map((_,idx) => idx + 1))
        else setPaidValue(paidSelect)
    }, [paidSelect])

    useEffect(() => {
        navigate('/' + toggle + '/' + moneyToggle)
    }, [toggle, moneyToggle])
    

    useEffect(() => {
        dispatch(getOffersItems(toggle === 'buy' ? 1 : 2,moneyToggle === 'usdt' ? 0 : 1))
    },[toggle,moneyToggle])


    const successNotify = () => toast.success("Успешно",
        {
        //theme:theme ? "light" : "dark",
        });
    
    const errorNotify = () => toast.error("Произошла ошибка",
    {
        //theme:theme ? "light" : "dark",
    });
    
    useEffect(() => {
        if(successMessage) successNotify()
    }, [successMessage])
    
    useEffect(() => {
        if(errorMessage) errorNotify()
    },[errorMessage])

    return <>
        <Chat />
        <div className={cl.message}>
            <ToastContainer />
        </div>
        <section id={'stock'}>
            {notificationMode && <Notification onClose={() => { 
                dispatch(setNotificationModeAC(false))
            }} />}
        <div className="container">
            <div className={cl.main}>
                <div className={cl.toggle}>
                    <div className={cl.toggle_btns}>
                        <button className={toggle === 'buy' ? cl.active : ''} onClick={() => {
                            setToggle('buy')
                        }}>Купить
                        </button>
                        <button className={toggle === 'sell' ? cl.active : ''} onClick={() => {
                            setToggle('sell')
                        }}>Продать
                        </button>
                    </div>
                    <div className={cl.monet_toggle__btns}>
                        <h2 className={moneyToggle === 'usdt' ? cl.active : ''} onClick={() => {
                            setMoneyToggle('usdt')
                        }}>USDT</h2>
                        <h2 className={moneyToggle === 'btc' ? cl.active : ''} onClick={() => {
                            setMoneyToggle('btc')
                        }}>BTC</h2>
                    </div>

                </div>
                <div className={cl.mobile + (viewMode ? ' ' + cl.active : '')}>
                    <div className={cl.mobile_form }>
                        <button className={cl.close} onClick={() => setViewMode(false)}>
                            <img src="./assets/plus-solid.svg" alt=""/>
                        </button>
                        <div className={cl.filter_input + ' stock_summ'}>
                            <label htmlFor="summ">Сумма</label>
                            <input type="text" value={summValue}
                                   onChange={(event) => setSummValue(event.currentTarget.value)} name={'summ'} id={'summ'}
                                   placeholder={'Введите сумму'}/>
                            <div ref={currencySelect} className={cl.currency_select + ' stock_currency__select'}>
                                <h3>RUB</h3>
                            </div>
                        </div>
                        <div className={cl.filter_input + ' stock_filter'}>
                            <label >Сортировка</label>
                            <div ref={filter}>
                                <div className={cl.fitler_items}>
                                    {filterTypes.map((el, idx) => {
                                        return <div key={idx} className={cl.paid_item + (filterValue === idx ? (' ' + cl.active) : '')} onClick={() => {
                                            setFilterValue(idx)
                                        }}>
                                            <h3>{el}</h3>
                                            <span style={filterValue === idx ? {background:'#64cb8c'} : {}}></span>
                                        </div>
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className={cl.filter_input + ' stock_paid'}>
                            <label htmlFor="paid">Способ оплаты</label>
                            <input type="text" name={'paid'} id={'paid'} readOnly onClick={() => {
                                paid.current?.classList.toggle('active')
                            }} value={(paidSelect.length === 0) ? 'Все' : paidSelect.join(', ')}/>
                            <div ref={paid}>

                            </div>
                        </div>
                        <div className={cl.filter_input + ' stock_summ'}>
                            <label htmlFor="fiat">Фиат</label>
                            <input type="text" value={fiatValue}
                                   readOnly name={'fiat'} id={'fiat'}
                                   placeholder={'RUB'}/>
                            <div ref={currencySelect} className={cl.currency_select + ' stock_currency__select'}>
                                <h3>₽</h3>
                            </div>
                        </div>
                        <div className={cl.form_actions}>
                            <button>Сбросить</button>
                            <button>Применить</button>
                        </div>
                    </div>
                </div>

                <div className={cl.filter_form + ' filter_form'}>
                    <div className={cl.filter_input + ' stock_summ'}>
                        <label htmlFor="summ">Сумма</label>
                        <input type="text" value={summValue}
                               onChange={(event) => setSummValue(event.currentTarget.value)} name={'summ'} id={'summ'}
                               placeholder={'Введите сумму'}/>
                        <div ref={currencySelect} className={cl.currency_select + ' stock_currency__select'} onClick={() => {
                            summ.current?.classList.toggle('active')
                            currencySelect.current?.classList.toggle('active')
                        }}>
                            <img src="./assets/langs/ru.png" alt=""/>
                            <h3>RUB</h3>
                            <img src='./assets/arrow.png' alt=""/>
                        </div>
                        <div ref={summ} className={'stock_currency__toggle' + ('' ? (' ' + 'active') : '')}>
                            <div className={cl.currency_input}>
                                <input type="text"/>
                                <img src="./assets/searh.png" alt=""/>
                            </div>
                            <div className={cl.currency_items}>
                                <div className={cl.currency_item}>
                                    <img src="./assets/langs/ru.png" alt=""/>
                                    <h3>RUB</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cl.filter_input + ' stock_paid'}>
                        <label htmlFor="paid">Способ оплаты</label>
                        <input type="text" name={'paid'} id={'paid'} readOnly onClick={() => {
                            paid.current?.classList.toggle('active')
                        }} value={(paidSelect.length === 0) ? 'Все' : paidSelect.join(', ')}/>
                        <div ref={paid} className={cl.paid_toggle + ' stock_paid__toggle'}>
                            <div className={cl.paid_items}>
                                {paidTypes.map((el, idx) => {
                                    return <div key={idx} className={cl.paid_item} onClick={() => {
                                        if (paidSelect.includes(idx + 1)) setPaidSelect((prevState: any) => [...prevState.slice(0, paidSelect.indexOf(idx + 1)), ...prevState.slice(paidSelect.indexOf(idx + 1) + 1)])
                                        else setPaidSelect((prevState: any) => [...prevState, idx + 1])
                                    }}>
                                        <span style={paidSelect.includes(idx + 1) ? {background:'#64cb8c'} : {}}></span>
                                        <h3>{el}</h3>
                                    </div>
                                })}

                            </div>
                        </div>
                    </div>
                    <div className={cl.filter_input + ' stock_filter'}>
                        <input type="text" name={'filter'} id={'filter'} readOnly onClick={() => {
                            filter.current?.classList.toggle('active')
                        }} value={'Фильтр'}/>
                        <div className={cl.filter_img + ('' ? (' ' + cl.active) : '')}>
                            <img src="./assets/arrow.png" alt=""/>
                        </div>
                        <div ref={filter} className={cl.filter_toggle + ' stock_filter__toggle'}>
                            <div className={cl.filter_items}>
                                {filterTypes.map((el, idx) => {
                                    return <div key={idx} className={cl.paid_item + (filterValue === idx ? (' ' + cl.active) : '')} onClick={() => {
                                        setFilterValue(idx)
                                    }}>
                                        <h3>{el}</h3>
                                        <span style={filterValue === idx ? {background:'#64cb8c'} : {}}></span>
                                    </div>
                                })}
                            </div>
                        </div>
                    </div>
                        <button className={cl.filter_btn} onClick={() => {
                            dispatch(setNotificationModeAC(!notificationMode))
                    }}>
                        <img src="./assets/plus.png" alt=""/>
                        <h3>Новое объявление</h3>
                    </button>
                    <div className={cl.mobile_btns}>
                            <button onClick={() => {
                                dispatch(setNotificationModeAC(!notificationMode))
                        }}>
                            <img src="./assets/plus-solid.svg" alt=""/>
                        </button>
                        <button>
                            <img src="./assets/refresh.svg" alt=""/>
                        </button>
                        <button onClick={() => setViewMode(prev => !prev)}>
                            <img src="./assets/filters.svg" alt=""/>
                        </button>
                    </div>
                </div>
                <div className={cl.table}>
                    <div className={cl.table_names}>
                        <div>
                            <h2>Мейкеры (% выполнения)</h2>
                        </div>
                        <div>
                            <h2>Цена <span>(по убыванию)</span></h2>
                        </div>
                        <div>
                            <h2>Доступно/Лимит</h2>
                        </div>
                        <div>
                            <h2>Способы оплаты</h2>
                        </div>
                        <div>
                            <h2>Торгуй <span>без комиссий</span></h2>
                        </div>
                    </div>
                    <div className={cl.items}>
                        {items.length > 0 ? items : <h2 style={{color:'var(--text-color)'}}>Предложений нет!</h2>}
                    </div>
                </div>
            </div>
        </div>

    </section>
    </>
})