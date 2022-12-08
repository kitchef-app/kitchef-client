import { gql } from "@apollo/client";

export const POST_REGISTER = gql`
  mutation Mutation($userInput: UserForm) {
    registerUser(userInput: $userInput)
  }
`;

export const POST_LOGIN = gql`
  mutation Mutation($userLogin: LoginForm) {
    loginUser(userLogin: $userLogin) {
      role
      id
      email
      access_token
    }
  }
`;

export const GET_USER = gql`
  query GetUserById($id: Int) {
    getUserById(_id: $id) {
      username
      phoneNumber
      fullName
      email
      address
      location {
        type
        coordinates
      }
    }
  }
`;

export const GET_ORDER_LIST = gql`
  query GetInvoiceUser($userId: Int) {
    getInvoiceUser(UserId: $userId) {
      isDelivered
      isPaid
      createdAt
      id
      DriverId
      UserId
    }
  }
`;
