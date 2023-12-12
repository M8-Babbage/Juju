import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsyncPipe, NgClass, NgIf, TitleCasePipe } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiService } from '@services/api.service';
import { CardComponent } from './card.component';

const ApiServiceMock = {
  getEpisodeById: jest.fn()
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
        RouterTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
