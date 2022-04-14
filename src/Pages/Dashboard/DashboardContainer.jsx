import React from 'react'
import { connect } from 'react-redux'
import Dashboard from './Dashboard'


const DashboardContainer = (props) => {
    return (
        <>
            <Dashboard/>
        </>
    )
}

let mapStateTopProps = (state) => ({

})

export default connect(mapStateTopProps, {
    
})(DashboardContainer)