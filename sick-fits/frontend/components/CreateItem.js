import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import Router from 'next/router';
import gql from 'graphql-tag';
import Form from './styles/Form';
import Error from './ErrorMessage';
import formatMoney from '../lib/formatMoney';

const CREATE_ITEM_MUTATION = gql`
    mutation CREATE_ITEM_MUTATION(
        $title: String!
        $description: String!
        $price: Int!
        $image: String
        $largeImage: String
    ) {
        createItem(
            title: $title
            description: $description
            price: $price
            image: $image
            largeImage: $largeImage
        ) {
            id
        }
    }
`;

class CreateItem extends Component {
    
    state = {
        title: 'Irvings 3si',
        description: 'dope shoes',
        image: 'ki.jpg',
        largeImage: 'large-ki.jpg',
        price: 300,
    };

    handleChange = (event) => {
        const { name, type, value } = event.target;
        const val = type === 'number' ? parseFloat(value) : value
        
        this.setState({ [name]: val });
    };

    uploadFile = async (event) => {
        console.log('Uploading file...');
        const files = event.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'sickfits');

        const res = await fetch('https://api.cloudinary.com/v1_1/dvwds2ovq/image/upload', {
            method: 'POST',
            body: data
        });

        const file = await res.json();
        console.log(file);

        this.setState({
            image: file.secure_url,
            largeImage: file.eager[0].secure_url
        });
    };
    
    render(){
        return (
            <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
                {(createItem, { loading, error }) => (

                    <Form onSubmit={async (event) => {
                        // Stop the form from submitting
                        event.preventDefault();
                        // Call the muation
                        const res = await createItem();
                        // Change them to the single item page
                        console.log(res);
                        Router.push({
                            pathname: '/item',
                            query: { id: res.data.createItem.id }
                        })
                    }}>
                        <Error error={error} /> 
                        <h2>Sell an Item.</h2>
                        <fieldset disabled={loading} aria-busy={loading}>
                            <label htmlFor="file">
                                Image
                                <input
                                    type="file" 
                                    id="file" 
                                    name="file" 
                                    placeholder="Upload an image"
                                    onChange={this.uploadFile}
                                    required
                                />
                                {this.state.image && <img width="200px" src={this.state.image} alt="Upload Preview" />}
                            </label>
                            
                            <label htmlFor="title">
                                Title
                                <input
                                    type="text" 
                                    id="title" 
                                    name="title" 
                                    placeholder="Title"
                                    value={this.state.title}
                                    onChange={this.handleChange}
                                    required
                                />
                            </label>

                            <label htmlFor="price">
                                Price
                                <input
                                    type="number" 
                                    id="price" 
                                    name="price" 
                                    placeholder="Price"
                                    value={this.state.price}
                                    onChange={this.handleChange}
                                    required
                                />
                            </label>

                            <label htmlFor="description">
                                Description
                                <textarea
                                    id="description" 
                                    name="description" 
                                    placeholder="Enter a description.."
                                    value={this.state.description}
                                    onChange={this.handleChange}
                                    required
                                />
                            </label>
                            <button type="submit">Submit</button>
                        </fieldset>
                    </Form>

                )}
            </Mutation>
        );
    }
}

export default CreateItem;
export { CREATE_ITEM_MUTATION };