import styled from 'styled-components';

export const Container = styled.div`
 width: 100%;
    text-align: center;
    padding: 20px;
    margin: 20px;
    display: flex;
    flex-direction: column;

    h4 {
        margin-bottom: 20px;
    }
`;

export const Form = styled.form`
    display: flex;
    flex-direction: row;
`;

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;

    thead {
        background-color: #504da1;
        color: #fff;
    }

    th, td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
    }

    tr:nth-child(even) {
        background-color: #f2f2f2;
    }

    tbody tr:hover {
        background-color: #ddd;
    }
`;