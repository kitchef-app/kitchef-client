import { gql } from "@apollo/client";

export const GET_NOTIFICATION_BY_USER_ID = gql`
  query Query($logsUserId: ID) {
    getLogsByUserId(LogsUserId: $logsUserId) {
      messageNotification
      UserId
    }
  }
`;
