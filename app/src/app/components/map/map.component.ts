import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { MapService } from 'src/app/services/map.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit, OnInit {
  constructor(private mapService: MapService) {}

  private map: any;
  private initMap = async () => {
    this.map = L.map('map', {
      center: [37.5778549, 36.9236182],
      zoom: 7,
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );

    tiles.addTo(this.map);
  };

  ngOnInit(): void {
    L.Icon.Default.imagePath = 'assets/';
  }

  start = async () => {
    this.mapService.getLocations('deprem').then((locations) => {
      locations.map((location) => {
        L.marker([location.data.lat, location.data.lng])
          .addTo(this.map)
          .bindPopup(location.address)
          .openPopup();
      });
    });
  };

  ngAfterViewInit(): void {
    this.initMap();
    this.start();
  }
}
