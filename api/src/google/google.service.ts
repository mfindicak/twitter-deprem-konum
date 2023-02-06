import { Injectable } from '@nestjs/common';
import { SearchAddressDto } from './dto/search-address';

@Injectable()
export class GoogleService {
  async getGeo(data: SearchAddressDto) {
    const result = await Promise.all(
      data.addresses.map((address) => {
        return fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLEAPIKEY}`,
        )
          .then((response) => {
            return response.json();
          })
          .then((jsonData) => {
            if (jsonData.results[0]?.geometry) {
              return {
                address: address,
                data: jsonData.results[0].geometry.location,
              };
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }),
    );
    return result.filter((result) => result);
  }
}
