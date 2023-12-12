import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardComponent } from '@components/card/card.component';
import { Character } from '@models/api.model';
import { ApiService } from '@services/api.service';

@Component({
  selector: 'app-character',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './character.component.html',
  styleUrl: './character.component.scss'
})
export class CharacterComponent implements OnInit {
  private api = inject(ApiService);
  private activatedRoute = inject(ActivatedRoute);

  // Class members
  public character = {} as Character;

  ngOnInit(): void {
    this.getCharacter();
  }

  public getIdFromUrl(): string {
    return this.activatedRoute.snapshot.paramMap.get('id') ?? '';
  }

  public getCharacter(): void {
    this.api.getCharacterById(this.getIdFromUrl()).subscribe((character) => {
      this.character = character;
    });
  }
}
