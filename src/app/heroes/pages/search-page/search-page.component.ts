import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.services';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: [
  ]
})
export class SearchPageComponent implements OnInit {

  public searchInput = new FormControl('');
  public heroes: Hero[] = [];
  public selectedHero?: Hero;

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }

  searchHero(): void {
    const value: string = this.searchInput.value || '';

    this.heroesService.getSuggestions(value)
      .subscribe(heroes => this.heroes = heroes);
    console.log({ value });
  }

  onSelectedOption(event: MatAutocompleteSelectedEvent): void {
    if (!event.option.value) {
      this.selectedHero = undefined;
      return;
    }

    const hero: Hero = event.option.value;
    this.selectedHero = hero;
    this.searchInput.setValue(hero.superhero);
  }
}
