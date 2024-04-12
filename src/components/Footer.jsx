import React  from 'react';

const Footer = () => {
    const year = new Date().getFullYear();
  
    return <footer className='footer bg-dark text-light' >{`Copyright © Traveller App ${year}`}</footer>;
  };
  
  export default Footer;