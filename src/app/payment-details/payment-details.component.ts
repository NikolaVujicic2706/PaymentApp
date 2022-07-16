import { Component, OnInit } from '@angular/core';
import { PaymentDetail } from '../shared/payment-detail.model';
import { PaymentDetailService } from '../shared/payment-detail.service';


@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styles: [
  ]
})
export class PaymentDetailsComponent implements OnInit {
  constructor(public service: PaymentDetailService) { }

  ngOnInit(): void {
    this.service.refreshList();
  }

  populateForm(selectedRecord: PaymentDetail) {
    this.service.formDetail = Object.assign({}, selectedRecord);
  }

  onDelete(id: number) {
    this.service.deleteRecord(id).subscribe({
      next: () => {


        this.service.refreshList();
      },
      error: (e) => console.log(e)
    }

    );
  }
}

