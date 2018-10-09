import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavController, NavParams} from "ionic-angular";
import {CallNumber} from '@ionic-native/call-number';
import {EmailComposer} from '@ionic-native/email-composer';
import {AlertController} from 'ionic-angular';
import {HomePage} from "../home/home";

@Component({
    selector: 'page-contact-info',
    templateUrl: 'contact-info.html'
})
export class ContactInfoPage implements OnInit, OnDestroy {

    contacts: any;
    favouriteContacts: any;
    contact: any;
    isEmailEditDisabled = false;
    isPhoneNumberEditDisabled = false;
    email: any;

    constructor(private navParams: NavParams, private callNumber: CallNumber, private alertCtrl: AlertController,
                public navCtrl: NavController, private emailComposer: EmailComposer) {
    }

    ngOnInit() {
        this.contact = this.navParams.get('contact');
        this.contacts = localStorage.getItem('contacts') ? JSON.parse(localStorage.getItem('contacts')) : [];
        this.favouriteContacts = localStorage.getItem('favouriteContacts') ? JSON.parse(localStorage.getItem('favouriteContacts')) : [];
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

    sendEmailToContact() {
        this.emailComposer.open({to: this.contact.email, isHtml: true});
    }

    deleteContactConfirm() {
        let alert = this.alertCtrl.create({
            title: 'Confirm contact deletion',
            message: 'This contact will be removed from your contacts list. Are you sure?',
            buttons: [
                {
                    text: 'Yes',
                    handler: () => {
                        this.deleteContact();
                        this.navCtrl.setRoot(HomePage);
                    }
                },
                {
                    text: 'No',
                    role: 'cancel',
                    handler: () => {
                    }
                }
            ]
        });
        alert.present();
    }

    deleteContact() {
        if (this.contact.isFavourite) {
            this.favouriteContacts = this.favouriteContacts.filter(favCont => {
                return favCont.id != this.contact.id;
            });
            localStorage.setItem('favouriteContacts', JSON.stringify(this.favouriteContacts));
        } else {
            this.contacts = this.contacts.filter(cont => {
                return cont.id != this.contact.id;
            });
            localStorage.setItem('contacts', JSON.stringify(this.contacts));
        }
    }

    ngOnDestroy() {
        if (this.contact.isFavourite) {
            this.favouriteContacts.map( fav => {
               if (fav.id === this.contact.id) {
                   fav.email = this.contact.email;
                   fav.phone = this.contact.phone;
               }
            });
            localStorage.setItem('favouriteContacts', JSON.stringify(this.favouriteContacts));
        } else {
            this.contacts.map( cont => {
                if (cont.id === this.contact.id) {
                    cont.email = this.contact.email;
                    cont.phone = this.contact.phone;
                }
            });
            localStorage.setItem('contacts', JSON.stringify(this.contacts));
        }
    }

}
