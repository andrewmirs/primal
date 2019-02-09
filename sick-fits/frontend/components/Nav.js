import React, { Component } from 'react';
import { Fragment } from 'react';
import { Mutation } from 'react-apollo';
import { TOGGLE_CART_MUTATION } from './Cart';
import Link from 'next/link';
import NavStyles from './styles/NavStyles';
import CartCount from './CartCount';
import Signout from './Signout';
import User from './User';


class Nav extends Component {

    checkPermissions = (me) => {

        if(!me){
            return (
                <Link href="/signup">
                    <a>Sign In</a>
                </Link>
            );
        }
        
        const hasAdminPermissions = me.permissions.some(
            permission => ['ADMIN'].includes(permission)
        );

        const hasPermissions = me.permissions.some(
            permission => ['ITEMUPDATE', 'ITEMDELETE', 'ITEMCREATE'].includes(permission)
        );

        if(hasAdminPermissions){
            return (
                <Fragment>
                    <Link href="/sell">
                        <a>Sell</a>
                    </Link>
                    <Link href="/orders">
                        <a>Orders</a>
                    </Link>
                    <Link href="/permissions">
                        <a>Admin</a>
                    </Link>
                    <Signout />
                    <Mutation mutation={TOGGLE_CART_MUTATION}>
                        {(toggleCart) => (
                            <button onClick={toggleCart}>
                                My Cart
                                <CartCount count={me.cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0)} />
                            </button>
                        )}
                    </Mutation>
                </Fragment> 
            );
        }
    
        if(hasPermissions){
            return (
                <Fragment>
                    <Link href="/sell">
                        <a>Sell</a>
                    </Link>
                    <Link href="/orders">
                        <a>Orders</a>
                    </Link>
                    <Signout />
                    <Mutation mutation={TOGGLE_CART_MUTATION}>
                        {(toggleCart) => (
                            <button onClick={toggleCart}>
                                My Cart
                                <CartCount count={me.cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0)} />
                            </button>
                        )}
                    </Mutation>
                </Fragment> 
            );
        } else {
            return (
                <Fragment>
                    <Link href="/orders">
                        <a>Orders</a>
                    </Link>
                    <Signout />
                    <Mutation mutation={TOGGLE_CART_MUTATION}>
                        {(toggleCart) => (
                            <button onClick={toggleCart}>
                                My Cart
                                <CartCount count={me.cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0)} />
                            </button>
                        )}
                    </Mutation>
                </Fragment> 
            );
        }
    }
    

    render() {
        return (
            <User>
                {({ data: { me } }) => (
                    <NavStyles data-test="nav">
                        <Link href="/items">
                            <a>Shop</a>
                        </Link>
                        {this.checkPermissions(me)}
                    </NavStyles>
                )}
            </User>      
        );
    }
}
   


export default Nav;