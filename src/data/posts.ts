import { Post } from '../types/post';

export const posts: Post[] = [
  {
    id: '1',
    title: 'First Post!',
    content: 'Hello!',
    userId: '1',
    date: '2023-12-06T05:59:17.043Z',
    reactions: {
      thumbsUp: 0,
      hooray: 0,
      heart: 0,
      rocket: 0,
      eyes: 0,
    },
  },
  {
    id: '2',
    title: 'Second Post',
    content: 'More text',
    userId: '2',
    date: '2023-12-06T05:59:35.506Z',
    reactions: {
      thumbsUp: 0,
      hooray: 0,
      heart: 0,
      rocket: 0,
      eyes: 0,
    },
  },
];
