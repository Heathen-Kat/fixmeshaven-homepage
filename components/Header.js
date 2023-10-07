import Link from "next/link";
import styled from "styled-components"
import Center from "@/components/Center";
import {useContext, useState} from "react";
import {CartContext} from "@/components/CartContext";
import BarsIcon from "./icons/Bars";

const StyledHeader = styled.header`
    background-color: #222;
    width: 100%;
`;
const Logo = styled(Link)`
    color:#ffff;
    @import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap');
    text-decoration:none;
    font-family: 'Permanent Marker', cursive;
`;
const NavLink = styled(Link)`
    display: block;
    @import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap');
    text-decoration:none;
    font-family: 'Permanent Marker', cursive;
    color:#aaa;
    text-decoration: none;
    @media screen and (min-width: 768px){
        padding: 0;
    }
`;
const StyledNav = styled.nav`
  ${props => props.mobilenavactive ? `
    display: flex;
  ` : `
    display: none;
  `}
  flex-direction: column;
  align-items: center;
  gap: 15px;
  position: absolute;
  top: 50px;
  bottom: 50;
  left: 0;
  right: 0;
  padding: 20px 20px 20px;
  background-color: #222;
  @media screen and (min-width: 768px) {
    display: flex;
    flex-direction: row;
    position: static;
    padding: 0 30px;
  }
`;
const Wrapper = styled.div`
${props => props.mobilenavactive ? `
    padding: 30px 0 80px 0;
  ` : `
    padding: 30px 0 22.5px 0;
  `}
    display: flex;
    justify-content: space-between;
    @media screen and (min-width: 768px) {
        padding: 30px 0;
    }
    
`;

const NavButton = styled.button`
  background-color: transparent;
  width: 60px;
  height: 60px;
  border:0;
  color: white;
  cursor: pointer;
  position: relative;
  z-index: 3;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;


export default function Header() {
    const {cartProducts} = useContext(CartContext);
    const [mobilenavactive,setmobilenavactive] = useState (false);
    return(
        <StyledHeader>
            <Center>
                <Wrapper mobilenavactive={mobilenavactive}>
                    <Logo href={'/'}>FixMes Haven</Logo>
                    <StyledNav mobilenavactive={mobilenavactive}>                        
                        <NavLink href={'/'}>Home</NavLink>
                        <NavLink href={'/products'}>All products</NavLink>
                        <NavLink href={'/cart'}>Cart ({cartProducts?.length})</NavLink>
                    </StyledNav>
                    <NavButton onClick={() => setmobilenavactive(prev => !prev)}>
                        <BarsIcon />
                    </NavButton>
                </Wrapper>
           </Center>
        </StyledHeader>
    );
}
/* <NavLink href={'/categories'}>Categories</NavLink>
 <NavLink href={'/account'}>Account</NavLink> */