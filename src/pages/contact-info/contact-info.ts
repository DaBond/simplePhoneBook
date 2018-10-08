import {Component, OnDestroy, OnInit} from '@angular/core';
import {NativeStorage} from "@ionic-native/native-storage";
import { NavParams} from "ionic-angular";
import { CallNumber } from '@ionic-native/call-number';

@Component({
    selector: 'page-contact-info',
    templateUrl: 'contact-info.html'
})
export class ContactInfoPage implements OnInit {

    contact: any;
    isEmailEditDisabled = true;
    isPhoneNumberEditDisabled = false;

    constructor(private navParams : NavParams, private nativeStorage: NativeStorage, private callNumber: CallNumber) {
    }

    ngOnInit() {
        this.contact = this.navParams.get('contact');
    }

    switchEmailEdit() {
     this.isEmailEditDisabled = !this.isEmailEditDisabled;
    }

    switchPhoneNumberEdit() {
        this.isPhoneNumberEditDisabled = !this.isPhoneNumberEditDisabled;
    }

    callContact() {
        this.callNumber.callNumber(this.contact.phone, true)
            .then(res => console.log('Launched dialer!', res))
            .catch(err => console.log('Error launching dialer', err));
    }

}
