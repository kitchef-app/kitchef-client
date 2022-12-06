import { gql } from "@apollo/client";

export const GET_DETAIL_INVOICE = gql`
  query GetInvoiceById($invoiceId: Int) {
    getInvoiceProducts(InvoiceId: $invoiceId) {
      total
      Product {
        price
        imageUrl
        name
      }
    }
  }
`;
