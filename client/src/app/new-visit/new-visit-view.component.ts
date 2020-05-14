import {Component, Input, OnInit} from '@angular/core';
import { ViewNameService } from '../view-name.service';
import {HeaderName} from '../header-name';
import {EhrService, partyData} from '../ehr.service';


@Component({
  selector: 'app-new-visit',
  templateUrl: './new-visit-view.component.html',
  styleUrls: ['./new-visit-view.component.css']
})

export class NewVisitViewComponent extends HeaderName implements OnInit {

  @Input() visit: partyData;

  constructor(viewNameService: ViewNameService, private ehrService : EhrService) {
    super(viewNameService, 'Ny patient');
  }
  ngOnInit(): void {
    super.setView();
  }

  addVisit(): void {
    this.ehrService.createPerson(this.visit);
  }
  updateVisitor(visit: partyData) {
    console.log('reciving: ' + visit.firstNames + ' ' + visit.lastNames)
    this.visit = visit;
  }

}
