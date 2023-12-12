import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Response } from '@models/api.model';
import { ApiService } from '@services/api.service';
import { of } from 'rxjs';
import { CharactersComponent } from './characters.component';

const apiServiceMock = {
  callApi: () => {
    return {
      subscribe: () => {}
    };
  },
  getCharacterById: () => {
    return {
      subscribe: () => {}
    };
  },
  getEpisodeById: () => {
    return {
      subscribe: () => {}
    };
  }
};

const activatedRouteMock = {
  queryParams: of({ page: 'mockPage' })
};

const routerMock = {
  navigate: () => {}
};

describe('Characters component', () => {
  let component: CharactersComponent;
  let fixture: ComponentFixture<CharactersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharactersComponent],
      providers: [
        {
          provide: ApiService,
          useValue: apiServiceMock
        },
        {
          provide: ActivatedRoute,
          useValue: activatedRouteMock
        },
        {
          provide: Router,
          useValue: routerMock
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CharactersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getPage: should call getPage and update response', () => {
    const responseMock: Response = {
      info: {
        count: 1,
        pages: 1,
        next: 'mockNext',
        prev: null
      },
      results: [
        {
          id: 1,
          name: 'mockName',
          status: 'mockStatus',
          species: 'mockSpecies',
          type: 'mockType',
          gender: 'mockGender',
          origin: {
            name: 'mockName',
            url: 'mockUrl'
          },
          location: {
            name: 'mockName',
            url: 'mockUrl'
          },
          image: 'mockImage',
          episode: ['mockEpisode'],
          url: 'mockUrl',
          created: new Date()
        }
      ]
    };

    jest.spyOn(apiServiceMock, 'callApi').mockReturnValue(of(responseMock));
    component.getPage(1);
    expect(component.response).toEqual(responseMock);
    expect(component.backup).toEqual(responseMock);
  });

  it('goToNextPage: should navigate to next page', () => {
    const navigateSpy = jest.spyOn(routerMock, 'navigate');
    component.page = 1;
    component.response = { info: { pages: 2 } } as Response;
    component.goToNextPage();
    expect(navigateSpy).toHaveBeenCalledWith(['/characters'], { queryParams: { page: 2 } });
  });

  it('goToPreviousPage: should navigate to previous page', () => {
    const navigateSpy = jest.spyOn(routerMock, 'navigate');
    component.page = 2;
    component.response = { info: { pages: 2 } } as Response;
    component.goToPreviousPage();
    expect(navigateSpy).toHaveBeenCalledWith(['/characters'], { queryParams: { page: 1 } });
  });

  it('goToPage: should navigate to given page', () => {
    const navigateSpy = jest.spyOn(routerMock, 'navigate');
    component.goToPage(2);
    expect(navigateSpy).toHaveBeenCalledWith(['/characters'], { queryParams: { page: 2 } });
  });

  it('onSearchChanges: should filter results on search value change', fakeAsync(() => {
    const responseMock = { results: [{ name: 'Character 1' }, { name: 'Character 2' }] };
    component.response = { ...responseMock } as Response;
    component.backup = { ...responseMock } as Response;
    component.search.setValue('Character 1');
    tick(500);
    expect(component.response.results.length).toBe(1);
    expect(component.response.results[0].name).toBe('Character 1');
  }));

  it('onSearchChanges: should reset results when search value is empty', fakeAsync(() => {
    const responseMock = { results: [{ name: 'Character 1' }, { name: 'Character 2' }] };
    component.response = { ...responseMock } as Response;
    component.backup = { ...responseMock } as Response;
    component.search.setValue('');
    tick(500);
    expect(component.response).toEqual(component.backup);
  }));

  it('resetFilters: should reset filters', () => {
    component.search.setValue('test');
    component.status.setValue('test');
    component.resetFilters();
    expect(component.search.value).toBe('');
    expect(component.status.value).toBe('');
  });
});
