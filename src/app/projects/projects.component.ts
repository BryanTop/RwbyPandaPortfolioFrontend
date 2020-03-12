import { Component, OnInit } from '@angular/core';
import { Project } from './models/project';
import { Title } from '@angular/platform-browser';
import {faAtom} from '@fortawesome/free-solid-svg-icons';
import { ProjectService } from './service/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.sass']
})
export class ProjectsComponent implements OnInit {
  title = 'Projects: Rwbys Portfolio';
  public projects: Project[];
  faAtom = faAtom;

  constructor(private titleService: Title, private projectService: ProjectService) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.GetProjects();
  }

  GetProjects() {
    this.projectService.GetProjects().subscribe(data => this.projects = data);
  }

}
