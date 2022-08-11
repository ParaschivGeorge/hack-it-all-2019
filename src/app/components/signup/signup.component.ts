import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Team} from '../../models/team';
import {TeamRegisterForm} from '../../models/team-register-form';
import {MemberRegisterForm} from '../../models/member-register-form';
import {SignupService} from '../../services/signup.service';
import {GlobalService} from '../../services/global.service';
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';
import {timeout} from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  teamRegisterForm: FormGroup = new FormGroup({
    teamName: new FormControl(null, Validators.required),
    competition: new FormControl(null, Validators.required),
    redistribution: new FormControl(false, Validators.required)
  });
  captainRegisterForm: FormGroup = new FormGroup({
    captain: new FormControl(true, Validators.requiredTrue),
    firstName: new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-ZĂăÂâÎîȘșŞşțȚ ]*$')]),
    lastName: new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-ZĂăÂâÎîȘșŞşțȚ ]*$')]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    phone: new FormControl(null, [Validators.required, Validators.pattern('[0-9]+')]),
    university: new FormControl(null, [Validators.required, Validators.pattern('^[0-9a-zA-ZĂăÂâÎîȘșŞşțȚ ]*$')]),
    faculty: new FormControl(null, [Validators.required, Validators.pattern('^[0-9a-zA-ZĂăÂâÎîȘșŞşțȚ ]*$')]),
    year: new FormControl(null, Validators.required),
    cvLink: new FormControl(null, Validators.required),
    gdpr: new FormControl(false, Validators.requiredTrue),
  });
  teammate1RegisterForm: FormGroup = new FormGroup({
    captain: new FormControl(false, Validators.required),
    firstName: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    phone: new FormControl(null, [Validators.required, Validators.pattern('[0-9]+')]),
    university: new FormControl(null, Validators.required),
    faculty: new FormControl(null, Validators.required),
    year: new FormControl(null, Validators.required),
    cvLink: new FormControl(null, Validators.required),
    gdpr: new FormControl(false, [Validators.requiredTrue]),
  });
  teammate2RegisterForm: FormGroup = new FormGroup({
    captain: new FormControl(false, Validators.required),
    firstName: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    phone: new FormControl(null, [Validators.required, Validators.pattern('[0-9]+')]),
    university: new FormControl(null, Validators.required),
    faculty: new FormControl(null, Validators.required),
    year: new FormControl(null, Validators.required),
    cvLink: new FormControl(null, Validators.required),
    gdpr: new FormControl(false, [Validators.requiredTrue]),
  });

  years: string[] = [];
  private readonly yearBaseKey = 'signUp.memberRegister.years.year';
  private langSubscription: Subscription;

  dbSelected = false;
  bcrSelected = false;
  jsSelected = false;

  submitted = false;
  showError = false;

  constructor(private signupService: SignupService, private globalService: GlobalService, private translateService: TranslateService) {
  }

  ngOnInit(): void {
    const keys = [];
    for (let i = 1; i <= 6; i++) {
      keys.push(this.yearBaseKey + i);
    }
    this.getKeysSubscription(keys);
    this.langSubscription = this.translateService.onLangChange.subscribe(() =>
      this.getKeysSubscription(keys));
  }

  private getKeysSubscription(keys: any[]): void {
    this.translateService.get(keys).subscribe(
      values => {
        this.years = Object.keys(values).map(key => values[key]);
      }
    ).unsubscribe();
  }

  selectDB(): void {
    this.dbSelected = true;
    this.bcrSelected = false;
    this.teamRegisterForm.controls.competition.setValue('Deutsche Bank');
  }

  selectBCR(): void {
    this.dbSelected = false;
    this.bcrSelected = true;
    this.teamRegisterForm.controls.competition.setValue('BCR');
  }

  selectHack(): void {
    this.jsSelected = false;
  }

  selectAlgo(): void {
    this.jsSelected = true;
    this.dbSelected = false;
    this.bcrSelected = false;
    this.teamRegisterForm.controls.competition.setValue('Jane Street');
  }

  onSubmit(): void {
    if (this.teamRegisterForm.valid && this.captainRegisterForm.valid &&
      this.teammate1RegisterForm.valid && this.teammate2RegisterForm.valid) {
      const team: Team = {
        teamInfo: this.teamRegisterForm.getRawValue() as TeamRegisterForm,
        captainInfo: this.captainRegisterForm.getRawValue() as MemberRegisterForm,
        teammate1Info: this.teammate1RegisterForm.getRawValue() as MemberRegisterForm,
        teammate2Info: this.teammate2RegisterForm.getRawValue() as MemberRegisterForm
      };
      this.globalService.increaseActiveRequests();
      this.signupService.signUp(team).then(res => {
        this.submitted = true;
        this.globalService.deceaseActiveRequests();
      }, err => {
        this.globalService.deceaseActiveRequests();
        this.showError = true;
        setTimeout(() => this.showError = false, 5000);
      });
    }
  }

  ngOnDestroy(): void {
    this.langSubscription.unsubscribe();
  }
}
