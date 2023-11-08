import styled from 'styled-components';

import { Link } from 'react-router-dom';

export const Container = styled.div`
    width: 100%;
    max-width: 120px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #95d4fc;
`;

export const StyledList = styled.ul`
    height: 100%;
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
`;

export const StyledListItem = styled.li`
    display: flex;
    align-items: center;
    height: 40px;
    border: 1px solid #ccc;
    cursor: pointer;
    transition: background-color color 0.3s;

    &:hover {
        background-color: #007bff;
    }
    &.active {
        color: #ff5722;
    }
`;

export const StyledLink = styled(Link)`
    text-decoration: none;
    color: #333;
    display: flex;
    align-items: center;  
`;