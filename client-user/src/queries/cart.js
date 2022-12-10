import { gql } from "@apollo/client";

export const GET_CART_ITEMS = gql`
  query GetCartItems {
    cartItems @client
  }
`;

// export const UPDATE_CART_ITEMS_QUANTITY = gql`
//   query CurrentQuantity($quantity: Int) {
//     cartItems @client
//   }
// `;
