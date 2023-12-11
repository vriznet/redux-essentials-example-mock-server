import { randomUUID } from 'crypto';
import client from '../client';
import { Resolvers } from '../type';
import dayjs from 'dayjs';
import { dayjsTimezone } from '../utils';

const resolvers: Resolvers = {
  Query: {
    notifications: () => client.notification.findMany(),
    notificationsSince: async (_, { date }) => {
      const notifications = await client.notification.findMany({
        where: {
          date: {
            gt: date,
          },
        },
        orderBy: {
          date: 'desc',
        },
      });
      if (!notifications) return [];
      return notifications;
    },
  },
  Mutation: {
    addNewNotification: async (_, { message, userId }) => {
      dayjsTimezone();
      try {
        const newNotification = await client.notification.create({
          data: {
            id: randomUUID(),
            date: dayjs().tz('Asia/Seoul').toDate(),
            message,
            user: {
              connect: {
                id: userId,
              },
            },
            read: false,
            isNew: true,
          },
        });
        return newNotification;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
    markAsRead: async (_, { id }) => {
      try {
        const notification = await client.notification.findUnique({
          where: {
            id,
          },
        });
        if (!notification)
          return { ok: false, error: 'Notification not found.' };
        await client.notification.update({
          where: {
            id,
          },
          data: {
            read: true,
            isNew: false,
          },
        });
        return {
          ok: true,
        };
      } catch (error) {
        console.error(error);
        return {
          ok: false,
          error: 'Could not mark notification as read.',
        };
      }
    },
    markAllNotificationsAsRead: async () => {
      try {
        await client.notification.updateMany({
          where: {
            read: false,
          },
          data: {
            read: true,
            isNew: false,
          },
        });
        return {
          ok: true,
        };
      } catch (error) {
        console.error(error);
        return {
          ok: false,
          error: 'Could not mark notifications as read.',
        };
      }
    },
    markAllNotificationsOfUserAsRead: async (_, { userId }) => {
      try {
        await client.notification.updateMany({
          where: {
            userId,
            read: false,
          },
          data: {
            read: true,
            isNew: false,
          },
        });
        return {
          ok: true,
        };
      } catch (error) {
        console.error(error);
        return {
          ok: false,
          error: 'Could not mark notifications as read.',
        };
      }
    },
  },
};

export default resolvers;
