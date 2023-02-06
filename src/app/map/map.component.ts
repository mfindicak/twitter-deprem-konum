import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit, OnInit {
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

  getGeo = async (address: string): Promise<number[]> => {
    return fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${environment.apiKey}`
    )
      .then((response) => {
        return response.json();
      })
      .then((jsonData) => {
        return jsonData.results[0].geometry.location;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //İçerisinde deprem kelimesi olan tweetleri çekiyoruz
  getTweets = async () => {
    fetch(
      'https://cors-anywhere.herokuapp.com/https://api.twitter.com/2/tweets/search/recent?query=%23deprem&max_results=100',
      {
        method: 'GET',
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${environment.twitterApiKey}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        const result: string[] = data.data.filter(
          (e: any) => e.text.includes('mah') //mahalle içeriyorsa
        );
        console.log('result', result);
        result.forEach(async (e: any, index) => {
          const result2 = await this.getGeo(e.text);
          if (result2) {
            console.log(result2);
            L.marker([Object.values(result2)[0], Object.values(result2)[1]])
              .addTo(this.map)
              .bindPopup(e.text)
              .openPopup();
          }
        });
      });
  };

  constructor() {}
  ngOnInit(): void {
    L.Icon.Default.imagePath = 'assets/';
  }
  ngAfterViewInit(): void {
    this.getTweets();
    this.initMap();
  }
}
