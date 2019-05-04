import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { DataService } from '../../app/services/data.service';
import { EditPage } from '../edit/edit';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class Profile{
  users:{};
  userFname:string='';
  userLname:string='';
  userEmail:string='';
  userName:string='';
  userAddress:string='';
  userPassword:string='';

  nextPage=EditPage;

  constructor(public navCtrl: NavController, public navParams: NavParams,public dataService:DataService) {
        
  }




  ngOnInit() 
  {
    //retireve data from the local storage
    var test = localStorage.getItem('data');
    let arr = JSON.parse(test);
    console.log(arr);

    this.dataService.getItems(arr[0]).subscribe(users=> {
      console.log(users);
      console.log(users[0]);
      
              this.users=users;
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
     
  }




   


    // onGetItems(id){
    //   this.dataService.getItems(id).subscribe(users=> {
    //    console.log(users);
    //    console.log(users[0]);
       
    //            this.users=users;
    //   });


}



