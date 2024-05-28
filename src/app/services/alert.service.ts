import { Injectable } from "@angular/core";
import Swal from "sweetalert2";

@Injectable({
    providedIn: 'root'
})

export class AlertService {

    constructor() { };

    success(message: string) {
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: message
        });
    }

    error(message: string) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: message
        });
    }

    warning(message: string) {
        Swal.fire({
            icon: 'warning',
            title: 'Warning',
            text: message
        });
    }

}