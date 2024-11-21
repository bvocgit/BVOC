import React from 'react';
import Navbar from '../components/Navbar';

import Footer from '../components/Footer';
import HeroImg2 from '../components/HeroImg2';

const About = () => {
  return (
    <div>
      <Navbar/>
      <HeroImg2 heading="ABOUT." text="I am currently pursuing a dual degree: A Bachelor's in Web Designing from Delhi University
       and a BBA from DEI(Dayalbagh Educational Institute). With a solid foundation in web development, Python, and computer fundamentals, 
       I am eager to apply my knowledge in real-world scenarios and continuously explore new areas in technology and design.

       Bachelor's in Web Designing, Delhi University (Expected Graduation: [2026])
       BBA, DEI (Expected Graduation: [2025])"/>
       <HeroImg2 heading="Experience" text="Computer Teacher
       Taught 50 students, honing my ability to convey complex concepts clearly and effectively.

       Intern at HQVFX
       Currently expanding my skills and gaining valuable industry experience.

       Intern in Painting
       Gained practical experience and enhanced my artistic skills."/>
      <Footer/>
    </div>
  )
}

export default About