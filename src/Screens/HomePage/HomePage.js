import React, { useState } from "react";
import {RangeSelector} from "../../Components/RangeSelector";
import photo from '../college.png'
import devansh from '../Devansh.jpg'
import jatin from '../Jatin.jpg'
import './HomePage.styles.scss'
import CreatorCardItem from '../../Components/Creator-card/Creator-card.component'



const HomePage = () => {
  const features=[
    'Significantly improves efficiency of class by reducing the attendance time',
    'Reduces the chances of proxy to 0%',
    'Make your organisation free from hactic attendance registers',
    'Allow Students to see their daily attendance and sends mail to every absentees',
    'Allow teachers to see various insights about the attendance of students',
    'Support multiple department,multiple branches and multiple sections'
  ];
  const colors = [
    '#2196f3',
    '#e91e63',
    '#ffeb3b',
    '#74ff1d'
  ];
  function createSquare(){
      const section=document.querySelector('section')
      const square1=document.createElement('span')
      const square2=document.createElement('span')
      const size=Math.random()*50;
      const color=Math.floor(Math.random()*colors.length);

      square1.style.background=colors[color];
      square1.style.width=20 + size + 'px'
      square1.style.height=20 + size + 'px'

      // setting the position....the posiiton of span is set to absolute in the css file
      square1.style.left = Math.random()*(window.innerWidth) + 'px';
      section.appendChild(square1);
      section.appendChild(square2)
      setTimeout(()=>{
          square1.remove();
      },3000)
    }

  const creater=[{name:'Devansh Goyal',image:devansh,phoneNo:'9416749221'},{name:'Jatin Kaushik',image:jatin,phoneNo:'8168791049'}];
  return(

    <div className='homepage-content'>


          <div className='college-info'>
            <img src={photo}  width='300px' alt='logo'/>
            <h1>DCRUST(Murthal)</h1>
          </div>
          

          <div className='features-block'>
                    <h1 className='features-heading'>Features we provide</h1>
                    <div className='feature-list'>
                    <ul>
                        {features.map((feat,idx)=>{
                            return <li className='feature'>{feat}</li>
                        })}
                    </ul>
                    </div>
          </div>
      

          <div className='Creators-info'>
              <h1>Creater of the app</h1>
              <div className='creator-personal-info'>
                  {creater.map((person,idx) =>(
                    <CreatorCardItem key={idx} name={person.name} imageUrl={person.image} PhoneNo={person.phoneNo}></CreatorCardItem>
                    )
                  )}
              </div>
          </div>
          <section className='animation_container'></section>
          {setInterval(createSquare,150)}
    </div>
  );
};

export default HomePage;
