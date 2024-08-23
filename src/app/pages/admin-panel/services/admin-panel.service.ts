import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.development";
import { User } from "../utilities/userVm";
import { Audit } from "../utilities/audit";

@Injectable({
    providedIn: 'root'
})

export class AdminService {
    /**
     *
     */
    constructor(private http: HttpClient) {
    }

    users$ = this.http.get<User[]>(`${environment.apiUrl}users`);
    audits$ = this.http.get<Audit[]>(`${environment.apiUrl}auditing`);

    auditing(error:HttpErrorResponse) {
        const auditObject = {
            id: "0",
            userId: `${localStorage.getItem('userId')}`,
            status: `${error.status}`,
            message: `${error.message}`,
            url: `${error.url}`,
            createdDate: `${new Date()}`
        };
        var auditWithoutId = new Audit(auditObject);
        //const { id, ...auditWithoutId } = audit;

        // auditWithoutId.userId = `${localStorage.getItem('userId')}`;
        // auditWithoutId.CreatedDate = `${new Date()}`;
        // auditWithoutId.Status = `${error.status}`;
        // auditWithoutId.Message = `${error.message}`;
        // auditWithoutId.Url = `${error.url}`;

        return this.http.post(`${environment.apiUrl}auditing`,auditWithoutId)
    }

    
}
