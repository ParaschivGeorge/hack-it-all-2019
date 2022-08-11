import {TeamRegisterForm} from './team-register-form';
import {MemberRegisterForm} from './member-register-form';

export interface Team {
  teamInfo: TeamRegisterForm;
  captainInfo: MemberRegisterForm;
  teammate1Info: MemberRegisterForm;
  teammate2Info: MemberRegisterForm;
}
