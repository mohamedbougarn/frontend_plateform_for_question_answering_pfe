import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class DataService {
  constructor(private readonly http: HttpClient) {}

//   getData() {
//     return this.http.get("https://api.covid19api.com/summary").pipe(
//       map(response => {
//         const { Global, Countries } = response;
//         const {
//           NewConfirmed,
//           TotalConfirmed,
//           NewDeaths,
//           TotalDeaths,
//           NewRecovered,
//           TotalRecovered
//         } = Global;
//         const keys = Object.keys(Global);
//         const majorStats = [
//           {
//             title: "Total Confirmed",
//             stat: TotalConfirmed,
//             percentage: ((NewConfirmed / TotalConfirmed) * 100).toFixed(2),
//             color: "#F9345E"
//           },
//           {
//             title: "Active Confirmed",
//             stat: NewConfirmed,
//             percentage: ((NewConfirmed / TotalConfirmed) * 100).toFixed(2),
//             color: "#FA6400"
//           },
//           {
//             title: "Total Recovered",
//             stat: TotalRecovered,
//             percentage: ((NewRecovered / TotalRecovered) * 100).toFixed(2),
//             color: "#1CB142"
//           },
//           {
//             title: "Total Deaths",
//             stat: TotalDeaths,
//             percentage: ((NewDeaths / TotalDeaths) * 100).toFixed(2),
//             color: "#6236FF"
//           }
//         ];
//         return {
//           majorStats,
//           countries: Countries.sort(
//             (countryA, countryB) =>
//               countryB.NewConfirmed - countryA.NewConfirmed
//           )
//         };
//       }),
//       tap(console.log)
//     );
//   }

  getDataForACountry(countryCode: string) {
    return this.http.get(
      `https://api.covid19api.com/total/dayone/country/${countryCode}`
    );
  }
}
