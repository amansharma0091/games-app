import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { GameService } from './game.service';
import { Game } from './game';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./app.component.css', '../../node_modules/bulma/css/bulma.css']
})
export class AppComponent implements OnInit {
    games : Game[];
    currPageGames : Game[];

    public itemsPerPage : number =  12;
     public currentPage: number = 0;
    public smallnumPages: number = 0;
		public totalItems : number = 0;

    public constructor(private gameService: GameService) {

    }
    public ngOnInit(): void {
        this.gameService.getAllGames().subscribe(garr => {
            this.games= garr;
            this.totalItems = this.games.length;
            this.setCurrentPage();
        });

    }


  public pageChanged(event:any):void {
    console.log('Page changed to: ' + event.page);
      console.log('Number items per page: ' + event.itemsPerPage);
      this.currentPage = event.page-1;
      this.setCurrentPage();
  }

    public setCurrentPage():void{
        this.currPageGames = this.games.slice(this.currentPage, this.currentPage+this.itemsPerPage);
    }
}
