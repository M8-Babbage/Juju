import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@environments/environment';
import { Character, Episode, Response } from '@models/api.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Class members
  private http = inject(HttpClient);
  private readonly API: string = environment.API;

  // Class methods
  public callApi(page: number): Observable<Response> {
    return this.http.get<Response>(`${this.API}/character/?page=${page}`);
  }

  public getCharacterById(id: string): Observable<Character> {
    return this.http.get<Character>(`${this.API}/character/${id}`);
  }

  public getEpisodeById(episodeUrl: string): Observable<Episode> {
    return this.http.get<Episode>(`${episodeUrl}`);
  }
}
