import {Component, OnInit} from '@angular/core';
import {NavController} from "ionic-angular";
import {ContactInfoPage} from "../contact-info/contact-info";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage implements OnInit {

    contacts: any;
    favouriteContacts: any;

    constructor(public navCtrl: NavController) {

    }

    ngOnInit() {
        this.contacts = localStorage.getItem('contacts')? JSON.parse(localStorage.getItem('contacts')): [];
        this.contacts = this.contacts.sort(this.sortByName);
        this.favouriteContacts = localStorage.getItem('favouriteContacts')? JSON.parse(localStorage.getItem('favouriteContacts')): [];
        this.favouriteContacts = this.favouriteContacts.sort(this.sortByName);
    }

    sortByName(a, b) {
        return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);
    }

    makeFavourite(contact, index) {
        contact.isFavourite = !contact.isFavourite;
        this.favouriteContacts.push(contact);
        this.contacts.splice(index, 1);
        this.favouriteContacts = this.favouriteContacts.sort(this.sortByName);
        localStorage.setItem('contacts', JSON.stringify(this.contacts));
        localStorage.setItem('favouriteContacts', JSON.stringify(this.favouriteContacts));
    }

    makeUnfavourite(contact, index) {
        contact.isFavourite = !contact.isFavourite;
        this.contacts.push(contact);
        this.favouriteContacts.splice(index, 1);
        this.contacts = this.contacts.sort(this.sortByName);
        localStorage.setItem('contacts', JSON.stringify(this.contacts));
        localStorage.setItem('favouriteContacts', JSON.stringify(this.favouriteContacts));
    }

    goToContactInfo(contact) {
        this.navCtrl.push(ContactInfoPage, {
            contact: contact
        });
    }

}
