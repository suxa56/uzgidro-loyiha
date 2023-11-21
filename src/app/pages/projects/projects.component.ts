import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit{
  projects = [
    {gruffNumber: 1,
    archiveNumber: 1,
    executor: 'Ma\'rufov Ma\'ruf',
    date: new Date(2023, 9, 11),
    status: 'Одобрено'},
    {gruffNumber: 2,
    archiveNumber: 2,
    executor: 'Azamatov Azamat',
    date: new Date(2023, 9, 12),
    status: 'Одобрено'},
    {gruffNumber: 3,
    archiveNumber: 3,
    executor: 'Nishonov Nishon',
    date: new Date(2023, 9, 13),
    status: 'Отклонено'},
    {gruffNumber: 4,
    archiveNumber: 4,
    executor: 'Temurov Temur',
    date: new Date(2023, 9, 15),
    status: 'Отклонено'},
    {gruffNumber: 5,
    archiveNumber: 5,
    executor: 'Umarov Umar',
    date: new Date(2023, 9, 20),
    status: 'Одобрено'}
  ]

  constructor(private router: Router) {
  }

  ngOnInit() {
    if (this.router.url === '/rejected') {
      for (let i = this.projects.length - 1; i >= 0; i--) {
        if (this.projects[i].status === 'Одобрено') {
          this.projects.splice(i, 1);
        }
      }
    }
    if (this.router.url === '/approved') {
      for (let i = this.projects.length - 1; i >= 0; i--) {
        if (this.projects[i].status === 'Отклонено') {
          this.projects.splice(i, 1);
        }
      }
    }
  }

}
