import cl from './Work.module.scss'
import {useState} from "react";
import {useSelector} from "react-redux";
import {getThemeMode} from "../../store/selectors";

export const Work = () => {

    const [mode,setMode] = useState(true)

    const theme = useSelector(getThemeMode)


    return <section id={'work'}>
        <div className={cl.banners}>
            <div className={cl.bg + ' ibg'}>
                <img src={`./assets/${theme ? 'banner-light' : 'workBg'}.png`} alt=""/>
            </div>
            <div className="container">
                <h3>Нам доверяют</h3>
                <div className={cl.banners_items}>
                    <div className={cl.banners_item}>
                        <a href="https://www.gazeta.ru/business/news/2023/04/27/20306509.shtml" target={'_blank'}><h2>Коммерсантъ</h2></a>
                    </div>
                    <div className={cl.banners_item}>
                        <a href="https://www.kommersant.ru/doc/5912913?query=exnode" target={'_blank'}>
                            <img src={`./assets/${theme ? 'gazeta.svg' : 'workBanner1.png'}`} alt=""/>
                        </a>
                    </div>
                    <div className={cl.banners_item}>
                        <a href="https://www.rbc.ru/crypto/" target={'_blank'}>
                            <img src={`./assets/${theme ? 'rbk.svg' : 'workBanner2.png'}`} alt=""/>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div className={cl.main}>
            <div className="container">
                <div className={cl.actions}>
                    <div className="title">
                        <h1>Как торговать на P2P-платформе?</h1>
                    </div>
                    <div className={cl.main_btns}>
                        <button className={mode ? cl.active : ''} onClick={() => setMode(true)}>Покупка криптовалюты</button>
                        <button className={!mode ? cl.active : ''} onClick={() => setMode(false)}>Продажа криптовалюты</button>
                    </div>
                </div>
                <div className={cl.items}>
                    {mode && <div className={cl.item}>
                        <div className={cl.item__text}>
                            <p>
                                <h2>Разместите оффер</h2>
                                <h3>
                                    Как только вы разместите оффер на покупку, криптовалюта будет заморожена под вас на Exnode P2P
                                </h3>
                            </p>
                            <p>
                                <h2>Совершите оплату</h2>
                                <h3>
                                    Отправьте точную сумму продавцу, используя один из доступных методов оплаты. Затем подтвердите перевод, нажав на кнопку «Я оплатил»
                                </h3>
                            </p>
                            <p>
                                <h2>Получите криптовалюту</h2>
                                <h3>
                                    Как только продавец подтвердит получение оплаты, замороженная криптовалюта будет переведена вам на кошелек в личном кабинете
                                </h3>
                            </p>
                        </div>
                        <div className={cl.item__img}>
                            <img src={`./assets/work${theme ? '-light' : ''}1.png`} alt=""/>
                        </div>
                    </div>}
                    {!mode && <div className={cl.item}>
                        <div className={cl.item__text}>
                            <p>
                                <h2>Разместите оффер</h2>
                                <h3>
                                    Как только вы разместите оффер на продажу, криптовалюта будет заморожена на площадке Exnode P2P до завершения сделки
                                </h3>
                            </p>
                            <p>
                                <h2>Подтвердите оплату</h2>
                                <h3>
                                    Проверьте поступление оплаты в соответствующем платежном аккаунте, и убедитесь в том, что транзакция соответствует информации в оффере. Затем нажмите кнопку «Подтвердить»
                                </h3>
                            </p>
                            <p>
                                <h2>Отправка криптовалюты</h2>
                                <h3>
                                    Как только вы подтвердите получение оплаты, криптовалюта автоматически отправится покупателю и сделка будет завершена
                                </h3>
                            </p>
                        </div>
                        <div className={cl.item__img}>
                            <img src={`./assets/work${theme ? '-light' : ''}2.png`} alt=""/>
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    </section>
}