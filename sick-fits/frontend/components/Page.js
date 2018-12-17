import React, { Component } from 'react';
import Header from './Header';

class Page extends Component {
    render(){
        console.log("Props in Page component:", this.props);
        return (
            <div>
                <Header />
                {this.props.children}
            </div>
        );
    }
}
 
export default Page;