import React from 'react'
import Baidge from '../../UI/Baidge/Baidge'
import Card from '../../UI/Card/Card'
import classes from './TotalWallets.module.css'

import wallet_icon from '../../../Assets/Icons/wallet.svg'
import chart_icon from '../../../Assets/Icons/charts.svg'

const TotalWallets = (props) => {
    const { wallet } = props

    return (
        <Card className={classes.main}>
            <Baidge
                icon={wallet_icon}
                text="Today’s Gains"
                value={`$${wallet.total.value} K`}
            />
            <Baidge
                icon={chart_icon}
                text="Today’s Gains"
                value={`${wallet.dyson}x`}
            />
        </Card>
    )
}

export default TotalWallets