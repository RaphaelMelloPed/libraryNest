import styles from './Container.module.css'

export default function container({children}) {
    return(
        <section className={styles.container}>
            {children}
        </section>
    )
}