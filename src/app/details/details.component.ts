import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PlayersService } from '../players.service';
import { Player } from '../player';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})

export class DetailsComponent {
  constructor(
    private route: ActivatedRoute,
    private playersService: PlayersService,
    private location: Location
  ) {}

  player!: Player;

  ngOnInit(): void {
    this.getDetail();
  }
  
  getDetail(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.playersService.getPlayer(id)
      .subscribe(player => this.player = player);
  }

  goBack(): void {
    this.location.back();
  }

}
