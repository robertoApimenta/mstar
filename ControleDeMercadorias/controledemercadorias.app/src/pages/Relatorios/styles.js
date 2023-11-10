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
    width: 400px;
`;

export const Table = styled.table`
    border-collapse: collapse;
    border-spacing: 0;
    width: 400px;

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

export const Relatorios = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 24px;
`;

export const Entradas = styled.div`
    display: flex;
    border-top: 2px solid gray;
`;

export const Saidas = styled.div`
    display: flex;
    border-top: 2px solid gray;
`;

export const Chart = styled.div`
    width: 500px;
    margin-left: 100px;
`;