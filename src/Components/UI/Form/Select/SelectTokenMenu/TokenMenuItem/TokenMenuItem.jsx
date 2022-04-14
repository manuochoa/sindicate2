import React from 'react'
import classes from './TokenMenuItem.module.css'

const TokenMenuItem = (props) => {
    const { token, setCurrentItem } = props

    const handleClick = () => {
        setCurrentItem(token)
    }

    return (
        <div className={classes.main} onClick={handleClick}>
            <img src={token.img} alt="token_icon" className={classes.img}/>
            <div className={classes.block}>
                <p>{token.value}</p>
                <span>{token.text}</span>
            </div>
            <div className={classes.block}>
                <p>{token.count} K</p>
                <span>{token.cash} $</span>
            </div>
        </div>
    )
}

export default TokenMenuItem