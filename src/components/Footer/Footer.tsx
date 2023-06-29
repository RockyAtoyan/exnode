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
                            <a target={'_blank'} href="">
                                <span>Мониторинг</span>
                            </a>
                            <a target={'_blank'} href="http://www.dcx-p2p.com">
                                <span>P2P-торговля</span>
                            </a>
                            <a target={'_blank'} href="">
                                <span>DeFi</span>
                            </a>
                            <a target={'_blank'} href="">
                                <span>Процессинг</span>
                            </a>
                            <a target={'_blank'} href="">
                                <span>Криптовалюта</span>
                            </a>
                            <a target={'_blank'} href="">
                                <span>Обменники</span>
                            </a>

                        </div>
                    </div>
                    <div className={cl.item}>
                        <h2>Поддержка</h2>
                        <div className={cl.item_links}>
                            <a target={'_blank'} href="">
                                <span>Контакты</span>
                            </a>
                            <a target={'_blank'} href="">
                                <span>Политика конфиденциальности</span>
                            </a>
                            <a target={'_blank'} href="">
                                <span>Условия соглашения</span>
                            </a>
                            <a target={'_blank'} href="">
                                <span>Руководство по торговле</span>
                            </a>
                            <a target={'_blank'} href="">
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
                            <a href="http://www.dcx-p2p.com/#/buy/usdt" target={'_blank'}>
                                <span>Купить USDT</span>
                            </a>
                            <a href="http://www.dcx-p2p.com/#/sell/usdt" target={'_blank'}>
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