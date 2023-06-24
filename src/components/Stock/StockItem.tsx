import cl from "./Stock.module.scss";
import {FC} from "react";
import {StockItemType} from "../../store/stockReducer";


export const StockItem:FC<{ item: StockItemType }> = ({item}) => {

    return <div className={cl.item}>
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
        <div className={cl.item_btn}>
            <button>Продать USDT</button>
        </div>
    </div>
}