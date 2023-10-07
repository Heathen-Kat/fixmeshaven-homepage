const { createGlobalStyle } = require(`styled-components`);
const {CartContextProvider} = require(`@/components/CartContext`);

const GlobalStyles = createGlobalStyle`
  body{
    background-color: #eee;
    padding:0;
    margin:0;
    font-family: 'Roboto',sans-serif;
  }
`;

export default function App({ Component, pageProps }) {
  return ( 
    <>
      <GlobalStyles />
      <CartContextProvider>
        <Component {...pageProps} />
      </CartContextProvider>
    </>
  );
}
