const Mutations = {
    async createItem(partent, args, context, info){
        // TODO: check if they are logged in

        const item =  await context.db.mutation.createItem({
            data: {
                ...args,
            },
        }, info);

        return item;
    }

    // createDog(partent, args, context, info){
    //     global.dogs = global.dogs || [];
    //     // Create a dog!
    //     const newDog = { name: args.name };
    //     global.dogs.push(newDog);
    //     return newDog;
    // },
};

module.exports = Mutations;
