import styled from 'styled-components';

export default styled.select`
    width: 100%;
    min-width: 250px;
    height: 36px; 
    margin: 4px;
    background: #fff;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4);
   
    border-radius: 4px;
    border: 2px solid #fff;
    outline: none;
    padding: 0 16px;
    font-size: 16px;
    transition: border-color 0.2s ease-in;

    &:focus {
        border: 2px solid #504da1;
    }
`;