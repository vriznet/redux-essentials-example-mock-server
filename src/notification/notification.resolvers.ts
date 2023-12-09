import { notifications } from '../data/notifications';
import { Resolvers } from '../type';

const resolvers: Resolvers = {
  Query: {
    notifications: () => notifications,
    notificationsSince: (_, { date }) => {
      console.log(notifications);
      console.log(date);
      return notifications.filter((notification) => notification.date > date);
    },
  },
  Mutation: {
    addNewNotification: (_, { message, userId }) => {
      const newDate = new Date().toISOString();
      const newNotification = {
        id: String(notifications.length + 1),
        date: newDate,
        message,
        userId,
        read: false,
        isNew: true,
      };
      notifications.unshift(newNotification);
      return newNotification;
    },
    markAsRead: (_, { id }) => {
      const notification = notifications.find(
        (notification) => notification.id === id
      );
      if (notification) {
        notification.isNew = false;
        notification.read = true;
        return {
          ok: true,
        };
      } else {
        return {
          ok: false,
          error: 'Could not find notification.',
        };
      }
    },
    markAllNotificationsAsRead: () => {
      notifications.forEach((notification) => {
        notification.isNew = false;
        notification.read = true;
      });
      return {
        ok: true,
      };
    },
    markAllNotificationsOfUserAsRead: (_, { userId }) => {
      const userNotifications = notifications.filter(
        (notification) => notification.userId === userId
      );
      if (userNotifications.length > 0) {
        userNotifications.forEach((notification) => {
          notification.isNew = false;
          notification.read = true;
        });
        return {
          ok: true,
        };
      } else {
        return {
          ok: false,
          error: 'Could not find notifications of user.',
        };
      }
    },
  },
};

export default resolvers;
