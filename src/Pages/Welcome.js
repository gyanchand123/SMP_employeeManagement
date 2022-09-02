import React from 'react';
import welcome from '../assets/img/welcome.png';
import classes from './welcome.module.css'

const Welcome = () => {
  return (
    <div className={classes.parent}>
      <img src={welcome} alt="welcome everyone" className={classes.welcomePage} />
    </div>
  )
}

export default Welcome