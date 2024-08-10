import { Component, OnInit } from '@angular/core';
import { Job } from '../utilities/job-vm';
import { JobService } from '../utilities/job.service';


@Component({
  selector: 'svs-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {

  jobList: Job[] = []
  /**
   *
   */
  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.getJobs();
  }


  getJobs() {
    this.jobService.getJobs().subscribe(res => {
      this.jobList = res;
    })
  }

}
