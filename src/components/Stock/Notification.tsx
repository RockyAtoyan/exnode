import cl from './Notification.module.scss'
import {FC, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getPaidTypes} from "../../store/selectors";
import { log } from 'console';
import { createOffer } from '../../store/offersReducer';

export const Notification: FC<{ onClose: any }> = ({ onClose }) => {
    const dispatch:any = useDispatch()

    const paidTypes = useSelector(getPaidTypes)

    const [mainMode, setMainMode] = useState(true)

    const [secondMode, setSecondMode] = useState(false)

    const [emailMode, setEmailMode] = useState(false)

    const [activeValue, setActiveValue] = useState<any>('USDTTRC')
    const [activeMode, setActiveMode] = useState(false)

    const [fiatValue, setFiatValue] = useState<any>('RUB')
    const [fiatMode, setFiatMode] = useState(false)

    const [ownPrice, setOwnPrice] = useState(84.94)
    const [priceProcent, setPriceProcent] = useState(100)
    const [priceMode, setPriceMode] = useState(true)

    const [availableValue, setAvailableValue] = useState(0)
    const [minValue, setMinValue] = useState(0)
    const [maxValue, setMaxValue] = useState(0)

    const [paidValue, setPaidValue] = useState<any>([])
    const [paidSelect, setPaidSelect] = useState<any>([])
    const [paidSelectMode, setPaidSelectMode] = useState(false)

    const [requisitesValue, setRequisitesValue] = useState('')
    useEffect(() => {
        setPaidValue(paidSelect)
    }, [paidSelect])

    return <div className={cl.main}>
        <button className={cl.close} onClick={onClose}>
            <img src="./assets/plus-solid.svg" alt=""/>
        </button>
        {emailMode && <div className={cl.email_modal}>
            <div className={cl.email_content}>
                <button onClick={() => setEmailMode(false)}>
                    <img src="./assets/plus-solid.svg" alt=""/>
                </button>
                <h2>Требования для торговли</h2>
                <h3>Подтвердите почту</h3>
                <img src="./assets/email-confirm.svg" alt=""/>
                <h3>Пройдите верификацию</h3>
                <button>Перейти</button>
            </div>
        </div>}
        <div className={cl.content}>
            {!secondMode && <div className={cl.first}>
                <div className={cl.first_btns}>
                    <button className={mainMode ? cl.active : ''} onClick={() => setMainMode(true)}>Хочу купить</button>
                    <button className={!mainMode ? cl.active : ''} onClick={() => {
                        setMainMode(false)
                        setEmailMode(true)
                    }}>Хочу продать
                    </button>
                </div>
                <form className={cl.form}>
                    <div className={cl.first_input}>
                        <div className={cl.input} onClick={() => setActiveMode(prev => !prev)}>
                            {activeValue}
                        </div>
                        {activeMode && <div className={cl.variants}>
                            <div onClick={() => {
                                setActiveValue('USDTTRC')
                            }}>
                                <h2>USDTTRC</h2>
                            </div>
                            <div onClick={() => {
                                setActiveValue('BTC')
                            }}>
                                <h2>BTC</h2>
                            </div>
                        </div>}
                    </div>
                    <img src="./assets/arrow.svg" alt=""/>
                    <div className={cl.first_input}>
                        <div className={cl.input} onClick={() => setFiatMode(prev => !prev)}>
                            {fiatValue}
                        </div>
                        {fiatMode && <div className={cl.variants}>
                            <div onClick={() => {
                                setFiatValue('RUB')
                            }}>
                                RUB
                            </div>
                        </div>}
                    </div>
                </form>
                <div className={cl.price}>
                    <div className={cl.price_info}>
                        <div>
                            <h3>Ваша цена</h3>
                            <h2>{priceMode ? ownPrice.toFixed(2) : (+ownPrice * (priceProcent / 100)).toFixed(2)}₽</h2>
                        </div>
                        <div>
                            <h3>Актуальный курс</h3>
                            <h2>85.17₽</h2>
                        </div>
                    </div>
                    <div className={cl.price_btns}>
                        <div onClick={() => {
                            setPriceMode(true)
                            setOwnPrice(84.15)
                            setPriceProcent(100)
                        }}>
                            <span style={priceMode ? {background: 'var(--accent-color)'} : {}}></span>
                            <h2>Фиксированная</h2>
                        </div>
                        <div onClick={() => {
                            setPriceMode(false)
                            setOwnPrice(84.15)
                            setPriceProcent(100)
                        }}>
                            <span style={!priceMode ? {background: 'var(--accent-color)'} : {}}></span>
                            <h2>Плавающая</h2>
                        </div>
                    </div>
                    <div className={cl.price_content}>
                        <h2>{priceMode ? 'Фиксированная' : 'Плавающая'}</h2>
                        <div className={cl.price_input}>
                            <button
                                onClick={priceMode ? () => setOwnPrice(prev => +prev - .01) : () => setPriceProcent(prev => +prev - .01)}>
                                -
                            </button>
                            <h3>{priceMode ? ownPrice.toFixed(2) : priceProcent.toFixed(2) + '%'}</h3>
                            <button
                                onClick={priceMode ? () => setOwnPrice(prev => +prev + .01) : () => setPriceProcent(prev => +prev + .01)}>
                                +
                            </button>
                        </div>
                    </div>
                    {!priceMode && <div className={cl.price_formula}>
                        <div>
                            <h2>Формула ценообразования:</h2>
                            <h2>{ownPrice.toFixed(2)} * {priceProcent.toFixed(2)}%
                                ≈ {(+ownPrice * (priceProcent / 100)).toFixed(2)} RUB</h2>
                        </div>
                        <h3>Плавающая цена = рыночная цена х обменный курс х коэффициент маржи</h3>
                    </div>}
                </div>
                <button className={cl.next} onClick={() => setSecondMode(true)}>Далее</button>
            </div>}
            {secondMode && <div className={cl.first + ' ' + cl.second}>
                <form className={cl.form}>
                    <div className={cl.item}>
                        <h3>Общая сумма</h3>
                        <div className={cl.first_input}>
                            <input className={cl.input} value={availableValue} onChange={(event) => {
                                if (checkInput(event.currentTarget.value)) setAvailableValue(+event.currentTarget.value)
                            }}/>
                            <h3>USDTTRC</h3>
                        </div>
                    </div>

                    <div className={cl.item}>
                        <h3>Лимиты</h3>
                        <div className={cl.item_content}>
                            <div>
                                <div className={cl.first_input}>
                                    <input className={cl.input} value={minValue} onChange={(event) => {
                                        if (checkInput(event.currentTarget.value)) setMinValue(+event.currentTarget.value)
                                    }}/>
                                    <h3>RUB</h3>
                                </div>
                                <h3 onClick={() => setMinValue(1000)}>Мин. <span>1000</span></h3>
                            </div>

                            <h3>~</h3>
                            <div>
                                <div className={cl.first_input}>
                                    <input className={cl.input} value={maxValue} onChange={(event) => {
                                        if (checkInput(event.currentTarget.value)) setMaxValue(+event.currentTarget.value)
                                    }}/>
                                    <h3>RUB</h3>
                                </div>
                                <h3 onClick={() => setMaxValue(availableValue ? availableValue : 5000000)}>Макс. <span>{availableValue ? availableValue : 5000000}</span>
                                </h3>
                            </div>
                        </div>

                    </div>
                    <div className={cl.item}>
                        <h3>Ваши реквизиты</h3>
                        <div className={cl.first_input}>
                            <input className={cl.input} value={requisitesValue} onChange={(event) => {
                                setRequisitesValue(event.currentTarget.value)
                            }}/>
                        </div>
                    </div>
                </form>
                <div className={cl.paid}>
                    <h3>Способ оплаты</h3>
                    <h2>Выберите до 5 методов оплаты</h2>
                    <div className={cl.paid_select}>
                        <div className={cl.paid_items}>
                            {paidTypes.map((el, idx) => {
                                return <div key={idx} className={cl.paid_item} onClick={() => {
                                    if (paidSelect.includes(idx + 1)) setPaidSelect((prevState: any) => [...prevState.slice(0, paidSelect.indexOf(idx + 1)), ...prevState.slice(paidSelect.indexOf(idx + 1) + 1)])
                                    else setPaidSelect((prevState: any) => [...prevState, idx + 1])
                                }}>
                                    <span style={paidSelect.includes(idx + 1) ? {background: '#64cb8c'} : {}}></span>
                                    <h3>{el}</h3>
                                </div>
                            })}
                        </div>
                        <div>
                        </div>
                    </div>
                    <h3>Срок оплаты — 15 минут</h3>
                </div>
                <button className={cl.prev} onClick={() => setSecondMode(false)}>Назад</button>
                <button className={cl.next} disabled={!activeValue || !fiatValue || !availableValue || !minValue || !maxValue || !requisitesValue || paidValue.length < 1} onClick={() => {
                    const payload = {
                        type:mainMode ? 1 : 2,
                        currency:activeValue === 'USDTTRC' ? 0 : 1,
                        payment_method:paidValue.length === 1 ? paidValue[0] : paidValue,
                        price:priceMode ? ownPrice.toFixed(2) : (+ownPrice * (priceProcent / 100)).toFixed(2),
                        limit:availableValue,
                        limit_start:minValue,
                        limit_end:maxValue,
                        requisites:requisitesValue
                    }
                    dispatch(createOffer(payload,mainMode ? 1 : 2))
                }}>Далее</button>
            </div>}
        </div>
    </div>
}

export function checkInput(str: string) {
    return new RegExp(/(^[0-9]+$)|(^$)/).test(str)
}