import styled from 'styled-components';

import { Link } from 'react-router-dom';

export const Container = styled.div`
    min-width: 120px;
    height: 100vh;
    display: flex;
    background: #504da1;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4);
    
`;

export const StyledList = styled.ul`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    list-style: none;
    padding: 0;
    margin: 0;
    
`;

export const StyledListItem = styled.li`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    height: 40px;
    border: 1px solid #ccc;
    cursor: pointer;
    transition: background-color color 0.3s;
    
    &:hover {
        background-color: #6963ba;
        color: #504da1;
    }

    &.active {
        color: #ff5722;
    }
    
`;


export const StyledLink = styled(Link)`
    text-decoration: none;
    color: #fff;
    display: flex;
    align-items: center; 
`;