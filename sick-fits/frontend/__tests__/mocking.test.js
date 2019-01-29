function Person(name, foods) {
    this.name = name;
    this.foods = foods;
}

Person.prototype.fetchFavFoods = function(){
    return new Promise((resolve, reject) => {
        // Simulate an API
        setTimeout(() => resolve(this.foods), 2000);
    });
};
    

describe('mocking learning', () => {
    it('mocks a regular function', () => {
        const fetchDogs = jest.fn();
        fetchDogs('daisy');
        expect(fetchDogs).toHaveBeenCalled();
        expect(fetchDogs).toHaveBeenCalledWith('daisy');
        fetchDogs('molly');
        expect(fetchDogs).toHaveBeenCalledTimes(2);
    });

    it('can create a person', () => {
        const me = new Person('Andrew', ['sushi', 'veggies']);

        expect(me.name).toBe('Andrew');
    })

    it('can fetch foods', async () => {
        const me = new Person('Andrew', ['sushi', 'veggies']);
        // Mock the favFoods function
        me.fetchFavFoods = jest.fn().mockResolvedValue(['sushi', 'veggies'])
        const favFoods = await me.fetchFavFoods();
        console.log(favFoods);
        expect(favFoods).toContain('veggies');
    });
});