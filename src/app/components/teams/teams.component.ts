import { Component, OnInit } from '@angular/core';
import {SignupService} from '../../services/signup.service';
import {Team} from '../../models/team';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {

  teams: Team[];
  janeStreetTeams: Team[] = [];
  deutscheBankTeams: Team[] = [];
  bcrTeams: Team[] = [];

  displayedColumns: string[] = ['name', 'captain', 'teammate1', 'teammate2', 'redistribution'];

  constructor(private signupService: SignupService) { }

  ngOnInit(): void {
    this.getTeams();
  }

  private getTeams(): void {
    this.signupService.getTeams().subscribe(teams => {
      this.teams = teams.map(doc => doc.payload.doc.data());
      console.log(this.teams);
      this.janeStreetTeams = this.teams.filter(team => team.teamInfo.competition === 'Jane Street');
      this.deutscheBankTeams = this.teams.filter(team => team.teamInfo.competition === 'Deutsche Bank');
      this.bcrTeams = this.teams.filter(team => team.teamInfo.competition === 'BCR');
    });
  }
}
