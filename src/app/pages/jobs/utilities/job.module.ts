import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { JobComponent } from '../components/job.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    JobComponent
  ],
  imports: [
    TranslateModule,
    CommonModule,
    RouterModule.forChild([
      {path: "find-job", component:JobComponent}
    ]),
    SharedModule
  ]
})
export class JobModule { }
