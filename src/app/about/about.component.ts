import { Component, OnInit, DoCheck, ViewChild, Renderer2, AfterViewInit } from '@angular/core';
import { NavMenuService } from '../services/nav-menu.service';
import { NgControlStatus } from '@angular/forms';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, DoCheck {
 
  isExpanded = false;

  constructor(private NavMenuService: NavMenuService, private renderer: Renderer2) { }

  ngOnInit() {
    this.dropObject();
  }

  ngDoCheck(): void {
    this.isExpanded = this.NavMenuService.ReturnIsExpanded();
  }

  count = 1;
  instanstiate() {
    const div = this.renderer.createElement('div');

    this.renderer.addClass(div, 'block');
    this.renderer.addClass(div, 'physicsObject');
    this.renderer.addClass(div, 'obj' + this.count);
    this.count++;

    document.querySelector('.blockHolder').appendChild(div);
    this.dropObject();
  }

  

  dropObject() {
    const physicsObjs = Array.from(document.getElementsByClassName('physicsObject') as HTMLCollectionOf<HTMLElement>)

    let pixelsToAdd = 1;
    let pixelsLeft = 1;
    let pixelsRight = 1;

    var x = Math.floor((Math.random() * 2) + 1);
    physicsObjs.forEach(element => {
      function stopInterval() {
        clearInterval(interval);
        document.querySelector('.blockHolder').removeChild(element);
      }
     let interval = setInterval(drop, 150, element, stopInterval);
    });

    for (let i = 0; i < physicsObjs.length; i++) {
      const element = physicsObjs[i];
      
    }

    function drop( element, stopInterval) {
      let startingPoint = window.innerHeight - element.offsetTop;

        if(x === 2) {
          let pixels = pixelsLeft + 'px';
          element.style.left = pixels;
          pixelsLeft += 4;
        } else {
          let pixels = pixelsRight + 'px';
          element.style.right = pixels;
          pixelsRight += 4;
        }

        if(startingPoint >= 0) {
          let pixels = pixelsToAdd + 'px';
          element.style.top = pixels;
          pixelsToAdd += 10;
          console.log(startingPoint);
          startingPoint--;
        } else {
          stopInterval();
          console.log("stop");
        }
    }
  }

}
