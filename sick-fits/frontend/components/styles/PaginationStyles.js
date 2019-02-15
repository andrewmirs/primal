import styled from 'styled-components';

const PaginationStyles = styled.div`
  text-align: center;
  display: inline-grid;
  grid-template-columns: repeat(4, auto);
  align-items: stretch;
  justify-content: center;
  align-content: center;
  margin: 2rem 0;
  border: 1px solid ${props => props.theme.lightgrey};
  border-radius: 10px;
  & > * {
    margin: 0;
    padding: 15px 30px;
    border-right: 1px solid ${props => props.theme.lightgrey};
    &:last-child {
      border-right: 0;
    }
  }
  a[aria-disabled='true'] {
    color: grey;
    pointer-events: none;
  }

  /* iPhone X Media Query */
  @media only screen 
    and (max-device-width : 812px) {
      grid-template-columns: repeat(4, 82px);
      font-size: 1rem;
      p {
        padding: 15px 25px;
      }
    }

  /* iPhone 5 Media Query */
  @media only screen 
    and (max-device-width : 320px)
    and (orientation : portrait) {
      grid-template-columns: repeat(4, 70px);
      font-size: 1rem;
      p {
        padding: 15px 17px;
      }
      a {
        padding: 15px 20px;
      }
    }
`;

export default PaginationStyles;
