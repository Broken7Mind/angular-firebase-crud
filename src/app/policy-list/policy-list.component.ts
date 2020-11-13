import { Component, OnInit } from '@angular/core';
import { Policy } from '../policy.model';
import { PolicyService } from '../policy.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-policy-list',
  templateUrl: './policy-list.component.html',
  styleUrls: ['./policy-list.component.css']
})
export class PolicyListComponent implements OnInit {

  policies: Policy[];
  politicas: Policy = new Policy();

  constructor(private policyService: PolicyService ) { }

  ngOnInit(): void {
    this.policyService.getPolicies().subscribe(data => {
      this.policies = data.map(e => {
        console.log(e.payload.doc.data() as Policy);
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as Policy
        } as Policy;
      })
    });
  }

  create(){
    console.log(this.politicas);
    this.policyService.createPolicy(this.politicas);
  }

  update(policy: Policy) {
    this.policyService.updatePolicy(policy);
  }

  delete(id: string) {
    this.policyService.deletePolicy(id);
  }

}
