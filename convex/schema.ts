import { v } from 'convex/values';
import { defineSchema, defineTable } from 'convex/server';

export default defineSchema({
  boards: defineTable({
    title: v.string(),
    orgId: v.string(),
    authorId: v.string(),
    authorName: v.string(),
    imageUrl: v.string(),
    /* could have added favourites here itself, as convex allowes mixture of sql and nosql
       like this -> favourites: v.array(v.string()),
       but convex docs itself says to use separate table for such cases as after a limited number of entries, it is not much scalable
       thus, I have used a separate table for favourites
    */
  })
    .index('by_org', ['orgId'])
    .searchIndex('search_title', {
      searchField: 'title',
      filterFields: ['orgId'],
    }),
  userFavorites: defineTable({
    orgId: v.string(),
    userId: v.string(),
    boardId: v.id('boards'),
  })
    .index('by_board', ['boardId'])
    .index('by_user_org', ['userId', 'orgId'])
    .index('by_user_board', ['userId', 'boardId'])
    .index('by_user_board_org', ['userId', 'boardId', 'orgId']),
});
