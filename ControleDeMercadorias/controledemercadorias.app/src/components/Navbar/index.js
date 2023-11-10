import React from 'react';

import { Container, StyledList, StyledListItem, StyledLink } from './styles'

const Navbar = () => {
    return (
        <Container>
            <StyledList>
                <StyledListItem>
                    <StyledLink to="/home">Home</StyledLink>
                </StyledListItem>
                <StyledListItem>
                    <StyledLink to="/produtos">Produtos</StyledLink>
                </StyledListItem>
                <StyledListItem>
                    <StyledLink to="/entradas">Entradas</StyledLink>
                </StyledListItem>
                <StyledListItem>
                    <StyledLink to="/saidas">Saidas</StyledLink>
                </StyledListItem>
                <StyledListItem>
                    <StyledLink to="/relatorios">Relatórios</StyledLink>
                </StyledListItem>
            </StyledList>
        </Container>
    );
};

export default Navbar;