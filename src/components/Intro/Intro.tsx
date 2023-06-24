import cl from './Intro.module.scss'
import {useLocation} from "react-router-dom";

export const Intro = () => {
    const location = useLocation()

    return <section id={'intro'}>
        <div className={cl.main}>
            <div className={cl.bg + ' ibg'}>
            </div>
            <div className={cl.content} style={{backgroundImage:`url("./assets/${location.pathname.split('/')[2] === 'btc' ? 'btc' : 'bg'}.png")`}}>
                <h1>Совершайте P2P-сделки на ваших условиях</h1>
                <h2>Выгодный курс покупки и продажи {location.pathname.split('/')[2] === 'btc' ? 'BTC' : 'USDT'} без комиссии на Exnode</h2>
            </div>
            <div className={cl.actions}>
                <h3>Получите 50 ₽ за каждый завершенный ордер</h3>
            </div>
        </div>
    </section>
}