import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.sass']
})
export class AboutComponent implements OnInit {
  title = 'About: Rwbys Portfolio';
  aboutData = `Growing up I always had a love for video games and computers. 
  I knew early on I wanted to create my own games someday and set my sights on becoming a game designer. 
  As time went on, I realized I also had a skill for Mathematics and decided to combine my passion for gaming with my knowledgeable skills and attend the software development program at Southern Careers Institute powered by Woz. 
  Now I am looking to dive headfirst into a career that can help me ultimately reach my dream. 
  If you would like to connect, you can email me at byrantop1326@gmail.com.`;

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.CreateParagraph(this.aboutData);
  }

  CreateParagraph(words) {
    const arr = words.split('');
    let newParagrph = document.createElement('p');
    const paragraphInput = document.querySelector('.paragraphInput');
    function unhighlight(x) {
      x.style.color = 'black';
    }
  
    function highlight(x) {
      x.style.color = 'red';
    }

    arr.forEach(element => {
      const span = document.createElement('span');
      span.innerHTML = element;
      span.style.cursor = 'default';
      span.style.fontSize = '24px';
      span.classList.add('highlight');
      span.addEventListener('mouseover', function() {
        highlight(this);
      });
      span.addEventListener('mouseleave', function() {
        unhighlight(this);
      });
      newParagrph.appendChild(span);
    });
    paragraphInput.appendChild(newParagrph);
  }

  

}
