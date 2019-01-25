import React from 'react';
import styled from 'styled-components';
import formatMoney from '../lib/formatMoney';

const OrderSingleItemStyle = styled.div`
    .order-item {
    border-bottom: 1px solid ${props => props.theme.offWhite};
    display: grid;
    grid-template-columns: 300px 1fr;
    align-items: center;
    grid-gap: 2rem;
    margin: 2rem 0;
    padding-bottom: 2rem;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
`;

const OrderItems = (props) => {
    console.log("Order Items props:", props);
    return (
        <OrderSingleItemStyle>
            <div className="items">
                {props.items.map(item => (
                    <div className="order-item" key={item.id}>
                        <img src={item.image} alt={item.title} />
                        <div className="item-details">
                            <h2>{item.title}</h2>
                            <p>Qty: {item.quantity}</p>
                            <p>Each: {formatMoney(item.price)}</p>
                            <p>SubTotal: {formatMoney(item.price * item.quantity)}</p>
                            <p>{item.description}</p> 
                        </div>
                    </div>
                ))}
            </div>
        </OrderSingleItemStyle>     
    );
}

export default OrderItems;