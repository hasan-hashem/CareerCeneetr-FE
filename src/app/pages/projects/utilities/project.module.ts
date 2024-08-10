import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProjectComponent } from '../components/project.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    ProjectComponent,
    
  ],
  imports: [
    TranslateModule,
    CommonModule,
    NgxPaginationModule,
    RouterModule.forChild([
        {path: "all", component:ProjectComponent},
        {path: "this/Offers", component:ProjectComponent},
    ]),
    SharedModule
  ],

})
export class ProjectModule { }
