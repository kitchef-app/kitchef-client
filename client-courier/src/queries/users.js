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
export const POST_LOGIN_DRIVER = gql`
  mutation Mutation($driverLogin: LoginForm) {
    loginDriver(driverLogin: $driverLogin) {
      access_token
      email
      role
      id
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
      createdAt
      id
    }
  }
`;
