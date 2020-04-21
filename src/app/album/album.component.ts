import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';
import { SpotifyService } from '../spotify.service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {


  //Osserva gli eventi sulla route tracks, restituisce la ParamMap che contiene tutti i   
  //parametri passati all’url
  routeObs: Observable<ParamMap>; 

  album : any; //Qui viene salvata la traccia scelta
  spotifyServiceObs : Observable<Object>;
  //Viene usata la dependency injection per farci mandare i moduli del routing e dello    
  //SpotifyService
  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private service: SpotifyService,
    public location : Location ) { }


  ngOnInit(): void {
    //Viene caricato l'observable che notifica le informazioni sulla route attiva
    this.routeObs = this.route.paramMap;
    this.routeObs.subscribe(this.getRouterParam);
  }

  //Ogni volta che viene invocata la route tracks/:id, l'observable richiama questo metodo
  getRouterParam = (params: ParamMap) =>
  {
    let albumId = params.get('id'); //Viene caricato l'id dai parametri
    this.spotifyServiceObs = this.service.getAlbum(albumId) ;
    this.spotifyServiceObs.subscribe( (data) => this.album = data)
  }

  back() : void
  {
      this.location.back();
  }
  fromMStoM(ms : number) : String
  {
    let minuti = String(ms / 60000).split(".")[0];
    let secondi = (String(Number("0." + String(ms / 60000).split(".")[1]) * 0.6).split('.')[1]).substring(0,2);
    //Viene calcolata la durata in minuti e secondi in base ai millisecondi
    return minuti + ":" + secondi;
  }
}
