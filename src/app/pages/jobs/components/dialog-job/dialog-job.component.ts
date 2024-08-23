// import { Component, Inject, inject } from '@angular/core';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { JobComponent } from '../display-jobs/job.component';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Title } from '@angular/platform-browser';
// import { Job } from '../../utilities/job-vm';
// import { Observable, Subscribable } from 'rxjs';

// @Component({
//   selector: 'svs-dialog-job',
//   templateUrl: './dialog-job.component.html',
//   styleUrls: ['./dialog-job.component.css']
// })
// export class DialogJobComponent {
//   jobForm: any;
//   job!: Job;
//   form: FormGroup;
//   filteredServices: any;
//   servicesList: any;
//   serviceId: any;
//   categoriesList$: Observable<undefined> | Subscribable<undefined> | Promise<undefined> | undefined;






//   constructor(
//     private fb: FormBuilder,
//     public dialogRef: MatDialogRef<JobComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: any
//   ) {
//     this.form = this.fb.group({
//       title: ['', Validators.required],
//       description: ['', Validators.required],
//       number: [null, [Validators.required, Validators.min(0)]],
//       url: ['', [Validators.required, Validators.pattern('https?://.+')]]
//     });
//   }

//   onSubmit(): void {
//     if (this.form.valid) {
//       this.dialogRef.close(this.form.value);
//     }
//   }
//   onClickCategory(event: any) {
//     var id = event.target.value;
//     this.filteredServices = this.servicesList.filter((x: { categoryId: any; }) => x.categoryId == id)
//     console.log();
//     this.serviceId = this.filteredServices[0].id;
//   }

// }




import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Job } from '../../utilities/job-vm';
import { ProviderService } from 'src/app/pages/providers/services/provider.service';
import { JobService } from '../../utilities/job.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'svs-dialog-job',
    templateUrl: './dialog-job.component.html',
    styleUrls: ['./dialog-job.component.css']
})

export class DialogJobComponent implements OnInit {
  private subs = new Subscription();
  addJobForm!: FormGroup;
  job!: Job;
  serviceId: any;
  filteredServices: any;
  servicesList: any;
  id: any;
  



  constructor(private fb: FormBuilder,
    private providerService: ProviderService,
    private jobServiece: JobService,
    private toastr: ToastrService

  ) {}

  ngOnInit(): void {
    this.addJobForm = this.fb.group({
      
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      number: ['', [Validators.required, Validators.min(1)]],
      url: ['', [Validators.required, Validators.pattern('https?://.+')]]
    });
    
  }

  submitJob(): void {
    // this.job.isStoped=true;
    // this.jobServiece.postJob(this.id,this.job)
    // console.log(this.id,this.job)

    this.job = new Job(this.addJobForm.value);
    this.job.isStoped = true;
    console.log(this.job)
        this.subs.add(this.jobServiece.postJob(this.id,this.job).subscribe(res => 
            {
                this.toastr.success('Job has been added successfully', 'Career Center');
            }
        ));
  }

  categoriesList$ = this.providerService.categories$;
  onClickCategory(event: any) {
   
        this.id = event.target.value;
  
        
  }
  
}
