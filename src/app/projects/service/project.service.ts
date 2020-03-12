import { Injectable } from '@angular/core';
import { Project } from '../models/project';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  url = 'https://rwbys-portfolio-backend.herokuapp.com';

  constructor(private http: HttpClient) { }

  GetProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.url + '/projects');
  }
}
