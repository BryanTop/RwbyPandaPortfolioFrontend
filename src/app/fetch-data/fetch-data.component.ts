import { Component, Inject, DoCheck, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavMenuService } from '../services/nav-menu.service';
import { Project } from '../models/project.model';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html',
  styleUrls: ['./fetch-data.component.css']
})
export class FetchDataComponent implements DoCheck, OnInit {
  public projects: Project[];
  isExpanded = false;
  url = 'https://rwbys-portfolio-backend.herokuapp.com';
  title = 'Projects: Rwbys Portfolio';

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
  }

  ngDoCheck(): void {
    this.isExpanded = this.navMenuService.ReturnIsExpanded();
  }

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private navMenuService: NavMenuService, private titleService: Title) {
    http.get<Project[]>(this.url + '/projects').subscribe(result => {
      this.projects = result;
    }, error => console.error(error));
  }
}


interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
