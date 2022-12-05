import { gql } from "@apollo/client";

export const GET_CATEGORY = gql`
  query Query {
    getCategory {
      id
      imageUrl
      name
    }
  }
`;

export const GET_PRODUCTS = gql`
  query GetProducts {
    getProducts {
      stock
      satuan
      price
      name
      imageUrl
      description
    }
  }
`;

export const GET_ALL_DISHES = gql`
  query GetDishes {
    getDishes {
      id
      name
      CategoryId
      imageUrl
    }
  }
`;

export const GET_DISHES_DETAIL_BY_ID = gql`
  query GetDishesDetail($dishId: ID) {
    getDishesDetail(DishId: $dishId) {
      name
      CategoryId
      videoUrl
      description
      imageUrl
      listIngredients {
        name
      }
      listTools {
        name
      }
      Products {
        name
        price
        stock
        imageUrl
        description
        satuan
      }
      steps {
        name
      }
    }
  }
`;
