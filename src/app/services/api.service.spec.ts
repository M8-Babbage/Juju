import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '@environments/environment';
import { Character, Episode, Response } from '@models/api.model';
import { ApiService } from './api.service';

const API = environment.API;

describe('Api service', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
  });

  beforeEach(() => {
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('callApi: should fetch characters by page', () => {
    const mockResponse: Response = {
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

    service.callApi(1).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${API}/character/?page=1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('getCharacterById: should fetch character by id', () => {
    const mockCharacter: Character = {
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
    };

    service.getCharacterById('1').subscribe((character) => {
      expect(character).toEqual(mockCharacter);
    });

    const req = httpMock.expectOne(`${API}/character/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCharacter);
  });

  it('getEpisodeById: should fetch episode by url', () => {
    const mockEpisode: Episode = {
      id: 1,
      name: 'mockName',
      air_date: 'mockAirDate',
      episode: 'mockEpisode',
      characters: ['mockCharacter'],
      url: 'mockUrl',
      created: new Date()
    };
    const url = 'http://example.com/episode/1';

    service.getEpisodeById(url).subscribe((episode) => {
      expect(episode).toEqual(mockEpisode);
    });

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush(mockEpisode);
  });
});
