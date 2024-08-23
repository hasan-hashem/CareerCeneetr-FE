import { Component, OnInit } from "@angular/core";
import { AdminService } from "../../services/admin-panel.service";
import { EMPTY, Observable, Subscription, catchError, mergeMap } from "rxjs";
import { environment } from "src/environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";
import { ToastrService } from "ngx-toastr";

@Component({
    selector: 'users',
    templateUrl:'./user.component.html',
    styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
    roles: { [key: string]: string } = {};
    /**
     *
     */
    constructor(private adminService: AdminService,
      private toastr: ToastrService,
       private http: HttpClient) {}
    r : any ;
    users$ = this.adminService.users$;
    // roles$ = this.http.get(`${environment.apiUrl}get/role`);
  
    ngOnInit(): void {

      this.users$.subscribe(users => {
        users.forEach(user => {
          this.getUserRole(user.id);
        });
      });
    }
  
    addRole(userId: any) {
      


      this.adminService.addRole(userId).subscribe(
        response => {
          this.toastr.success('The user is now Admin', 'Career Center'); // هنا سيكون response نصًا مثل "User deleted successfully"
        }
      );
    }
  
    deleteUser(userId: any) {
      this.adminService.deleteUser(userId).subscribe(
        response => {
          this.toastr.success(response, 'Career Center'); 
        },
        error => {
          this.toastr.error('Failed to delete user', 'Career Center');
        }
      );
    }
  
    deleteRole(userId: any) {
      this.adminService.deleteRole(userId).subscribe(
        response => {
          this.toastr.success('The Admin is now a User', 'Career Center'); 
        }
      );
    }
  
    getUserRole(userId: any) {
        this.adminService.getRole(userId).subscribe(
        response => {
          this.roles[userId] = response;
        },
        error => {
          this.toastr.error('The user role can not show', 'Career Center');
        }
      );
    }
  }