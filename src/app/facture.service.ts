// facture.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FactureService {
  private reservationData: any;
  private clientData: any;
  private paymentData: any;

  setReservationData(data: any) {
    this.reservationData = data;
  }

  getReservationData() {
    return this.reservationData;
  }

  setClientData(data: any) {
    this.clientData = data;
  }

  getClientData() {
    return this.clientData;
  }

  setPaymentData(data: any) {
    this.paymentData = data;
  }

  getPaymentData() {
    return this.paymentData;
  }
}
