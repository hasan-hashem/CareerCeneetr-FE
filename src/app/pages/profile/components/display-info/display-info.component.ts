import { Component, OnDestroy, OnInit, TemplateRef } from "@angular/core";
import { Subscription } from "rxjs";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { Provider } from "src/app/core/models/provider";
import { ProfileService } from "../../services/profile.service";

@Component({
    selector: 'svs-portfolio',
    templateUrl: './display-info.component.html',
    styleUrls: ['./display-info.component.css']
})

export class ProfileComponent implements OnInit, OnDestroy {
    private subs = new Subscription();
    modalRef?: BsModalRef;
    myServices: Provider[] = [];
    idService!: string;
    actionType!: string;
    patchValue!: boolean;
    userName= localStorage.getItem('userName');
    Email= localStorage.getItem('userEmail');
    fullName= localStorage.getItem('fullName');


    /**
     *
     */
    constructor(private profileService: ProfileService,
                private modalService: BsModalService) {}

    ngOnInit(): void {
        this.getServices();
    }
    
    openModal(template: TemplateRef<void>,id: any,type:any,patchvalue: any) {
        this.patchValue = patchvalue;
        this.actionType = type;
        this.idService = id;
        this.modalRef = this.modalService.show(template);
    }

    getServices() {
        if('userId' in localStorage) {
            var id = `${localStorage.getItem('userId')}`;
        this.subs.add(this.profileService.getMyServices(id).subscribe(res => {
             this.myServices = res;
         }));
        }
    }

    closeModal() {
        this.getServices();
        this.modalService.hide(this.modalRef?.id);
    }

    ngOnDestroy(): void {
        this.subs.unsubscribe();
    }
}