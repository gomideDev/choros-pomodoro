import styles from './styles.module.css'

type GenericProps = {
    children: React.ReactNode
}

export function GenericHtml({children}: GenericProps){
    return <div className={styles.genericHtml}>
        {children}
    </div>
}