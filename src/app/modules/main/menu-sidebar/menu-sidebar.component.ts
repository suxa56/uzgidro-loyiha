import {AppState} from '@/store/state';
import {UiState} from '@/store/ui/state';
import {Component, HostBinding, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppService} from '@services/app.service';
import {Observable} from 'rxjs';

const BASE_CLASSES = 'main-sidebar elevation-4';

@Component({
  selector: 'app-menu-sidebar',
  templateUrl: './menu-sidebar.component.html',
  styleUrls: ['./menu-sidebar.component.scss']
})
export class MenuSidebarComponent implements OnInit {
  @HostBinding('class') classes: string = BASE_CLASSES;
  public ui: Observable<UiState>;
  public user;
  public menu = MENU;

  constructor(
    public appService: AppService,
    private store: Store<AppState>
  ) {
  }

  ngOnInit() {
    this.ui = this.store.select('ui');
    this.ui.subscribe((state: UiState) => {
      this.classes = `${BASE_CLASSES} ${state.sidebarSkin}`;
    });
    this.user = this.appService.user;
  }
}

export const MENU = [
  {
    name: 'Создать проект',
    iconClasses: 'fa-solid fa-file-circle-plus',
    path: ['/']
  },
  {
    name: 'Проекты',
    iconClasses: 'fa-solid fa-files',
    children: [
      {
        name: 'Все проекты',
        iconClasses: 'fa-solid fa-files',
        path: ['/sub-menu-1']
      },
      {
        name: 'Одобренные проекты',
        iconClasses: 'fa-solid fa-file-circle-check',
        path: ['/sub-menu-2']
      },
      {
        name: 'Отклоненные проекты',
        iconClasses: 'fa-solid fa-file-circle-xmark',
        path: ['/sub-menu-3']
      }
    ]
  },
  {
    name: 'Blank',
    iconClasses: 'fas fa-file',
    path: ['/blank']
  },
];
