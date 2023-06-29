import cl from './Header.module.scss'
import lightLangButton from './buttons/language-light.svg'
import Popup from "reactjs-popup";
import {FC, useRef, useState} from "react";
import {ThemeContext, themes} from '../Theme/ThemeContext';
import {useDispatch, useSelector} from "react-redux";
import {getAuthMode, getProfile, getThemeMode, selectUser} from "../../store/selectors";
import {Auth} from "./Auth";
import { setAuthMode } from '../../store/stockReducer';
import { useNavigate } from 'react-router-dom';
import {setUser} from "../../store/profileReduces";

const LiItem:FC<{trigger:any,el:any}> = ({trigger,el}) => {
    const [mode,setMode] = useState(false)

    return <>
        <div className={cl.li_content} onClick={() => setMode(prev => !prev)}>
            {trigger[0]}
            <img src={trigger[1]} style={mode ? {transform:'rotate(180deg)'} : {} } alt=""/>
        </div>
        <ul className={cl.submenu + (mode ? (' ' + cl.active) : '')}>
            {el}
        </ul>
    </>
}

const Toggle:FC<any> = ({ value, onChange, theme }) => (
    <button onClick={() => onChange(!value)}>
        {theme ? <svg width="18" height="18" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M499.541 291.605C494.303 290.295 489.066 291.605 484.483 294.878C467.46 309.282 447.819 321.066 426.214 328.923C405.918 336.779 383.658 340.708 360.088 340.708C307.057 340.708 258.609 319.102 223.91 284.403C189.21 249.703 167.605 201.255 167.605 148.224C167.605 125.964 171.533 104.359 178.08 84.7173C185.282 63.7667 195.757 44.7803 209.506 28.4126C215.398 21.2108 214.089 10.7355 206.887 4.84317C202.304 1.56964 197.067 0.26023 191.829 1.56964C136.179 16.6279 87.7307 50.0179 53.0312 94.5379C19.6412 138.403 3.8147e-06 192.744 3.8147e-06 251.667C3.8147e-06 323.03 28.8071 387.846 75.9459 434.985C123.085 482.124 187.246 510.931 259.264 510.931C319.497 510.931 375.147 489.981 419.667 455.281C464.841 419.927 497.577 369.515 511.326 311.9C513.944 302.735 508.707 293.569 499.541 291.605Z"
                    fill="#131A26"></path>
            </svg>
            :
            <svg width="18" height="18" viewBox="0 0 512 512" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_326_5)">
                    <path
                        d="M346.751 165.249C323.725 142.222 291.217 127.323 256 127.323C220.783 127.323 188.275 141.545 165.249 165.249C142.222 188.275 127.323 220.783 127.323 256C127.323 291.217 142.222 323.725 165.249 346.751C188.275 369.778 220.783 384.677 256 384.677C291.217 384.677 323.725 370.455 346.751 346.751C369.778 323.725 384.677 291.217 384.677 256C384.677 220.783 370.455 188.275 346.751 165.249ZM256 87.3651C265.481 87.3651 273.608 79.2381 273.608 69.7566V17.6085C273.608 8.12698 265.481 0 256 0C246.519 0 238.392 8.12698 238.392 17.6085V69.7566C238.392 79.2381 246.519 87.3651 256 87.3651ZM400.254 136.804L437.503 99.5556C444.275 92.7831 444.275 81.9471 437.503 75.1746C430.73 68.4021 419.894 68.4021 413.122 75.1746L375.873 112.423C369.101 119.196 369.101 130.032 375.873 136.804C381.968 143.577 392.804 143.577 400.254 136.804ZM494.392 238.392H442.243C432.762 238.392 424.635 246.519 424.635 256C424.635 265.481 432.762 273.608 442.243 273.608H494.392C503.873 273.608 512 265.481 512 256C512 246.519 503.873 238.392 494.392 238.392ZM399.577 375.196C392.804 368.423 381.968 368.423 375.196 375.196C368.423 381.968 368.423 392.804 375.196 399.577L412.444 436.825C419.217 443.598 430.053 443.598 436.825 436.825C443.598 430.053 443.598 419.217 436.825 412.444L399.577 375.196ZM256 424.635C246.519 424.635 238.392 432.762 238.392 442.243V494.392C238.392 503.873 246.519 512 256 512C265.481 512 273.608 503.873 273.608 494.392V442.243C273.608 432.762 265.481 424.635 256 424.635ZM111.746 375.196L74.4974 412.444C67.7249 419.217 67.7249 430.053 74.4974 436.825C81.2698 443.598 92.1058 443.598 98.8783 436.825L136.127 399.577C142.899 392.804 142.899 381.968 136.127 375.196C130.032 368.423 119.196 368.423 111.746 375.196ZM87.3651 256C87.3651 246.519 79.2381 238.392 69.7566 238.392H17.6085C8.12698 238.392 0 246.519 0 256C0 265.481 8.12698 273.608 17.6085 273.608H69.7566C79.2381 273.608 87.3651 265.481 87.3651 256ZM111.746 136.804C118.519 143.577 129.354 143.577 136.127 136.804C142.899 130.032 142.899 119.196 136.127 112.423L98.8783 75.1746C92.1058 68.4021 81.2698 68.4021 74.4974 75.1746C67.7249 81.9471 67.7249 92.7831 74.4974 99.5556L111.746 136.804Z"
                        fill="#ABBFD4"></path>
                </g>
                <defs>
                    <clipPath id="clip0_326_5">
                        <rect width="512" height="512" fill="white"></rect>
                    </clipPath>
                </defs>
            </svg>
        }
    </button>
)

