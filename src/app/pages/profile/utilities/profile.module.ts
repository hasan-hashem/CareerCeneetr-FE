import { NgModule } from '@angular/core';
import {  ProfileComponent } from '../components/display-info/display-info.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditProviderComponent } from '../components/edit-provider/edit.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        ProfileComponent,
        EditProviderComponent
    ],
    imports: [
        TranslateModule,
        SharedModule,
        RouterModule.forChild([
            {path: 'profile', component:ProfileComponent}
        ])
    ]
})

export class ProfileModule {}