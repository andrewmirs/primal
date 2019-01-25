import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { Mutation } from 'react-apollo';
import Router from 'next/router';
import NProgress from 'nprogress';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import calcTotalPrice from '../lib/calcTotalPrice';
import Error from './ErrorMessage';
import User, { CURRENT_USER_QUERY } from './User';

const CREATE_ORDER_MUTATION = gql `
    mutation createOrder($token: String!) {
        createOrder(token: $token) {
            id
            charge
            total
            items {
                id
                title
            }
        }
    }
`;

function totalItems(cart) {
    return cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0);
}

class TakeMyMoney extends Component {
    
    onToken = async ( resp, createOrder ) => {
        NProgress.start();
        console.log('On Token Called!!');
        console.log(resp.id);
        // Manually call the mutation once we have the stripe token
        const order = await createOrder({
            variables: {
                token: resp.id
            }
        }).catch( err => {
            alert(err.message);
        });
        Router.push({
            pathname: '/order',
            query: { id: order.data.createOrder.id },
        });
    }
    
    render(){
        return (
            <User>
                {({ data: { me } }) => (
                    <Mutation 
                        mutation={CREATE_ORDER_MUTATION}
                        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
                    >
                        {(createOrder) => (
                            <StripeCheckout
                                amount={calcTotalPrice(me.cart)}
                                name="Sick Fits"
                                description={`Order of ${totalItems(me.cart)} items`}
                                image={me.cart.length && me.cart[0].item && me.cart[0].item.image}
                                stripeKey="pk_test_JqFUKdctmgzJN9XjMMkt6NKK"
                                currency="USD"
                                email={me.email}
                                token={resp => this.onToken(resp, createOrder)}
                            >
                                {this.props.children}
                            </StripeCheckout>
                        )}
                    </Mutation>
                )}
            </User>
        );
    }
}

export default TakeMyMoney;