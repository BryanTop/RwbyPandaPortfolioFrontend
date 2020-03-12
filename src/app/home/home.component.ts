import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('anim', {static: false}) anim;
  currentWord = 0;
  TimeToWait = 500;
  timeToWaitInput = this.TimeToWait / 1000;
  currentLetter = 0;
  htmlContent = "";
  adding = true;
  subtracting = false;
  title = 'Home: Rwbys Portfolio';

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle(this.title);
  }

  ngAfterViewInit() {
    let words = this.anim.nativeElement.dataset.words.split(" ");
    this.type(words[this.currentWord], words);
  }

  SetTimeToWait(time) {
    this.TimeToWait = time.value * 1000;
    this.timeToWaitInput = 0;
  }

  type(word: string, words) {
    var wordArr = word.split("");
    const maxWords = words.length;

    setTimeout(() => {
      if (this.currentLetter < wordArr.length && this.adding) {
        this.htmlContent += wordArr[this.currentLetter];
        this.currentLetter++;
        this.type(word, words);
      } else if (this.currentLetter === wordArr.length) {
        this.typeingOrder('subtract', words);
      } else if (this.currentLetter < wordArr.length && this.subtracting && this.currentLetter > -1) {
        let currentWord = this.htmlContent.split("");
        let newWord = currentWord.slice(0, this.currentLetter).join('');
        this.htmlContent = newWord;
        this.currentLetter--;
        this.type(word, words);
      } else if (this.currentLetter === -1 && this.subtracting) {
        this.currentWord++;
        if (this.currentWord === maxWords) {
          this.currentWord = 0;
        }
        this.typeingOrder('add', words);
      }
    }, this.TimeToWait);
  }

  typeingOrder(operation, words) {
    if (operation === 'add') {
      this.adding = true;
      this.subtracting = false;
      this.currentLetter++;
    } else {
      this.adding = false;
      this.subtracting = true;
      this.currentLetter--;
    }

    this.type(words[this.currentWord], words);
  }

}
