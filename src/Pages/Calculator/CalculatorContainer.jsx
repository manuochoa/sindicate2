import React from 'react'
import { connect } from 'react-redux'
import Calculator from './Calculator'

const CalculatorContainer = (props) => {
    return (
        <>
            <Calculator/>
        </>
    )
}

let mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, {

})(CalculatorContainer)