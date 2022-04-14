import React from 'react'
import classes from './BaidgesPanel.module.css'

const BaidgesPanel = (props) => {
    const { children } = props

    return (
        <div className={classes.main}>
            {children}
        </div>
    )
}

export default BaidgesPanel