import React, { Component, Fragment } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import ItemStyles from './styles/ItemStyles';
import PriceTag from './styles/PriceTag';
import Title from './styles/Title';
import formatMoney from '../lib/formatMoney';
import AddToCart from './AddToCart';
import DeleteItem from './DeleteItem';
import User from './User';


class Item extends Component {
    
    static propTypes = {
        item: PropTypes.object.isRequired,
    };

    checkPermissions = (me, item) => {

        if(!me){
            return (
                <Fragment></Fragment>
            );
        }

        const hasPermissions = me.permissions.some(
            permission => ['ADMIN', 'ITEMUPDATE', 'ITEMDELETE'].includes(permission)
        );

        if(hasPermissions){
            return (
                <div className="buttonList">
                    <Link href={{
                        pathname: "update",
                        query: { id: item.id },
                    }}>
                        <a>Edit ✎</a>
                    </Link>
                    <AddToCart id={item.id} />
                    <DeleteItem id={item.id}>Delete Item</DeleteItem>
                </div>
            );
        } else {
            return (
                <div className="buttonList">
                    <AddToCart id={item.id} />
                </div>
            );
        }
    }

    render() {
        const { item } = this.props;
        return (
            <User>
                {({ data: { me } }) => (
                    <ItemStyles>
                        {item.image && <img src={item.image} alt={item.title} />}
                        <Title>
                            <Link href={{
                                pathname: '/item',
                                query: { id: item.id },
                            }}>
                            <a>{item.title}</a>
                            </Link>
                        </Title>
                        <PriceTag>{formatMoney(item.price)}</PriceTag>
                        <p>{item.description}</p>
                        {this.checkPermissions(me, item)}
                    </ItemStyles>
                )}
            </User>
        );
    }
}

export default Item;