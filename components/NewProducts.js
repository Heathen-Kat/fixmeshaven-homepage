import styled from "styled-components";
import Center from "@/components/Center";
import ProductsGrid from "@/components/ProductsGrid";

const Title = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  margin:30px 0 20px;
  font-weight: normal;
  @media screen and (min-width: 768px){
    justify-content: flex-start;
}
`;

export default function NewProducts({products}) {
  return (
    <Center>
      <Title>Featured highlights</Title>
      <ProductsGrid products={products} />
    </Center>
  );
}