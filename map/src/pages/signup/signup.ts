import { Login } from './../login/login';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataService } from '../../app/services/data.service';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  login=Login;

  users:string [];

  user = {
      name : ""
  };


  constructor(public navCtrl: NavController, public navParams: NavParams,public dataService:DataService) {

    this.dataService.getUsers().subscribe(users => {
                //console.log(users);
                this.users = users;
            });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }


    onSubmit(){
        this.dataService.addUser(this.user).subscribe(user => {
            console.log(user);
            this.users.unshift(user);
        });
    }

}
