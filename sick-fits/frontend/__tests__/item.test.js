import ItemComponent from '../components/Item';
import { shallow } from 'enzyme';

const fakeItem = {
    id: 'ASDF123',
    title: 'A Cool Item',
    price: 5000,
    description: 'This is a realllly cool item',
    image: 'dog.jpg',
    largeImage: 'largedog.jpg',
};

describe('<Item/>', () => {
    it('renders the image properly', () => {
        const wrapper = shallow(<ItemComponent item={fakeItem}/>);
        const img = wrapper.find('img');
        expect(img.props().src).toBe(fakeItem.image);
        expect(img.props().alt).toBe(fakeItem.title);
    });

    it('renders the pricetag and title properly', () => {
        const wrapper = shallow(<ItemComponent item={fakeItem}/>);
        const priceTag = wrapper.find('PriceTag');
        // console.log(priceTag.children().text());
        expect(priceTag.children().text()).toBe('$50');
        // console.log(wrapper.debug());

        expect(wrapper.find('Title a').text()).toBe(fakeItem.title);
    });

    it('renders out the buttons properly', () => {
        const wrapper = shallow(<ItemComponent item={fakeItem}/>);
        const buttonList = wrapper.find('.buttonList');
        expect(buttonList.find('Link').exists()).toBe(true);
        expect(buttonList.find('AddToCart').exists()).toBe(true);
        expect(buttonList.find('DeleteItem').exists()).toBe(true);
        console.log(buttonList.debug());
    })
});