import Link from 'next/link';
import Router from 'next/router';
import NProgress from 'nprogress';
import styled from 'styled-components';
import Cart from './Cart';
import Nav from './Nav';
import Search from './Search';
import Primal from '../static/images/primallogo2.png';

Router.onRouteChangeStart = () => {
    NProgress.start();
};
Router.onRouteChangeComplete = () => {
    NProgress.done();
};
Router.onRouteChangeError = () => {
    NProgress.done();
};

const Logo = styled.h1`
    font-size: 2rem;
    margin-left: 2rem;
    margin-right: 1rem;
    position: relative;
    z-index: 2;
    transform: skew(-7deg);
    text-align: center;
    @media (max-width: 1300px){
        margin-top: 1rem;
        text-align: center;
        font-size: 1rem;
    }
    /* iPad Pro Media Query */
    @media only screen
    and (min-device-width : 1024px) 
    and (max-device-width : 1366px) 
    and (orientation : landscape) { 
        img {
            height: 100px;
            margin: 20px 20px 0 20px;
        }
    }

    /* iPad Media Query */
    @media only screen 
    and (max-device-width : 768px) 
    and (max-device-height : 1024px)
    and (orientation : portrait)
    and (-webkit-min-device-pixel-ratio: 2) { 
        img {
            height: 100px;
        }
    }
    @media only screen 
    and (min-device-width : 768px) 
    and (max-device-width : 1024px) 
    and (orientation : landscape) { 
        img {
            height: 100px;
            margin: 0;
        }
    }

    /* iPhone X Media Query */
    @media only screen  
    and (max-device-height : 812px)
    and (max-device-width : 812px) {
        img {
            height: 65px;
        }
    }
`;

const StyledHeader = styled.header`
    .bar {
        border-bottom: 10px solid ${props => props.theme.black};
        display: grid;
        grid-template-columns: auto 1fr;
        justify-content: space-between;
        align-items: stretch;
        @media (max-width: 1300px){
            grid-template-columns: 1fr;
            justify-content: center;
        }
    }
    .sub-bar {
        display: grid;
        grid-template-columns: 1fr auto;
        border-bottom: 1px solid ${props => props.theme.lightgrey};
    }
`;

const Header = () => (
    <StyledHeader>
        <div className="bar">
            <Logo>
                <Link href="/">
                    <img src={Primal} alt="Primal Apparel" />
                </Link>
            </Logo>
            <Nav /> 
        </div>
        <div className="sub-bar">
            <Search />
        </div>
        <Cart />
    </StyledHeader>
)

export default Header;