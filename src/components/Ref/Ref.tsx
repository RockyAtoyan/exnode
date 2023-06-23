import cl from './Ref.module.scss'
import {FC, useState} from "react";

type InputProps = {
    min:number
    max:number
    value:number
    setValue:any
}
const Input:FC<InputProps> = ({min,max,value,setValue}) => {
    const [price, setPrice] = useState(0);

    const handleChangeNumber = (e:any) => {
        const numbers = e.target.value;
        if(numbers <= max) setValue(numbers);
    };
    const handleChangeRange = (e:any) => {
        const numbers = e.target.value;
        setValue(numbers);
    };

    return (
        <div className={cl.inputs}>
            <input
                type="range"
                min={min}
                max={max}
                onChange={(e) => handleChangeRange(e)}
                value={value}
            />
            <input
                type="text"
                onChange={(e) => handleChangeNumber(e)}
                value={value.toString()}
            />
        </div>
    );
};

export const Ref = () => {

    const [profit,setProfit] = useState(10)
    const [refsCount,setRefsCount] = useState(10)

    return <section id={'ref'}>
        <div className="container">
            <div className={cl.main}>
                <div className={cl.content}>
                    <h1>
                        Приглашай друзей и зарабатывай криптовалюту
                    </h1>
                    <button>
                        Получить реферальную ссылку
                    </button>
                </div>
                <div className={cl.calc}>
                    <div className={cl.calc__item}>
                        <h2>Оборот ваших друзей в USDT</h2>
                        <Input min={10} max={10000} value={profit} setValue={setProfit} />
                    </div>
                    <div className={cl.calc__item}>
                        <h2>Количество рефералов</h2>
                        <Input min={10} max={1000} value={refsCount} setValue={setRefsCount} />
                    </div>
                    <div className={cl.calc__price}>
                        <h2>Вы заработаете</h2>
                        {
                            function (){
                                let res = (profit*refsCount*0.03).toFixed(2)
                                return <h3>
                                    <span>
                                        {
                                            res.split('.')[0].length > 3 ?
                                                res.split('.')[0].slice(0,Math.floor(res.split('.')[0].length/3) + (res.split('.')[0].length <= 4 ? 0 : 1)) + ',' + res.split('.')[0].slice(Math.floor(res.split('.')[0].length/3) + (res.split('.')[0].length <= 4 ? 0 : 1)) + '.' + res.split('.')[1] :
                                                res
                                        }
                                    </span>
                                    <span>
                                        ₽
                                    </span>
                                </h3>
                            }()
                        }
                    </div>
                </div>
            </div>
        </div>
    </section>
}