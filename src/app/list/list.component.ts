import { Component, Input } from '@angular/core';
import { Player } from '../player';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  @Input()
  players: Player[] = [];

}
