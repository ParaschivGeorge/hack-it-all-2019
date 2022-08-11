import {Component, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {NavigationEnd, Router} from '@angular/router';
import {GlobalService} from './services/global.service';
import {TranslateService} from '@ngx-translate/core';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hackItAll';

  @ViewChild('sidenav') drawer: MatSidenav;

  private readonly en = 'en';
  private readonly ro = 'ro';

  constructor(private globalService: GlobalService,
              private translateService: TranslateService,
              private router: Router) {
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(_ => this.drawer.close());
    translateService.setDefaultLang(this.ro);
    translateService.use(this.ro);
  }

  get loading(): boolean {
    return this.globalService.isLoading();
  }

  public selectRoLanguage(): void {
    this.translateService.use(this.ro);
  }

  public selectEnLanguage(): void {
    this.translateService.use(this.en);
  }
}
