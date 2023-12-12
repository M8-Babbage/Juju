import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { CardComponent } from '@components/card/card.component';
import { ApiService } from '@services/api.service';
import { of } from 'rxjs';
import { CharacterComponent } from './character.component';

const ApiServiceMock = {
  getCharacterById: jest.fn().mockReturnValue(of({ name: 'Test Character' }))
};

const ActivatedRouteMock = {
  snapshot: {
    paramMap: {
      get: () => {}
    }
  }
};

describe('Character component', () => {
  let component: CharacterComponent;
  let fixture: ComponentFixture<CharacterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterComponent, CardComponent],
      providers: [
        {
          provide: ApiService,
          useValue: ApiServiceMock
        },
        {
          provide: ActivatedRoute,
          useValue: ActivatedRouteMock
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should get character', () => {
    component.getCharacter();

    expect(component.character).toEqual({ name: 'Test Character' });
    expect(ApiServiceMock.getCharacterById).toHaveBeenCalled();
  });
});
