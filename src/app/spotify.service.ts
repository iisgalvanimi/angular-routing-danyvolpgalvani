import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

//Dichiaro che il servizio è iniettabile agli altri componenti a partire dal componente root
@Injectable({
  providedIn: 'root'  
})
export class SpotifyService {
  //url per oauth: https://developer.spotify.com/console/get-search-item/
  //Ottengo il modulo HttpClient
  constructor(private http: HttpClient) { }

  searchTrack(query: string) {
    //const url = `https://api.spotify.com/v1/${query}`;
    const url = `https://api.spotify.com/v1/search?q=${query}&type=track`;
    const headers = new HttpHeaders({
      Authorization:
        'Bearer BQCU8GoPCJnhPhosvPlreb6GE2W3H81xIZlD8vFJo4asQCUY7JFTgbl7ZMFBg_oWML8XTk0HjN4oAlGCVWE4xbRWgxxA0UFJnKglgqcZkwAqh1PAWL7KS-GWVfhK7d58htLYfDvv'
    });
    
    let obsTracks = this.http.get(url, { headers });
    return obsTracks;
  }
}
