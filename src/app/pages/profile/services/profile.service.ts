import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.development";
import { Observable } from "rxjs";
import { Provider } from "src/app/core/models/provider";
import { EditProvider } from "../components/edit-provider/edit-model";

@Injectable({
    providedIn: 'root'
})

export class ProfileService {
    /**
     *
     */
    constructor(private http:HttpClient) {}

    getMyServices(id: string): Observable<Provider[]> {
        return this.http.get<Provider[]>(`${environment.apiUrl}provider/user/${id}`);  
    }
    updateMyService(id: string, model:EditProvider) {
        return this.http.put(`${environment.apiUrl}provider/${id}`,model)
    }
    patchMyService(id: string, value: boolean) {
       
        return this.http.patch(`${environment.apiUrl}provider/${id}`, [
            {
              "path": "IsDeleted",
              "op": "replace",
              "value": value
            }
        ]);
    }
    deleteMyService(id: string) {
        return this.http.delete(`${environment.apiUrl}provider/${id}`);
    }
}