import { Injectable } from '@angular/core';
import { PaymentDetail } from './payment-detail.model';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailService {

  formDetail: PaymentDetail = new PaymentDetail();
  readonly baseUrl = "http://localhost:9073/api/PaymentDetail";
  list: PaymentDetail[];
  constructor(private http: HttpClient) {

  }


  postPaymentDetail() {
    return this.http.post(this.baseUrl, this.formDetail);
  }

  putPaymentDetail() {
    return this.http.put(`${this.baseUrl}/${this.formDetail.paymentDetailId}`, this.formDetail);
  }

  deleteRecord(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  async refreshList() {
    return firstValueFrom(this.http.get(this.baseUrl))
      .then(res => this.list = res as PaymentDetail[]);
  }


}
