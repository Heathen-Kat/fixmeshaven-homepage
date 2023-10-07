import styled from "styled-components";
import ProductBox from "./ProductBox";

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  padding: 0 75px;
  gap: 30px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr ;
    padding: 0;
    gap: 20px;
  }
`;

export default function ProductsGrid({products}) {
  return (
    <StyledProductsGrid>
      {products?.length > 0 && products.map(products => (
        <ProductBox key={products._id} {...products} />
      ))}
    </StyledProductsGrid>
  );
}

/*export default function NewProducts({products}) {
  return (
    <StyledProductsGrid>
      {products?.length > 0 && products.map(product => (
        <div>{product.title}</div>
      ))}
    </StyledProductsGrid>
  )
}*/