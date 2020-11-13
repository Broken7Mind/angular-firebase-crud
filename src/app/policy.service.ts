import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Policy } from './policy.model';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {
  constructor(private firestore: AngularFirestore) { }
  //Este método devuelve un observable
  getPolicies(){
    return this.firestore.collection('policies').snapshotChanges();
  }

  createPolicy(policy: Policy){
    console.log(policy);
    return this.firestore.collection('policies').add({...policy});
  }

  updatePolicy(policy: Policy){
    delete policy.id;
    this.firestore.doc('policies/' + policy.id).update(policy);
  }

  deletePolicy(policyId: string){
    this.firestore.doc('policies/' + policyId).delete();
  }
}
