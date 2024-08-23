import { Component, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Job } from 'src/app/pages/jobs/utilities/job-vm';
import { ProviderService } from 'src/app/pages/providers/services/provider.service';
import { DialogData, ProfileComponent } from '../display-info/display-info.component';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'svs-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.css']
})
export class EditJobComponent {
  constructor(
    private providerService: ProviderService,
    private profileService : ProfileService,
    private toastr: ToastrService
  ){

  }
  
  
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<ProfileComponent>);
  type: any;
  patchValue: any;
  job ! : Job;
  editJobForm! : FormGroup;
  id: any;

  editJob(){
    this.profileService.updateJob(this.data.id, this.editJobForm).subscribe(res => {
            
      this.toastr.success('The job has been updated successfully', 'Career Center');
    });

  }


  categoriesList$ = this.providerService.categories$;
  onClickCategory(event: any) {
   
        this.id = event.target.value;
  
        
  }
  deleteJob() {
    this.profileService.deleteJob(this.data.id).subscribe(res => {
            
      this.toastr.success('The job has been deleted successfully', 'Career Center');
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
