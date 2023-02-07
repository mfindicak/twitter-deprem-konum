import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor() {}

  getGeo = async (
    address: string[]
  ): Promise<{ address: string; lat: number; lng: number }[]> => {
    return fetch(environment.apiUrl + '/google/find', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ address: address }),
    })
      .then((response) => {
        return response.json();
      })
      .then((jsonData) => {
        if (jsonData.data) return jsonData;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getTweets = async (query: string): Promise<string[]> => {
    return fetch(environment.apiUrl + '/twitter/search', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: query }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status == 200) {
          return data.data;
        }
        return [];
      });
  };

  getLocations = async (): Promise<
    {
      tweetId: string;
      tweet: string;
      lat: number;
      lng: number;
      tweetDate: Date;
    }[]
  > => {
    return fetch(environment.apiUrl + '/twitter/location', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  };
}
