const { forwardTo } = require('prisma-binding');

const Query = {
    items: forwardTo('db'),
    // async items(parent, args, context, info){
    //     console.log('Getting Items! WHooooOOo');
    //     const items = await context.db.query.items();
    //     return items;
    // },
};

module.exports = Query;
