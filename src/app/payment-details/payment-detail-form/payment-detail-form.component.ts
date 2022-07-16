import { Component, Input, OnInit, Output } from '@angular/core';
import { NgControl, NgForm, NgModel } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PaymentDetail } from 'src/app/shared/payment-detail.model';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';

@Component({
  selector: 'app-payment-detail-form',
  templateUrl: './payment-detail-form.component.html',
  styles: [
  ]
})
export class PaymentDetailFormComponent implements OnInit {

  public expirationInputDate: string;


  constructor(public service: PaymentDetailService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit(formData: NgForm) {

    if (this.service.formDetail.paymentDetailId == 0) {
      this.insertRecord(formData);
    } else {
      this.updateRecord(formData);
    }


  }

  insertRecord(formData: NgForm) {

    this.service.postPaymentDetail().subscribe({
      next: () => {
        this.resetForm(formData);
        this.showSuccess();
        this.service.refreshList();
      },
      error: (e) => console.log(e)
    }

    );
  }

  updateRecord(formData: NgForm) {
    this.service.putPaymentDetail().subscribe({
      next: () => {

        this.resetForm(formData);
        this.showUpdate();
        this.service.refreshList();
      },
      error: (e) => console.log(e)
    }

    );
  }

  resetForm(form: NgForm) {
    //the first form is instance of ngForm class, the second is property form in that class
    form.form.reset();
    this.service.formDetail = new PaymentDetail();
  }

  showSuccess() {
    this.toastr.success("Submitted successfully!", "Payment Detail Register");
  }

  showUpdate() {
    this.toastr.info("Updated successfully!", "Payment Detail Register");
  }

  addSlash(value: string): string {

    if (value.length == 2) {
      value = value + "/";
      return value;
    }
    return value;





  }
}

