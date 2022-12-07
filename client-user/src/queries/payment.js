import { gql } from "@apollo/client";

export const POST_PAYMENT = gql`
  mutation Mutation($paymentInput: PaymentForm) {
    payment(paymentInput: $paymentInput) {
      redirect_url
      token
    }
  }
`;

export const POST_INVOICE = gql`
  mutation Mutation($invoiceInput: InvoiceForm) {
    addInvoice(invoiceInput: $invoiceInput) {
      id
      UserId
      DriverId
      total
      subTotal
      shippingCost
    }
  }
`;

export const PUT_CHANGE_STATUS_INVOICE = gql`
  mutation ChangeStatusInvoice($userId: Int, $invoiceId: Int) {
    changeStatusInvoice(UserId: $userId, InvoiceId: $invoiceId)
  }
`;
