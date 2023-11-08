import styled from 'styled-components';

export default styled.button`
    width: 100%;
    min-width: 250px;
    background: #504da1;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4);
    height: 35px;
    border-radius: 4px;
    border: none;
    outline: none;
    font-size: 16px;
    transition: background-color 0.2s ease-in;
    color: #fff;
    font-weight: bold;

    margin-top: 5px;

    &:hover {
        background: #6963ba;
    }

    &:active {
        background: #373788;
    }

    &[disabled] {
        background: #9b9b9b;
        cursor: default;
    }
`;