import cl from './Principles.module.scss'

export const Principles = () => {
    return <section id={'principles'}>
        <div className={cl.bg}>

        </div>
        <div className={cl.main}>
            <div className="container">
                <div className="title">
                    <h1>Наши ценности</h1>
                </div>
            </div>
            <div className={cl.items}>
                <div className={cl.item}>
                    <div className={cl.rr}>
                        {Array(3).fill(0).map((_, idx) => {
                            return <img key={idx} src="./assets/rr.png" decoding='async' alt=""
                                        style={{animationDelay: idx * 3 + 's'}}/>
                        })}
                    </div>
                    <div className={cl.item_content}>
                        <div className={cl.item_title}>
                            <img src="" alt=""/>
                            <h2>Заработок</h2>
                        </div>
                        <h3>
                            Одна из основных наших целей - дать людям по всему миру возможность зарабатывать, инвестируя
                            и торгуя криптовалютами. Криптовалюты активно развиваются и занимают рынок. Мы следуем
                            развитию мира криптовалют и адаптируем наши разработки под все изменения
                        </h3>
                    </div>
                </div>
                <div className={cl.item}>
                    <div className={cl.rr}>
                        {Array(3).fill(0).map((_, idx) => {
                            return <img key={idx} src="./assets/rr.png" decoding='async' alt=""
                                        style={{animationDelay: idx * 3 + 's'}}/>
                        })}
                    </div>
                    <div className={cl.item_content}>
                        <div className={cl.item_title}>
                            <img src="" alt=""/>
                            <h2>Безопасность</h2>
                        </div>
                        <h3>
                            Длительный опыт работы с криптовалютами позволяет нам снизить риски мошенничества, обмана и
                            манипуляций. Мы наблюдаем за работой нашей платформы и пресекаем любые действия, нарушающие
                            правила торговли
                        </h3>
                    </div>
                </div>
                <div className={cl.item}>
                    <div className={cl.rr}>
                        {Array(3).fill(0).map((_, idx) => {
                            return <img key={idx} src="./assets/rr.png" decoding='async' alt=""
                                        style={{animationDelay: idx * 3 + 's'}}/>
                        })}
                    </div>
                    <div className={cl.item_content}>
                        <div className={cl.item_title}>
                            <img src="" alt=""/>
                            <h2>Качество</h2>
                        </div>
                        <h3>
                            Качество продукта - то, к чему мы всегда стремились и будем стремиться. Мы хотим, чтобы
                            любые действия на нашей платформе проходили быстро, стабильно и выгодно для пользователей
                        </h3>
                    </div>
                </div>
                <div className={cl.item}>
                    <div className={cl.rr}>
                        {Array(3).fill(0).map((_, idx) => {
                            return <img key={idx} src="./assets/rr.png" decoding='async' alt=""
                                        style={{animationDelay: idx * 3 + 's'}}/>
                        })}
                    </div>
                    <div className={cl.item_content}>
                        <div className={cl.item_title}>
                            <img src="" alt=""/>
                            <h2>Независимость</h2>
                        </div>
                        <h3>
                            Мы создаем платформы без централизованного посредника, где условия работы устанавливают сами
                            пользователи, а не любая другая сторона
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    </section>
}