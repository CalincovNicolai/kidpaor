import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivitiesComponent } from './activities/activities.component';
import { LayoutModule } from '../../layout/layout.module';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { TuiInputModule } from '@taiga-ui/kit';
import { TuiSvgModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { ActivityItemComponent } from './activity-item/activity-item.component';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
    ActivitiesComponent,
    ActivityItemComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    TranslateModule,
    RouterLink,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiSvgModule,
    SharedModule
  ]
})
export class ActivitiesModule { }
