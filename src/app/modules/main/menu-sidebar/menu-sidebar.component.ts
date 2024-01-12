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
  public menu = null;
  role: string

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
    this.role = this.appService.role
    this.setupMenu()
  }

  private setupMenu() {
    this.menu = MENU.filter(item => item.role.includes(this.role))
  }
}

export const MENU = [
  {
    name: 'Birlamchi hujjatlarni kiritish',
    iconClasses: 'fa-solid fa-file-circle-plus',
    role: 'designer',
    path: ['/create-docs']
  },
  {
    name: 'Birlamchi hujjatlar',
    iconClasses: 'fa-solid fa-files',
    role: 'supervisor,director',
    path: ['/docs']
  },
  {
    name: 'Loyiha kiritish',
    iconClasses: 'fa-solid fa-file-circle-plus',
    role: 'designer',
    path: ['/create']
  },
  {
    name: 'Barcha loyihalar',
    iconClasses: 'fa-solid fa-files',
    role: 'designer,supervisor,director',
    path: ['/projects']
  },
  {
    name: 'Tekshirishda loyihalar',
    iconClasses: 'fa-solid fa-file-circle-info',
    role: 'designer,supervisor,director',
    path: ['/unchecked']
  },
  {
    name: 'Qabul qilingan loyihalar',
    iconClasses: 'fa-solid fa-file-check',
    role: 'designer,supervisor,director',
    path: ['/approved']
  },
  {
    name: 'Rad etilgan loyihalar',
    iconClasses: 'fa-solid fa-file-xmark',
    role: 'designer,supervisor,director',
    path: ['/rejected']
  },
  {
    name: 'Xulosalar',
    iconClasses: 'fa-solid fa-ballot-check',
    role: 'designer,supervisor',
    path: ['/conclusion']
  },
];
