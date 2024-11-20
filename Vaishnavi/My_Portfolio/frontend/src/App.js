import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import myImage from './my_img1.jpg';

function App() {
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [softskills, setSoftSkills] = useState([]);
  const [achievements, setAchievements] = useState([]);


  useEffect(() => {
    axios.get('http://localhost:5000/skills')
      .then((response) => {
        console.log('Skills:', response.data);
        setSkills(response.data);
      })
      .catch((error) => console.error('Error fetching skills:', error));

    axios.get('http://localhost:5000/project')
      .then((response) => {
        console.log('Projects:', response.data);
        setProjects(response.data);
      })
      .catch((error) => console.error('Error fetching projects:', error));

    axios.get('http://localhost:5000/softskills')
      .then((response) => {
        console.log('SoftSkills:', response.data);
        setSoftSkills(response.data);
      })
      .catch((error) => console.error('Error fetching skills:', error));

    axios.get('http://localhost:5000/achievements')
      .then((response) => {
        console.log('Achievements:', response.data);
        setAchievements(response.data);
      })
      .catch((error) => console.error('Error fetching achievements:', error));
  }, []);

  return (
    <div className="App">
      <h1 className="Header">Vaishnavi's Portfolio</h1>
      <p className="para">I am a B.Voc Web Designing student in Kalindi College,Delhi University. I am Determined and Hard Working , can also work well in team.Being a Web Developer, Backend is my strength and will be happy to make my career in it. </p>
      <img src={myImage} alt="Image" className="intro-image" />
      <div className="list-container">
        <section className="list-box Education">
          <h2>Education</h2>
          <table>
            <tr>
              <th>Course/Class</th>
              <th>University/Board</th>
              <th>Grades</th>
            </tr>
            <tr>
              <td>10th</td>
              <td>CBSE</td>
              <td>93.8%</td>
            </tr>
            <tr>
              <td>12th</td>
              <td>CBSE</td>
              <td>95.2%</td>
            </tr>
            <tr>
              <td>B.Voc</td>
              <td>Delhi University</td>
              <td>currently pursuing</td>
            </tr>
          </table>
        </section>
        <section className="list-box language">
          <h2>Language</h2>
          <ul>
            <li>English</li>
            <li>Hindi</li>
          </ul>
        </section>
        <section className="list-box skills">
          <h2>Skills</h2>
          <ul>
            {skills.map(skill => (
              <li key={skill.ID} className="ListElement" >{skill.Name} - {skill.Level}</li>
            ))}
          </ul>
        </section>
        <section className="list-box soft-skills">
          <h2>Soft Skills</h2>
          <ul>
            {softskills.map(softskill => (
              <li key={softskill.ID} className="ListElement" >{softskill.Name}</li>
            ))}
          </ul>
        </section>
        <section className="list-box projects">
          <h2>Projects</h2>
          <ul>
            {projects.map(project => (
              <li key={project.ID} className="ListElement" >
                <a href={project.link} target="_blank" rel="noopener noreferrer"><b>{project.Title}:</b></a> {project.Description}
              </li>
            ))}
          </ul>
        </section>
        <section className="list-box achievements">
          <h2>Achievements</h2>
          <ol>
            {achievements.map(achievement => (
              <li key={achievement.ID} className="ListElement" ><b>{achievement.Title}:</b> {achievement.Description}</li>
            ))}
          </ol>
        </section>
      </div>
      <section className="Contacts">
        <h2>Contacts</h2>
        <ul>
          <li>PHONE:8393012004</li>
          <li><a href='mailto:vaishnavi.diya15@gmail.com' target='blank'>Email</a></li>
          <li><a href='https://github.com/vaishnavi-diya15' target='blank'>Github</a></li>
          <li><a href='https://www.linkedin.com/in/vaishnavi-diya-958b562b3?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' target='blank'>LinkedIn</a></li>
        </ul>
      </section>
    </div>
  );
}

export default App;
