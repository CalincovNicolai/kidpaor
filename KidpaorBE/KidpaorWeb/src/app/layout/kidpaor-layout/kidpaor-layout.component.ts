import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-kidpaor-layout',
  templateUrl: './kidpaor-layout.component.html',
  styleUrls: ['./kidpaor-layout.component.scss']
})
export class KidpaorLayoutComponent implements OnInit {
  @Input() image: string = '';
  showComponent: boolean = false;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.url.subscribe(url => {
      const currentRoute = url[0].path;
      this.showComponent = (currentRoute !== 'support') && (currentRoute !== 'about');
    });
  }
}
