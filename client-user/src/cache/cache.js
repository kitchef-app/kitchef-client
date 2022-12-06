import { makeVar, InMemoryCache } from "@apollo/client";

export const cartItemsVar = makeVar([]);

// cartItemsVar(); //return the current calue of the cart
// cartItemsVar([1,2,3]); //set the cartItemsVar to the array we gave

export const CustomInMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        cartItems: {
          read() {
            return cartItemsVar();
          },
        },
      },
    },
  },
});
