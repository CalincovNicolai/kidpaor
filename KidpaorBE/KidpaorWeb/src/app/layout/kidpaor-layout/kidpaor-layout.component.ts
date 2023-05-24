import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-kidpaor-layout',
  templateUrl: './kidpaor-layout.component.html',
  styleUrls: ['./kidpaor-layout.component.scss']
})
export class KidpaorLayoutComponent {
  @Input() image: string = '';
}
