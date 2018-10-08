import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core';

@Injectable()
export class ApiService {

    contacts: any;

    constructor(public http: Http) {
    }

    getPhoneBookData() {
        return this.http.get('http://my-json-server.typicode.com/rgiurea/contacts/tree/master/all').map(res => res.json());
    }

}
