import React, {FC} from 'react'
import {ThemeContext, themes} from "./ThemeContext";
import {useDispatch} from "react-redux";
import {setThemeMode} from "../../store/stockReducer";


const getTheme = () => {
    const theme = `${window?.localStorage?.getItem('theme')}`
    if (Object.values(themes).includes(theme)) return theme

    const userMedia = window.matchMedia('(prefers-color-scheme: light)')
    if (userMedia.matches) return themes.light

    return themes.dark
}

const ThemeProvider:FC<any> = ({ children }) => {
    const dispatch = useDispatch()

    const [ theme, setTheme ] = React.useState(getTheme)

    React.useEffect(() => {
        document.documentElement.dataset.theme = theme
        localStorage.setItem('theme', theme)
        dispatch(setThemeMode(theme))
    }, [ theme ])

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
    {children}
    </ThemeContext.Provider>
)
}

export default ThemeProvider