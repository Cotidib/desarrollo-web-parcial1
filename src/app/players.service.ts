import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Player } from './player';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  count: number = 0;

  constructor(private http: HttpClient) { }

  url = 'http://localhost:3000/jugadores';
  size_url = 'http://localhost:3000/size';

  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(this.url)
  };

  getPlayer(id: number): Observable<Player> {
    const player_url = `${this.url}/${id}`
    return this.http.get<Player>(player_url)
  };

  // newPlayer(nombre: string, posicion: string, foto: string): Observable<Player[]>{
  //   let body = JSON.stringify({nombre: nombre, posicion: posicion, foto: foto});
  //   this.http.post<Player>(this.url, body)
  //   return this.http.get<Player[]>(this.url)
  // }

  async getSize(){
    let response = await fetch(this.size_url);
    const size = await response.json();
    return size.count;
  }

  async updateSize(new_count: number){
    fetch(this.size_url, {
    method: "PUT",
    body: JSON.stringify({
      count: new_count
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })};

  async postPlayer(nombre: string, posicion: string, foto: string){
    let current_size = await this.getSize();
    await fetch(this.url, {
      method: "POST",
      body: JSON.stringify({nombre: nombre, posicion: posicion, foto: foto}),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then((response) => 
      {
        if(response.status == 201){
          this.updateSize(current_size + 1);
        }
      }
    );
  }

}
