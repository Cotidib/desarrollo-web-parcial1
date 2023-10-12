import { Component, OnInit } from '@angular/core';
import { PlayersService } from '../players.service';
import { Player } from '../player';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  title = 'Listado de Jugadores';
  players: Player[] = [];
  model: Player = {id: 0, nombre: '', posicion: '', foto: ''};
  nombre: string = "";
  currentCount: number = 0;
  error: string = "No se pueden agregar más jugadores, el equipo esta lleno";
  team_full: boolean = false;

  
  constructor(private playersService: PlayersService) { }
  
  ngOnInit(): void {
    this.getPlayers();
  }

  getPlayers(): void {
    this.playersService.getPlayers()
    .subscribe(players => this.players = players);
  }

  newPlayer(): void{
    this.currentCount = this.players.length;
    if (this.currentCount > 22){
      this.team_full = true;
    } else {
      this.team_full= false;
      this.playersService.postPlayer(this.model.nombre, this.model.posicion, this.model.foto);
      location.reload();
    }
  }
}
