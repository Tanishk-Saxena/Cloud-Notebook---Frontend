import React from 'react'

const About = () => {
  return (
    <>
    <div className="about-container">
      <div className="about">
          <div>
            <h4>Welcome to Cloud Notebook!</h4>
            <li>Your one-stop destination for storing, reviewing, and updating your notes, chores, and documents.</li>
            <li>Quick and easy access, anywhere, anytime!</li>
            <li>Sign up for the service, and store all your documents now!</li>
          </div>
          <img src={require('../images/about.png')} alt="" />
      </div>
    </div>
    
    <div className='footer'>Made with 💖 by Tanishk.</div>
    </>
  )
}

export default About