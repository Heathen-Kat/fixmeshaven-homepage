import styled from "styled-components";

const Title = styled.h1`
  display: flex;  
  justify-content: center;
  font-size: 1.5em;
  @media screen and (min-width: 768px) {
    justify-content: flex-start;
  }
`;

export default Title;