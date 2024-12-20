import"./FooterStyles.css";
import React from 'react';
import { FaFacebook, FaHome, FaLinkedin, FaMailBulk, FaPhone, FaTwitter, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer">
        <div className="footer-container">
            <div className="left">
                <div className="location">
                  <FaHome size={20} style={{color: "#fff", marginRight: "2rem"}}/>
                  <div>
                   <p>Bodla Agra,</p>
                   <p>UttarPradesh.</p> 
                  </div>
                </div>
                <div className="phone">
                    <h4><FaPhone size={20} style={{color: "#fff", marginRight: "2rem"}}
                     />1-2342-434-12</h4>
 
                </div>
                <div className="email">
                    <h4><FaMailBulk size={20} style={{color: "#fff", marginRight: "2rem"}}
                     />akanshasingh@gmail.com
                </h4>
                </div>
           </div>    
       
           <div className="right">
                <h4>Social</h4>
                <p>This is Akansha singh,Web Developer and Designer Student. let's connect with me on other platforms.          
                </p>
                <div className="social">
                <FaFacebook 
                  size={30} style={{color: "#fff", marginRight: "1rem"}}
                />
                <FaTwitter 
                  size={30} style={{color: "#fff", marginRight: "1rem"}}
                />
                <FaLinkedin 
                  size={30} style={{color: "#fff", marginRight: "1rem"}}
                />
                <FaWhatsapp 
                  size={30} style={{color: "#fff", marginRight: "1rem"}}
                />
                </div>
            </div>
        </div>    
    </div>
  )
}

export default Footer