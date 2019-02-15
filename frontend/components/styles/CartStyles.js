import styled from 'styled-components';

const CartStyles = styled.div`
  padding: 20px;
  position: relative;
  background: white;
  position: fixed;
  height: 100%;
  top: 0;
  right: 0;
  width: 40%;
  min-width: 500px;
  bottom: 0;
  transform: translateX(100%);
  transition: all 0.3s;
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.2);
  z-index: 5;
  display: grid;
  grid-template-rows: auto 1fr auto;
  ${props => props.open && `transform: translateX(0);`};
  header {
    border-bottom: 5px solid ${props => props.theme.black};
    margin-bottom: 2rem;
    padding-bottom: 2rem;
  }
  footer {
    border-top: 10px double ${props => props.theme.black};
    margin-top: 2rem;
    padding-top: 2rem;
    display: grid;
    grid-template-columns: auto auto;
    align-items: center;
    font-size: 3rem;
    font-weight: 900;
    p {
      margin: 0;
    }
  }
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    overflow: scroll;
  }

  /* iPhoneX Media Query */
  @media only screen 
    and (max-device-width : 812px)
    and (orientation: portrait) {
      height: 100%;
      min-width: 100%;
    }
    @media only screen 
    and (max-device-width : 812px)
    and (orientation: landscape) {
      h3 {
        font-size: 2rem;
      }
      p {
        font-size: 1.2rem;
      }
      footer > p {
        font-size: 2rem;
      }
      button.fBtWCZ {
        font-size: 1.5rem;
      }
    }

    /* iPhone 5 Media Query */
    @media only screen 
    and (max-device-width : 568px)
    and (orientation : landscape) {
      header {
        margin-bottom: 1rem;
        padding-bottom: 0;
      }
      footer {
        margin-top: 1rem;
        padding-top: 0;
      }
    }
    @media only screen 
    and (max-device-width : 320px)
    and (orientation : portrait) {
      h3 {
        font-size: 2rem;
      }
      footer > p {
        font-size: 2rem;
      }
      button.fBtWCZ {
        font-size: 1.5rem;
      }
    }
`;

export default CartStyles;
