import React, { Component, Fragment } from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Error from './ErrorMessage';
import styled from 'styled-components';
import Item from './Item';


const SingleItemStyles = styled.div`
    text-align: center;
    img {
        object-fit: contain;
    }
`;

const SINGLE_ITEM_QUERY = gql `
    query SINGLE_ITEM_QUERY($id: ID!){
        item(where: { id: $id }) {
            id
            title
            price
            description
            image
            largeImage
        }
    }
`;

class SingleItem extends Component {
    render() {
        return (
            <Query 
                query={SINGLE_ITEM_QUERY} 
                variables={{
                    id: this.props.id
                }}
            >
                {({ error, loading, data }) => {
                    if (error) return <Error error={error} />;
                    if (loading) return <p>Loading...</p>;
                    if(!data.item) return <p>No Item Found for {this.props.id}</p>;
                    
                    const item = data.item;
     
                    return (
                        <SingleItemStyles>
                            <Head>
                                <title>Primal Apparel | {item.title}</title>
                            </Head>
                            <Item item={item} key={item.id}/>
                        </SingleItemStyles>
                    );
                }}      
            </Query>
        );
    }
}

export default SingleItem;
export { SINGLE_ITEM_QUERY };