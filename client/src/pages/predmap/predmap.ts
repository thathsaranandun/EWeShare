import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PredmapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-predmap',
  templateUrl: 'predmap.html',
})
export class PredmapPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  private longitude: number;
  private latitute: number;
  private locdetails:string;
  loaded: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.latitute=this.navParams.get('lat');
    this.longitude=this.navParams.get('lon');
    this.locdetails=this.navParams.get('locdetails');
  }

  ionViewDidLoad() {
    this.initMap();  
  }

  initMap() {
    
    let coord = new google.maps.LatLng(this.latitute,this.longitude);
    let mapopts : google.maps.MapOptions = {
      center: coord,
      zoom:18,
      mapTypeId:google.maps.MapTypeId.ROADMAP

    }

    this.map=new google.maps.Map(this.mapElement.nativeElement,mapopts);

    let marker : google.maps.Marker = new google.maps.Marker({
      map:this.map,
      position:coord,
      icon:'../assets/img/map_marker_icon_3 - Copy.png'

    });

    var markerWindow = new google.maps.InfoWindow({
      content:'<h4>'+this.locdetails+'</h4><br><input type=submit value="View location" id="clickIt">'
    
    });
    marker.addListener('click',function(){
      markerWindow.open(this.map,marker)
    });

    google.maps.event.addListener(markerWindow, 'domready', () => {
      if(this.loaded){
      //now my elements are ready for dom manipulation
      var clickableItem = document.getElementById('clickIt');
      clickableItem.addEventListener('click', () => {
        console.log("User Clicked on Marker Window");
      });
      this.loaded=true;
    }
    });

 }

}
