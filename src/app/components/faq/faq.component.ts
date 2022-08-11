import {Component, OnDestroy, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit, OnDestroy {
  public questions: { q: string, a: string }[];
  private readonly numberOfQuestions = 10;
  private readonly questionBaseKey = 'frequentQuestions.questions.q';
  private langSubscription: Subscription;

  constructor(private translateService: TranslateService) {
  }

  ngOnInit(): void {
    const keys = [];
    for (let i = 1; i <= this.numberOfQuestions; i++) {
      keys.push(this.questionBaseKey + i);
    }
    this.getKeysSubscription(keys);
    this.langSubscription = this.translateService.onLangChange.subscribe(() =>
      this.getKeysSubscription(keys));
  }

  private getKeysSubscription(keys: any[]): void {
    this.translateService.get(keys).subscribe(
      values => {
        this.questions = Object.keys(values).map(key => values[key]);
      }
    ).unsubscribe();
  }

  ngOnDestroy(): void {
    this.langSubscription.unsubscribe();
  }

}
