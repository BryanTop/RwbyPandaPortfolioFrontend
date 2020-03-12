import { Component, DoCheck, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { animation } from '@angular/animations';
import { NavMenuService } from '../services/nav-menu.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit, DoCheck, OnInit{
  
  isExpanded = false;
  title = 'Home: Rwbys Portfolio';

  constructor(private NavMenuService: NavMenuService, private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
  }

  ngDoCheck(): void {
    this.isExpanded = this.NavMenuService.ReturnIsExpanded();
  }


  @ViewChild('anim', {static: false}) anim;
  currentWord = 0;
  TimeToWait = 500;
  timeToWaitInput = this.TimeToWait / 1000;
  
  ngAfterViewInit() {
    let words = this.anim.nativeElement.dataset.words.split(" ");
    this.type(words[this.currentWord], words);
  }

  SetTimeToWait(time) {
    this.TimeToWait = time.value * 1000;
    this.timeToWaitInput = 0;
  }
  
  currentLetter = 0;
  htmlContent = "";
  adding = true;
  subtracting = false;
  
  type(word: string, words) {
    var wordArr = word.split("");
    
    setTimeout(() => {
      if(this.currentLetter < wordArr.length && this.adding) {
        this.htmlContent += wordArr[this.currentLetter];
        this.currentLetter++;
        this.type(word, words);
      } else if(this.currentLetter === wordArr.length) {
        this.adding = false;
        this.subtracting = true;
        this.currentLetter--;
        this.type(word, words);
      } else if(this.currentLetter < wordArr.length && this.subtracting && this.currentLetter > -1) {
        let currentWord = this.htmlContent.split("");
        let newWord = currentWord.slice(0, this.currentLetter).join('');
        this.htmlContent = newWord;
        this.currentLetter--;
        this.type(word, words);
      } else if (this.currentLetter === -1 && this.subtracting) {
        this.currentWord++;
        let maxWords = words.length;
        if(this.currentWord === maxWords) {
          this.currentWord = 0;
        }
        this.adding = true;
        this.subtracting = false;
        this.currentLetter++
        this.type(words[this.currentWord], words);
      }
    }, this.TimeToWait);
  }


}
