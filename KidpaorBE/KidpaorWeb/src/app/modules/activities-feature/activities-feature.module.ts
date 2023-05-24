import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivitiesComponent } from './activities-list/activities.component';
import { LayoutModule } from '../../layout/layout.module';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TuiInputModule } from '@taiga-ui/kit';
import { TuiScrollbarModule, TuiSvgModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { ActivityItemComponent } from './activity-item/activity-item.component';
import { SharedModule } from '../../shared/shared.module';
import { ActivityComponent } from './activity-detail/activity.component';
import { TuiLetModule } from '@taiga-ui/cdk';

@NgModule({
  declarations: [
    ActivitiesComponent,
    ActivityItemComponent,
    ActivityComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    TranslateModule,
    RouterLink,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiSvgModule,
    SharedModule,
    TuiScrollbarModule,
    RouterOutlet,
    TuiLetModule
  ]
})
export class ActivitiesFeatureModule {
}
