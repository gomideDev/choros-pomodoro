import { HistoryIcon, HouseIcon, MoonIcon, SettingsIcon, SunIcon } from "lucide-react"
import styles from "./styles.module.css"
import { useState, useEffect } from "react"

type AvailableThemes = 'dark' | 'light';

export function Menu(){

    const nextThemeIcon = {
        dark: <SunIcon/>,
        light: <MoonIcon/>
    }

    const [theme, setTheme] = useState<AvailableThemes>(()=>{
        const localTheme = localStorage.getItem("theme") as AvailableThemes || "dark"
        return localTheme;

    })

    function handleThemeChenge(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>){
        event.preventDefault();
        setTheme((prevTheme)=>{
            const nextTheme = prevTheme === 'dark'? 'light': 'dark'
            return nextTheme;
        })
    }

    useEffect(()=>{
        document.documentElement.setAttribute('data-theme', theme)
        localStorage.setItem("theme", theme)
    }, [theme])

    return (
        <nav className={styles.menu}>
            <a className={styles.menuLink} href="#" aria-label="Ir para a Home" title="Ir para a Home">
            <HouseIcon/>
            </a>
             <a className={styles.menuLink} href="" aria-label="Ver historico" title="Ver historico">
            <HistoryIcon/>
            </a>
             <a className={styles.menuLink} href="" aria-label="Ir para configurações" title="Ir para configurações">
            <SettingsIcon/>
            </a>
             <a className={styles.menuLink} href="" aria-label="Mudar tema" title="Mudar tema" onClick={handleThemeChenge}>
            {nextThemeIcon[theme]}
            </a>
        </nav>
    )
}