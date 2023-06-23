import cl from './Footer.module.scss'
import {useSelector} from "react-redux";
import {getThemeMode} from "../../store/selectors";

export const Footer = () => {

    const theme = useSelector(getThemeMode)

    return <footer id={'footer'}>
        <div className="container">
            <div className={cl.content}>
                <div className={cl.main}>
                    <div className={cl.logos}>
                        <img src={'./assets/' + (!theme ? 'logo.svg' : 'exnode-dark.svg')} alt=""/>
                        <div className={cl.links}>
                            <a href="/">
                                <img src="./assets/telegram.svg" alt=""/>
                            </a>
                            <a href="/">
                                <img src="./assets/youtube.svg" alt=""/>
                            </a>
                            <a href="/">
                                <img src="./assets/vk.svg" alt=""/>
                            </a>
                            <a href="/">
                                <img src={`./assets/yandex-dzen${theme ? '-dark' : ''}.svg`} alt=""/>
                            </a>
                            <a href="/">
                                <img src={`./assets/vcru${theme ? '' : '-light'}.svg`} alt=""/>
                            </a>
                        </div>
                    </div>
                    <div className={cl.email}>
                        <a href="/">
                            <img src="./assets/email.svg" alt=""/>
                            <h3>p2p@exnode.ru</h3>
                        </a>
                    </div>
                </div>
                <div className={cl.items}>
                    <div className={cl.item}>
                        <h2>Продукты</h2>
                        <div className={cl.item_links}>
                            <a target={'_blank'} href="https://exnode.ru/">
                                <span>Мониторинг</span>
                            </a>
                            <a target={'_blank'} href="https://p2p.exnode.ru/">
                                <span>P2P-торговля</span>
                            </a>
                            <a target={'_blank'} href="https://dex.exnode.ru/">
                                <span>DeFi</span>
                            </a>
                            <a target={'_blank'} href="https://api.exnode.ru/">
                                <span>Процессинг</span>
                            </a>
                            <a target={'_blank'} href="https://exnode.ru/trading/">
                                <span>Криптовалюта</span>
                            </a>
                            <a target={'_blank'} href="https://exnode.ru/exchangers/">
                                <span>Обменники</span>
                            </a>

                        </div>
                    </div>
                    <div className={cl.item}>
                        <h2>Поддержка</h2>
                        <div className={cl.item_links}>
                            <a target={'_blank'} href="https://exnode.ru/contacts/">
                                <span>Контакты</span>
                            </a>
                            <a target={'_blank'} href="https://p2p.exnode.ru/privacy">
                                <span>Политика конфиденциальности</span>
                            </a>
                            <a target={'_blank'} href="https://p2p.exnode.ru/terms-of-agreement">
                                <span>Условия соглашения</span>
                            </a>
                            <a target={'_blank'} href="https://p2p.exnode.ru/help">
                                <span>Руководство по торговле</span>
                            </a>
                            <a target={'_blank'} href="https://p2p.exnode.ru/rules">
                                <span>Правила торговли</span>
                            </a>

                        </div>
                    </div>
                    <div className={cl.item}>
                        <h2>Социальные сети</h2>
                        <div className={cl.item_links}>
                            <a target={'_blank'} href="https://t.me/exnoderu">
                                <span>Telegram</span>
                            </a>
                            <a target={'_blank'} href="https://vk.com/public207587220?roistat_visit=209042">
                                <span>VK</span>
                            </a>
                            <a target={'_blank'} href="https://ok.ru/group/62876526706875?roistat_visit=209042">
                                <span>Одноклассники</span>
                            </a>
                            <a target={'_blank'} href="https://www.youtube.com/channel/UCBuAFCwmL2xzz6x0NPBCSUw/featured">
                                <span>YouTube</span>
                            </a>

                        </div>
                    </div>
                    <div className={cl.item}>
                        <h2>Торговля</h2>
                        <div className={cl.item_links}>
                            <a href="https://p2p.exnode.ru/orders/buy/usdt" target={'_blank'}>
                                <span>Купить USDT</span>
                            </a>
                            <a href="https://p2p.exnode.ru/orders/sell/usdt" target={'_blank'}>
                                <span>Продать USDT</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <h3 className={cl.copy}>© 2023 Exnode. Все права защищены.</h3>
        </div>
    </footer>
}