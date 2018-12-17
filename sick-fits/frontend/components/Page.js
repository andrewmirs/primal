import React, { Component } from 'react';
import Header from './Header';
import Meta from './Meta';

class Page extends Component {
    render(){
        console.log("Props in Page component:", this.props);
        return (
            <div>
                <Meta />
                <Header />
                {this.props.children}
            </div>
        );
    }
}
 
export default Page;