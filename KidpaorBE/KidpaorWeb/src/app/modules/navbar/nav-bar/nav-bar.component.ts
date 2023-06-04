import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuModel } from '../models';
import { TuiHostedDropdownComponent } from '@taiga-ui/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { ScreenSizeService } from '../../../shared/utils/services/screen-size.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('800ms ease-in-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0)', opacity: 1 }),
        animate('500ms ease-in-out', style({ transform: 'translateX(-100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class NavBarComponent implements OnInit {
  @ViewChild(TuiHostedDropdownComponent)
  component?: TuiHostedDropdownComponent;
  open = false;
  isMenuOpen = false;
  screenWidth: number = 0;
  menu: MenuModel[] = [
    {
      name: 'Home',
      url: '/home',
    },
    {
      name: 'Activities',
      url: '/activities',
    },
    {
      name: 'Kids',
      url: '/kids',
    },
    {
      name: 'Support',
      url: '/support',
    },
    {
      name: 'AboutUs',
      url: '/about',
    }
  ];

  constructor(
    private screenSizeService: ScreenSizeService
  ) {
  }

  ngOnInit(): void {
    this.open = false;
    this.component?.nativeFocusableElement?.focus();
    this.screenSizeService.screenSize$.subscribe(screenWidth => {
      this.screenWidth = screenWidth;
      if (screenWidth >= 1200) {
        this.isMenuOpen = false;
      }
    });
  }

  toggleNavBar() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
