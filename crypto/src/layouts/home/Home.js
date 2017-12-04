import React from 'react'

import UploadQuestionForm from './UploadQuestionForm'

const Home = () => (
  <main className="container">
    <div className="pure-g">
      <div className="pure-u-1-1">
        <h1>DeCAPTCHA</h1>
        <p>Democratizing Data and Identity for the Blockchain.</p>
        <UploadQuestionForm />
      </div>
    </div>
  </main>
)

export default Home
