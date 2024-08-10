import { Component, OnInit } from "@angular/core";
import { AdminService } from "../../services/admin-panel.service";
import { EMPTY, Observable, Subscription, catchError, mergeMap } from "rxjs";
import { environment } from "src/environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";

@Component({
    selector: 'users',
    templateUrl:'./user.component.html',
    styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
    /**
     *
     */
    constructor(private adminService: AdminService, private http: HttpClient) {}
  
    users$ = this.adminService.users$;
    roles$ = this.http.get(`${environment.apiUrl}get/role`);
  
    ngOnInit(): void {}
  
    addRole(userId: any) {
      try {
        this.http.post(`${environment.apiUrl}/add-role`, {
          userID: userId,
          role: 'Admin',
        });
      } catch (e) {
        console.error(e);
      }
    }
  
    deleteUser(userId: any) {
      try {
        this.http.delete(`${environment.apiUrl}/delete/${userId}`);
      } catch (e) {
        console.error(e);
      }
    }
  
    deleteRole(userId: any) {
      try {
        this.http.post(`${environment.apiUrl}/remove-role`, {
          userID: userId,
          role: 'Admin',
        });
      } catch (e) {
        console.error(e);
      }
    }
  
    getUserRole(userId: any) {
      try {
        this.http.get(`${environment.apiUrl}/get-role/${userId}`);
      } catch (e) {
        console.error(e);
      }
    }
  }