// external
import React from 'react'
import PropTypes from 'prop-types'
import swal from 'sweetalert2'

// internal
import UploadForm from './UploadForm'
import Header from './Header'
import Footer from './Footer'
import Api from '../Api'
import './Home.scss'

const api = Api.create()

const Home = () => (
  <div id="home">
    <Header />
    <UploadForm />
    <Footer />
  </div>  
)

export default Home
