import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';
import { SpotifyService } from '../spotify.service';
import { Location } from '@angular/common'
@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {

  routeObs: Observable<ParamMap>; 
  artist : any; //Viene inserita la traccia selezionata
  spotifyServiceObs : Observable<Object>;
  //Viene usata la dependency injection per recuperare i moduli del routing e dello    
  //SpotifyService
  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private service: SpotifyService,
    public location : Location ) { }


  ngOnInit(): void {
    //Viene salvato l'observable che notifica le informazioni sulla route attiva
    this.routeObs = this.route.paramMap;
    this.routeObs.subscribe(this.getRouterParam);
  }

  //Ogni volta che viene invocata la route tracks/:id, l'observable richiama questo metodo
  getRouterParam = (params: ParamMap) =>
  {
    let artistId = params.get('id'); //Viene richiamato l'id dai parametri
    this.spotifyServiceObs = this.service.getArtist(artistId) ;
    this.spotifyServiceObs.subscribe( (data) => {this.artist = data; console.log(this.artist)})
  }

  back() : void
  {
      this.location.back();
  }
}
