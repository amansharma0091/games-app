


import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { GameService } from './game.service';
import { Game } from './game';
import { Observable } from 'rxjs/Observable';

enum SortType {
    score, name, platform
}
enum SortOrder {
    asc, desc
}
@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./app.component.css',
        '../../node_modules/bulma/css/bulma.css',
        '../../node_modules/font-awesome/css/font-awesome.css'
    ]
})
export class HomeComponent implements OnInit {


    discGame: Game;

    games: Game[];
    currPageGames: Game[];
    public sortBy: { sortType: SortType; order: SortOrder } =
    { sortType: SortType.score, order: SortOrder.desc };

    public itemsPerPage: number = 12;
    public currentPage: number = 0;
    public smallnumPages: number = 0;
    public totalItems: number = 0;

    public searchText: string; y
    public dataSource: Observable<any>;


    public constructor(private gameService: GameService) {
        this.setDataSource();
    }
    public ngOnInit(): void {

        this.gameService.getAllGames().subscribe(garr => {
            this.games = garr;
            this.totalItems = this.games.length;
            this.setCurrentPage();
        });

    }

    private setDataSource(): void {
        this.dataSource = Observable
            .create((observer: any) => {
                observer.next(this.discGame);
            })
            .mergeMap((token: string) =>
                this.gameService.find(token));
    }

    public pageChanged(event: any): void {
        console.log('Page changed to: ' + event.page);
        console.log('Number items per page: ' + event.itemsPerPage);
        this.currentPage = event.page - 1;
        this.setCurrentPage();
    }

    public setCurrentPage(): void {
        this.currPageGames = this.games.slice(this.currentPage * this.itemsPerPage,
            (this.currentPage * this.itemsPerPage) + this.itemsPerPage);
    }

    public sortByScore(): void {
        this.currentPage = 0;
        this.sortBy.sortType = SortType.score;
        this.sortBy.order = this.sortBy.order === SortOrder.asc ? SortOrder.desc : SortOrder.asc;


        this.games = this.games.sort((a, b) => {
            if (this.sortBy.order == SortOrder.desc) {
                return (b.score) - (a.score);
            }
            return a.score - b.score;
        });
        this.setCurrentPage();
    }
    public sortByName(): void {
        this.currentPage = 0;
        this.sortBy.sortType = SortType.name;
        this.sortBy.order = this.sortBy.order === SortOrder.asc ? SortOrder.desc : SortOrder.asc;
        this.games = this.games.sort((a, b) => {
            if (this.sortBy.order == SortOrder.asc) {
                return b.title.localeCompare(a.title);
            }
            return a.title.localeCompare(b.title);
        });
        this.setCurrentPage();
    }
    public sortByPlatform(): void {
        this.currentPage = 0;
        this.sortBy.sortType = SortType.platform;
        this.sortBy.order = this.sortBy.order === SortOrder.asc ? SortOrder.desc : SortOrder.asc;
        this.games = this.games.sort((a, b) => {
            if (this.sortBy.order == SortOrder.asc) {
                return b.platform.localeCompare(a.platform);
            }
            return a.platform.localeCompare(b.platform)
        });
        this.setCurrentPage();
    }

    public filterGamesByText(): void {
        const tempGames = this.games.slice();
        this.games = this.games.filter(a => a.title.toLowerCase()
            .search(this.searchText.toLowerCase()) > -1);
        this.currentPage = 0;
        this.setCurrentPage();
        this.games = tempGames;
    }

    public typeaheadOnSelect(event: any) {

    }
}
