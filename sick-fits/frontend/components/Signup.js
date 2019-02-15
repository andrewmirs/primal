import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import Router from 'next/router';
import gql from 'graphql-tag';
import Error from './ErrorMessage';
import Form from './styles/Form';
import { CURRENT_USER_QUERY } from './User';

const SIGNUP_MUTATION = gql`
    mutation SIGNUP_MUTATION($email: String!, $name: String!, $password: String!) {
        signup(email: $email, name: $name, password: $password) {
            id
            email
            name
        }
    }
`;

class Signup extends Component {

    state = {
        name: '',
        email: '',
        password: '',
    }

    saveToState = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render(){
        return(
            <Mutation 
                mutation={SIGNUP_MUTATION} 
                variables={this.state}
                refetchQueries={[{ query: CURRENT_USER_QUERY }]}
            >
                {(signup, { error, loading }) => (
                    <Form 
                        method="post" 
                        onSubmit={async (event) => {
                            event.preventDefault();
                            await signup();
                            this.setState({ name: '', email: '', password: '' });
                            Router.push({
                                pathname: '/items',
                            });
                        }}
                    >
                        <fieldset disabled={loading} aria-busy={loading}>
                            <h2>Sign Up for An Account</h2>
                            <Error error={error} />
                            <label htmlFor="email">
                                Email
                                <input 
                                    type="email" 
                                    name="email" 
                                    placeholder="email" 
                                    value={this.state.email} 
                                    onChange={this.saveToState} 
                                />
                            </label>
                            <label htmlFor="name">
                                Name
                                <input 
                                    type="text" 
                                    name="name" 
                                    placeholder="name" 
                                    value={this.state.name} 
                                    onChange={this.saveToState} 
                                />
                            </label>
                            <label htmlFor="password">
                                Password
                                <input 
                                    type="password" 
                                    name="password" 
                                    placeholder="password" 
                                    value={this.state.password} 
                                    onChange={this.saveToState} 
                                />
                            </label>

                            <button type="submit">Sign Up!</button>
                        </fieldset>
                    </Form>
                )
                }
            </Mutation>
        );
    }
}
export default Signup;
export { SIGNUP_MUTATION };