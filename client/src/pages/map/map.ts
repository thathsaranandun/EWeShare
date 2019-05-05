import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController,NavParams } from 'ionic-angular';
import {LocDetailsPage} from '../loc-details/loc-details';




@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  longitude: any;
  latitute: any;
  loaded: boolean = true;

  constructor(public nac:NavController, public navParams: NavParams) {
  }

  ionViewDidLoad(){
    this.initMap();
  }



  initMap() {
    
    let coord = new google.maps.LatLng(6.9407,79.8796);
    let mapopts : google.maps.MapOptions = {
      center: coord,
      zoom:18,
      mapTypeId:google.maps.MapTypeId.ROADMAP

    }

    this.map=new google.maps.Map(this.mapElement.nativeElement,mapopts)

    let marker : google.maps.Marker = new google.maps.Marker({
      map:this.map,
      position:coord,
      icon:'../assets/img/map_marker_icon_3 - Copy.png'

    })

    var markerWindow = new google.maps.InfoWindow({
      content:'<h4>Charging Station 1</h4><br><p>Port Type:J1770<br>Availability: Available<br>Open Time:24/7</p><input type=submit value="View location" id="clickIt">'

    })


    marker.addListener('click',function(){
      markerWindow.open(this.map,marker)
    })

    google.maps.event.addListener(markerWindow, 'domready', () => {
      if(this.loaded){
      //now my elements are ready for dom manipulation
      var clickableItem = document.getElementById('clickIt');
      clickableItem.addEventListener('click', () => {
        this.nac.push(LocDetailsPage);
      });
      this.loaded=true;
    }
    });

    let marker2 : google.maps.Marker = new google.maps.Marker({
      map:this.map,
      position:{lat:6.9432,lng:79.8786},
      icon:'../assets/img/map_marker_icon_1 - Copy.png'

    })

    var markerWindow2 = new google.maps.InfoWindow({
      content:'<h4>Charging station 2</h4><br><p>Port Type:J1770<br>Availability: Occupied<br>Open Time:24/7</p><input id="clickIt2" type=submit value="View location">'
    })

    marker2.addListener('click',function(){
      markerWindow2.open(this.map,marker2)

    })

    google.maps.event.addListener(markerWindow2, 'domready', () => {
      //now my elements are ready for dom manipulation
      var clickableItem = document.getElementById('clickIt2');
      clickableItem.addEventListener('click', () => {
       // this.nac.push(LocDetailsPage);
      });
    });

    let marker3 : google.maps.Marker = new google.maps.Marker({
      map:this.map,
      position:{lat:6.9395,lng:79.8781},
      icon:'../assets/img/map_marker_icon_2 - Copy.png'

    })

    var markerWindow3 = new google.maps.InfoWindow({
      content:'<h4>Charging station 3</h4><br><p>Port Type:J1770<br>Availability: Closed<br>Open Time:24/7</p><input id="clickIt3" type="submit" value="View Location"[navPush]="LocDetailsPage">'
    })

    marker3.addListener('click',function(){
      markerWindow3.open(this.map,marker3)

    })

    google.maps.event.addListener(markerWindow3, 'domready', () => {
      //now my elements are ready for dom manipulation
      var clickableItem = document.getElementById('clickIt3');
      clickableItem.addEventListener('click', () => {
        //this.nac.push(LocDetailsPage);
      });
    });

  }

  


}
