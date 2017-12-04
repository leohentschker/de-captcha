import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import PropTypes from 'prop-types'
import Home from './components'
import {cyan500} from 'material-ui/styles/colors'
const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#dadada',
    // primary2Color: cyan700,
    // primary3Color: grey400,
    accent1Color: '#0D2537',
    // accent2Color: grey100,
    // accent3Color: grey500,
    // textColor: darkBlack,
    alternateTextColor: '#0D2537',
    // canvasColor: white,
    // borderColor: grey300,
    // disabledColor: fade(darkBlack, 0.3),
    // pickerHeaderColor: cyan500,
    // clockCircleColor: fade(darkBlack, 0.07),
    // shadowColor: fullBlack,
  },
})

const AppContainer = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <Home />
  </MuiThemeProvider>
)

export default AppContainer
