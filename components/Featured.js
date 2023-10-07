import Center from "./Center";
import styled from "styled-components";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import { CartContext } from "./CartContext";
import { useContext, useState } from "react";
import CartIcon from "./icons/CartIcon";
import ProductImages from "./ProductImages";


const Bg =styled.div`
    background-color: #222;
    color:#fff;
    padding: 0px;
    @media screen and (min-width: 768px){
      padding: 0;
  }
    `;
const Title = styled.h1`
    margin:0;
    font-weight:normal;
    font-size: 2.7rem;
`;
const Desc = styled.p`
 color:#aaa;
 font-size:.9rem;
`;
const ColumnsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    div:nth-child(1) {
      order: 2;
    }
    gap: 40px;
    img {
        max-width: 100%;
    }
    @media screen and (min-width: 768px) {
      display: grid;
      grid-template-columns: .9fr 1.1fr;
      div:nth-child(1) {
        order: 0;
      }
    }
`;
const Column = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
`;
const ButtonsWrapper = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 25px;
    
`;
export default function Featured({product}) {
    const {addProduct} = useContext(CartContext);
    function addFeaturedToCart() {addProduct(product._id)};
    return (
      <Bg>
        <Center>
          <ColumnsWrapper>
            <Column>
              <div>
                <Title>{product.title}</Title>
                <Desc>{product.description}</Desc>
                <ButtonsWrapper>
                  <ButtonLink href={'/products'} outline={1} white={1}>See More</ButtonLink>                  
                </ButtonsWrapper>
              </div>
            </Column>
            <Column>
              <ProductImages images={product.images} />
                
            </Column>
            </ColumnsWrapper>                    
            </Center>
        </Bg>
    );
}

/* Added after See More </Buttonlink>

<Button primary onClick={addFeaturedToCart}>
                    <CartIcon />
                    Add to cart
                  </Button>*/

/* <img src="https://i.ibb.co/HYjN3Y5/20230523-182201.jpg" alt="" /> */