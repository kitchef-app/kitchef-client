import { gql } from "@apollo/client";

export const INVOICE_DRIVER = gql`
  query Query($driverId: Int) {
    getInvoiceDriver(DriverId: $driverId) {
      id
      UserId
      DriverId
      total
      isPaid
      isDelivered
      subTotal
      shippingCost
    }
  }
`;
export const CHANGE_STATUS_COMPLETE_DELIVERED = gql`
  mutation Mutation($invoiceDelId: Int) {
    changeStatusDeliveryInvoice(InvoiceDelId: $invoiceDelId)
  }
`;
