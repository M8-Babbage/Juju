import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsyncPipe, NgClass, NgIf, TitleCasePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Character, Episode } from '@models/api.model';
import { ApiService } from '@services/api.service';
import { of } from 'rxjs';
import { CardComponent } from './card.component';

const ApiServiceMock = {
  getEpisodeById: jest.fn()
};

const routerMock = {
  navigate: () => {}
};

describe('Card component', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent, TitleCasePipe, NgClass, NgIf, AsyncPipe],
      providers: [
        {
          provide: ApiService,
          useValue: ApiServiceMock
        },
        {
          provide: Router,
          useValue: routerMock
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getEpisodeId: should get episode id', () => {
    const episodeId = 'some-episode-id';
    component.item = { episode: [episodeId] } as Character;

    const episodeData: Episode = {
      id: 1,
      name: 'Pilot',
      air_date: 'December 2, 2013',
      episode: 'S01E01',
      characters: ['https://rickandmortyapi.com/api/character/1'],
      url: 'https://rickandmortyapi.com/api/episode/1',
      created: new Date()
    };
    ApiServiceMock.getEpisodeById.mockReturnValue(of(episodeData));

    component.getEpisodeId();

    expect(ApiServiceMock.getEpisodeById).toHaveBeenCalledWith(episodeId);
    expect(component.episode).toEqual(episodeData);
  });

  it('goToCharacter: should navigate to character', () => {
    const characterId = 'some-character-id';
    component.item = { id: characterId } as any;

    const navigateSpy = jest.spyOn(routerMock, 'navigate');

    component.goToCharacter();

    expect(navigateSpy).toHaveBeenCalledWith(['/character', characterId]);
  });
});
