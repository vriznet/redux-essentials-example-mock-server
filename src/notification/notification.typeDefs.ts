export default `#graphql
  type Notification {
    id: String!
    date: String!
    message: String!
    userId: String!
    read: Boolean!
    isNew: Boolean!
  }

  type Query {
    notifications: [Notification]!
    notificationsSince(date: String!): [Notification]!
  }

  type Mutation {
    addNewNotification(message: String!, userId: String!): Notification!
    markAsRead(id: String!): MutationResponse!
    markAllNotificationsAsRead: MutationResponse!
    markAllNotificationsOfUserAsRead(userId: String!): MutationResponse!
  }
`;