export const Header = () => {
    const dispatch: any = useDispatch()
    const navigate = useNavigate()

    const menu = useRef<HTMLUListElement>(null)
    const burger = useRef<HTMLDivElement>(null)

    const theme = useSelector(getThemeMode)
    const profile = useSelector(selectUser)

    const [modalMode,setModalMode] = useState(false)
    //const [authMode,setAuthMode] = useState(false)

    const authMode = useSelector(getAuthMode)
    
    // @ts-ignore
    return <>
            <header className={cl.header}>
                <div className="container">
                    <div className={cl.main}>
                    <img src={'./assets/' + (!theme ? 'logo.svg' : 'exnode-dark.svg')} className={cl.logo}
                        onClick={() => {
                            navigate('/')
                        }}
                        alt="" />
                        <ul className={cl.menu} ref={menu}>
                            <li>
                                <LiItem trigger={
                                    [<h2>Купить криптовалюту</h2>,
                                        './assets/arrow.png']
                                } el={
                                    [
                                        <li>
                                            <img src="./assets/links/monitoring-light.svg" alt=""/>
                                            <a href="https://exnode.ru/">
                                                <span>Мониторинг обменников</span>
                                                <span></span>
                                            </a>
                                        </li>,
                                        <li>
                                            <img src="./assets/links/swap-light.svg" alt=""/>
                                            <a href="https://dex.exnode.ru/swap/">SWAP</a>
                                        </li>,
                                        <li>
                                            <img src="./assets/links/cash-light.svg" alt=""/>
                                            <a href="./">Наличный обмен</a>
                                        </li>,
                                        <li>
                                            <img src="./assets/links/p2p-light.svg" alt=""/>
                                            <a href="https://exnode.ru/exchange/tether_trc20_usdt-usdttrc-to-nalichnye_usd-cashusd/">P2P-торговля</a>
                                        </li>
                                    ]
                                } />
                            </li>
                            <li className={cl.tm}>
                                <a href="https://p2p.exnode.ru/orders/buy/usdt">P2P-торговля</a>
                            </li>
                            <li >
                                <a href="https://dex.exnode.ru/">DeFi</a>
                            </li>
                            <li>
                                <a href="https://api.exnode.ru/">Процессинг</a>
                            </li>
                            <li>
                                <LiItem trigger={
                                    [
                                        <h2>Статьи</h2>,
                                        './assets/arrow.png',
                                    ]
                                } el={
                                    [
                                        <li>
                                            <img src="./assets/links/news-light.svg" alt=""/>
                                            <a href="https://exnode.ru/news/">Новости</a>
                                        </li>,
                                        <li>
                                            <img src="./assets/links/invest-light.svg" alt=""/>
                                            <a href="https://exnode.ru/articles/categories/investitsii/">Инвестиции</a>
                                        </li>,
                                        <li>
                                            <img src="./assets/links/mining-light.svg" alt=""/>
                                            <a href="https://exnode.ru/articles/categories/zarabotok/">Майнинг</a>
                                        </li>
                                    ]
                                } />
                            </li>
                            <li>
                                <LiItem trigger={
                                    [
                                        <h2>Поддержка</h2>,
                                        './assets/arrow.png',
                                    ]
                                } el={
                                    [
                                        <li>
                                            <img src="./assets/links/faq-light.svg" alt=""/>
                                            <a href="https://exnode.ru/faq/">FAQ</a>
                                        </li>,
                                        <li>
                                            <img src="./assets/links/contacts-light.svg" alt=""/>
                                            <a href="https://exnode.ru/help/">Помощь</a>
                                        </li>,
                                        <li>
                                            <img src="./assets/links/help-light.svg" alt=""/>
                                            <a href="https://exnode.ru/contacts/">Контакты</a>
                                        </li>,
                                    ]
                                } />

                            </li>
                        </ul>
                        <div className={cl.actions}>
                            <div className={cl['actions-btns']}>
                                <ThemeContext.Consumer>
                                    {(props) => (
                                        <Toggle
                                            onChange={() => {
                                                // @ts-ignore
                                                if (props.theme === themes.light) props.setTheme(themes.dark)
                                                // @ts-ignore
                                                if (props.theme === themes.dark) props.setTheme(themes.light)
                                            }}
                                            // @ts-ignore
                                            value={props.theme === themes.dark}
                                            theme={theme}
                                        />
                                    )}
                                </ThemeContext.Consumer>
                                {/*<button onClick={() => setModalMode(prevState => !prevState)}>*/}
                                {/*    <img src={`./assets/language${theme ? '' : '-light'}.svg`} alt=""/>*/}
                                {/*</button>*/}
                            </div>
                        <button className={cl.login} onClick={() => {
                            // @ts-ignore
                            if (!profile?.id) dispatch(setAuthMode(!authMode))
                            else navigate('/profile')
                            }}>
                                {(() => {
                                    // @ts-ignore
                                    return profile?.id ? 'Профиль' : 'Войти'
                                })()}
                            </button>
                            {(() => {
                                // @ts-ignore
                                if(profile?.id) return <button className={cl.login} onClick={() => {
                                    localStorage.removeItem('token')
                                    dispatch(setUser(null))
                                }}>Выйти</button>
                            })()}
                        </div>
                        <div className={cl.burger} ref={burger} onClick={() => {
                            menu.current?.classList.toggle(cl.active)
                            burger.current?.classList.toggle(cl.active)
                            document.querySelector('body')?.classList.toggle('scroll')
                        }}>
                            <span></span>
                        </div>
                    </div>
                </div>
            </header>
            <div className={cl.modal + (modalMode ? ' ' + cl.active : '')}>
                <div className={cl.langs}>
                    <h2>Выберете язык</h2>
                    <div className={cl.langs_items}>
                        <div className={cl.langs_item}>
                            <img src="./assets/langs/ru.png" alt=""/>
                            <h3>Русский</h3>
                        </div>
                        <div className={cl.langs_item}>
                            <img src="./assets/langs/ru.png" alt=""/>
                            <h3>Русский</h3>
                        </div>
                        <div className={cl.langs_item}>
                            <img src="./assets/langs/ru.png" alt=""/>
                            <h3>Русский</h3>
                        </div>
                        <div className={cl.langs_item}>
                            <img src="./assets/langs/ru.png" alt=""/>
                            <h3>Русский</h3>
                        </div>
                        <div className={cl.langs_item}>
                            <img src="./assets/langs/ru.png" alt=""/>
                            <h3>Русский</h3>
                        </div>
                        <div className={cl.langs_item}>
                            <img src="./assets/langs/ru.png" alt=""/>
                            <h3>Русский</h3>
                        </div>
                        <div className={cl.langs_item}>
                            <img src="./assets/langs/ru.png" alt=""/>
                            <h3>Русский</h3>
                        </div>
                        <div className={cl.langs_item}>
                            <img src="./assets/langs/ru.png" alt=""/>
                            <h3>Русский</h3>
                        </div>
                        <div className={cl.langs_item}>
                            <img src="./assets/langs/ru.png" alt=""/>
                            <h3>Русский</h3>
                        </div>
                        <div className={cl.langs_item}>
                            <img src="./assets/langs/ru.png" alt=""/>
                            <h3>Русский</h3>
                        </div>
                    </div>
                    <button className={cl.langs_btn} onClick={() => setModalMode(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none"><path stroke="#AEAEAE" strokeLinecap="round" strokeWidth="2" d="m12.727 12.728 8.486 8.485M21.213 12.728l-8.485 8.485"></path></svg>
                    </button>
                </div>
            </div>
        {authMode && <Auth on={() => {
            dispatch(setAuthMode(!authMode))
            }} />}
        </>

}

//aC0`fK1@kK5#aA4*aG2%iI0