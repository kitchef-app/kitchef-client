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
  mutation AddInvoice($invoiceInput: InvoiceForm) {
    addInvoice(invoiceInput: $invoiceInput) {
      InvoiceId
    }
  }
`;

export const PUT_CHANGE_STATUS_INVOICE = gql`
  mutation ChangeStatusInvoice($invoiceId: Int) {
    changeStatusInvoice(InvoiceId: $invoiceId)
  }
`;
