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
