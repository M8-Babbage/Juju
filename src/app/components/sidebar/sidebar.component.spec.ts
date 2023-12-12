import { NgClass, NgIf } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, RouterLinkActive } from '@angular/router';
import { SidebarComponent } from './sidebar.component';

const routerMock = {
  navigateByUrl: jest.fn(),
  url: '/internal-link'
};

describe('Sidebar component', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let windowSpy: jest.SpyInstance;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent, RouterLinkActive, NgClass, NgIf],
      providers: [
        {
          provide: Router,
          useValue: routerMock
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    windowSpy = jest.spyOn(window, 'window', 'get');
  });

  afterEach(() => {
    windowSpy.mockRestore();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('goTo: should navigate to internal link', () => {
    const url = '/internal-link';
    component.goTo(url);
    expect(routerMock.navigateByUrl).toHaveBeenCalledWith(url);
  });

  it('goTo: should navigate to external link', () => {
    const url = 'http://external-link';
    const open = jest.fn();
    windowSpy.mockImplementation(() => ({ open }));
    component.goTo(url);
    expect(window.open).toHaveBeenCalledWith(url, '_blank');
  });
});
