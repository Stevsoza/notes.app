const Card = () => {
    return (
        <div style={styles.main}>
            <div></div>
            <div style={styles.card}>
                <div>Body</div>
            </div>
            <div style={{}}></div>
            <div style={styles.card1}>Like</div>
            <div ></div>
            <div style={styles.card2}>Comment</div>
        </div>)
}

const styles = {
    main: {
        height: '200px',
        width: '500px',
        // width: '100%',
        display: 'grid',
        gridTemplateRows: '70% 30%',
        gridTemplateColumns: '1fr 1fr 1fr'
    },
    card: {
        display: 'grid',
        justifyItems: 'center'
    },

    card1: {
        display: 'grid',
        justifyItems: 'right'
    },
    card2: {
        display: 'grid',
        justifyItems: 'left',


    }
}


export default Card