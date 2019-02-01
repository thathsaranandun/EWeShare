import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage } from 'ionic-angular';




@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  

  constructor() {

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
      content:'<h4>Charging Station 1</h4><br><p>Port Type:J1770<br>Availability: Available<br>Open Time:24/7</p>'
    })

    marker.addListener('click',function(){
      markerWindow.open(this.map,marker)

    })

    let marker2 : google.maps.Marker = new google.maps.Marker({
      map:this.map,
      position:{lat:6.9432,lng:79.8786},
      icon:'../assets/img/map_marker_icon_1 - Copy.png'

    })

    var markerWindow2 = new google.maps.InfoWindow({
      content:'<h4>Charging station 2</h4><br><p>Port Type:J1770<br>Availability: Occupied<br>Open Time:24/7</p>'
    })

    marker2.addListener('click',function(){
      markerWindow2.open(this.map,marker2)

    })

    let marker3 : google.maps.Marker = new google.maps.Marker({
      map:this.map,
      position:{lat:6.9395,lng:79.8781},
      icon:'../assets/img/map_marker_icon_2 - Copy.png'

    })

    var markerWindow3 = new google.maps.InfoWindow({
      content:'<h4>Charging station 3</h4><br><p>Port Type:J1770<br>Availability: Closed<br>Open Time:24/7</p>'
    })

    marker3.addListener('click',function(){
      markerWindow3.open(this.map,marker3)

    })

  }


}