import { gql } from "@apollo/client";

export const GET_NOTIFICATION_BY_USER_ID = gql`
  query GetLogsByUserId($logsUserId: ID) {
    getLogsByUserId(LogsUserId: $logsUserId) {
      UserId
      messageNotification
    }
  }
`;
