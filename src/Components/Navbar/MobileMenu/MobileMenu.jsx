import React from 'react'
import classes from './MobileMenu.module.css'

import dashboard_icon from '../../../Assets/Icons/dashboard.svg'
import calculator_icon from '../../../Assets/Icons/calculator.svg'
import swap_icon from '../../../Assets/Icons/arrow-swap.svg'
import { NavLink } from 'react-router-dom'

const MobileMenu = (props) => {
    return (
        <div className={classes.main}>
            <NavLink
                className={(navData) => (navData.isActive ? classes.active : '')}
                to="/"
            >
                <img src={dashboard_icon} alt="dashboard"/>
                <span>Dashboard</span>
            </NavLink>
            <NavLink
                className={(navData) => (navData.isActive ? classes.active : '')}
                to="/calculator"
            >
                <img src={calculator_icon} alt="calculator"/>
                <span>Calculator</span>
            </NavLink>
            <NavLink
                className={(navData) => (navData.isActive ? classes.active : '')}
                to="/swap"
            >
                <img src={swap_icon} alt="swap"/>
                <span>Swap</span>
            </NavLink>
        </div>
    )
}

export default MobileMenu