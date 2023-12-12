import { AsyncPipe, NgClass, NgIf, TitleCasePipe } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Character, Episode } from '@models/api.model';
import { ApiService } from '@services/api.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [TitleCasePipe, NgClass, NgIf, AsyncPipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnChanges {
  @Input({ required: true }) item: Character = {} as Character;
  private router = inject(Router);
  private apiService = inject(ApiService);
  public episode = {} as Episode;

  // Create subject to render view when episode is ready
  public episodeSubject = new Subject<boolean>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['item'] && this.item && this.item.episode && this.item.episode.length > 0) {
      this.getEpisodeId();
    }
  }

  public getEpisodeId(): void {
    this.apiService.getEpisodeById(this.item.episode[0]).subscribe((episode: Episode) => {
      this.episode = episode;
      this.episodeSubject.next(true);
    });
  }

  public goToCharacter(): void {
    this.router.navigate(['/character', this.item.id]);
  }
}
