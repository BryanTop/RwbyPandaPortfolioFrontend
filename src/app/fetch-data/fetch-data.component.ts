import { Component, Inject, DoCheck } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavMenuService } from '../services/nav-menu.service';
import { Project } from '../models/project.model';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html',
  styleUrls: ['./fetch-data.component.css']
})
export class FetchDataComponent implements DoCheck {
  public projects: Project[];
  isExpanded = false;
  url = 'http://localhost:3000';

  ngDoCheck(): void {
    this.isExpanded = this.navMenuService.ReturnIsExpanded();
  }

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private navMenuService: NavMenuService) {
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
