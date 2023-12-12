import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CardComponent } from '@components/card/card.component';
import { Character, Response } from '@models/api.model';
import { ApiService } from '@services/api.service';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [CommonModule, CardComponent, ReactiveFormsModule],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss'
})
export class CharactersComponent implements OnInit {
  private api = inject(ApiService);
  private destroyRef = inject(DestroyRef);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  public backup = {} as Response;
  public response = {} as Response;
  public page = 0;
  public search = new FormControl('');
  public status = new FormControl('');

  ngOnInit(): void {
    this.onSearchChanges();
    this.onStatusChanges();
    this.activatedRoute.queryParams.subscribe((params) => {
      this.page = params['page'];
      this.getPage(this.page);
    });
  }

  public getPage(page: number): void {
    this.api
      .callApi(page)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data: Response) => {
        this.backup = { ...data };
        this.response = { ...data };
      });
  }

  public goToNextPage(): void {
    if (!(this.page >= this.response.info.pages)) {
      this.page++;
      this.resetFilters();
      this.router.navigate(['/characters'], { queryParams: { page: this.page } });
    }
  }

  public goToPreviousPage(): void {
    if (!(this.page <= 1)) {
      this.page--;
      this.resetFilters();
      this.router.navigate(['/characters'], { queryParams: { page: this.page } });
    }
  }

  public goToPage(page: number): void {
    this.page = page;
    this.resetFilters();
    this.router.navigate(['/characters'], { queryParams: { page: this.page } });
  }

  public onSearchChanges(): void {
    this.search.valueChanges.pipe(takeUntilDestroyed(this.destroyRef), debounceTime(500)).subscribe((value) => {
      if (!value) {
        this.status.setValue('');
        this.response = { ...this.backup };
      } else {
        this.response.results = this.response.results.filter((item: Character) => {
          return item.name.toLowerCase().includes(value.toLowerCase());
        });
      }
    });
  }

  public onStatusChanges(): void {
    this.status.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => {
      if (value) {
        this.response.results = this.backup.results.filter((item: Character) => {
          return item.status.toLowerCase().includes(value.toLowerCase());
        });
      }
    });
  }

  public resetFilters(): void {
    this.search.setValue('');
    this.status.setValue('');
  }
}
