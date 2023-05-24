import { Component } from '@angular/core';
import { MenuModel } from '../models';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  menu: MenuModel[] = [
    {
      name: 'HOME',
      url: '/home',
    },
    {
      name: 'ACTIVITIES',
      url: '/activities',
    },
    {
      name: 'KIDS',
      url: '/kids',
    },
    {
      name: 'SUPPORT',
      url: '/support',
    },
    {
      name: 'ABOUT US',
      url: '/about',
    }
  ];
}
