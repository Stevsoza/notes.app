import styles from "./Alert.module.scss"

const Alert = ({ msg, showOff }) => {
    const handleClick = () => {
        showOff()
    }
    let layout =
        <div className={styles['context']}>
            <div>
                <div>{msg}</div>
                <button onClick={handleClick}>Aceptar</button>
            </div>
        </div>
    return (
        layout
    )
}

export default Alert