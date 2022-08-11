import {Injectable} from '@angular/core';
import {AngularFirestore, DocumentReference} from '@angular/fire/firestore';
import {Team} from '../models/team';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private firestore: AngularFirestore) {
  }

  signUp(team: Team): Promise<DocumentReference> {
    return this.firestore
        .collection('teams')
        .add(team);
  }

  getTeams(): Observable<any> {
    return this.firestore.collection('teams').snapshotChanges();
  }
}
