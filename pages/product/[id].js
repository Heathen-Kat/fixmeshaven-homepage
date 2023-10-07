import Center from "@/components/Center";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductImages from "@/components/ProductImages";
import Title from "@/components/Title";
import WhiteBox from "@/components/WhiteBox";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/product";
import { styled } from "styled-components";
import FlyingButton from "@/components/FlyingButton";
import CartIcon from "@/components/icons/CartIcon";

const ColWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 40px;
    margin-top: 40px;
    @media screen and (min-width: 768px) {
        display: grid;
        grid-template-columns: .8fr 1.2fr;
      }
      gap: 40px;
      margin: 40px 0;
`;

const PriceRow = styled.div`
  display: flex;
  gap: 200px;
  align-items: center;
  justify-content: space-around;
`;
const Price = styled.span`
  font-size: 1.4rem;
`;

export default function ProductPage({product}) {
    return (
        <>
            <Header />
            <Center>
                <ColWrapper>
                   <WhiteBox>
                       <ProductImages images={product.images} />
                    </WhiteBox> 
                    <div>
                        <Title>{product.title}</Title>
                        <p>{product.description}</p>
                        <PriceRow>
                            <div>
                                <Price>${product.price}</Price>
                            </div>
                            <div>
                                <FlyingButton main _id={product._id} src={product.images?.[0]}>
                                    <CartIcon />Add to cart
                                </FlyingButton>
                            </div>
                        </PriceRow>
                    </div>

                </ColWrapper>
                
            </Center>
            <Footer />
        </>
    );
}

export async function getServerSideProps(context) {
    await mongooseConnect();
    const {id} = context.query;
    const product = await Product.findById(id);
    return {
        props: {
            product: JSON.parse(JSON.stringify(product)),
        }
    }
}