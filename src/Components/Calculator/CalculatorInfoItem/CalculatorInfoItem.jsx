import React from 'react'
import Baidge from '../../UI/Baidge/Baidge'
import Card from '../../UI/Card/Card'
import classes from './CalculatorInfoItem.module.css'

const CalculatorInfoItem = (props) => {
    const { icon, text, value } = props

    return (
        <Card className={classes.main}>
            <Baidge
                className={classes.baidge}
                icon={icon}
                text={text}
                value={value}
            />
        </Card>
    )
}

export default CalculatorInfoItem