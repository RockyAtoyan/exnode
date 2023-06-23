import React from 'react';
import logo from './logo.svg';
import './App.scss';
import {HashRouter} from "react-router-dom";
import {Header} from "./components/Header/Header";
import {Intro} from "./components/Intro/Intro";
import {Stock} from "./components/Stock/Stock";
import {useDispatch} from "react-redux";
import {setFilterMode, setPaidMode, setSummMode} from "./store/stockReducer";
import {Work} from "./components/Work/Work";
import {Features} from "./components/Feautures/Features";
import {Principles} from "./components/Principles/Principles";
import {Links} from "./components/Links/Links";
import {Ref} from "./components/Ref/Ref";
import {Ques} from "./components/Ques/Ques";
import {Footer} from "./components/Footer/Footer";

const App = () => {
    const dispatch = useDispatch()


    return (
        <HashRouter>
            <div className="wrapper" onClick={(event) => {

                // @ts-ignore
                // @ts-ignore
                if (!event.target.closest('.filter_form .stock_summ') && document.querySelector('.filter_form .stock_currency__toggle').classList.contains('active')) {
                    document.querySelector('.filter_form .stock_currency__toggle')?.classList.remove('active')
                    document.querySelector('.filter_form .currency__select')?.classList.remove('active')
                }
                // @ts-ignore
                if (!event.target.closest('.filter_form .stock_paid') && document.querySelector('.filter_form .stock_paid__toggle').classList.contains('active')) {
                    document.querySelector('.filter_form .stock_paid__toggle')?.classList.remove('active')
                }
                // @ts-ignore
                if (!event.target.closest('.filter_form .stock_filter') && document.querySelector('.filter_form .stock_filter__toggle').classList.contains('active')) {
                    document.querySelector('.filter_form .stock_filter__toggle')?.classList.remove('active')
                }
            }}>
                <Header/>
                <main>
                    <Intro/>
                    <Stock/>
                    <Work />
                    <Features />
                    <Principles />
                    <Links />
                    <Ref />
                    <Ques />
                </main>
                <Footer />
            </div>
        </HashRouter>
    );
}

export default App;
