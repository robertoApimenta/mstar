import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Container, Table } from './styles';

const Entradas = () => {

    const [entradas, setEntradas] = useState([]);

    const [produtos, setProdutos] = useState([]);

    const [entrada, setEntrada] = useState({
        productId: '',
        dateEntry: '',
        quantity: 0,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEntrada({
            ...entrada,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            await axios.post('http://localhost:5198/api/product-entry', entrada);

            setEntrada({
                productId: '',
                dateEntry: '',
                quantity: 0,
            });


        } catch (error) {
            console.error('Erro ao adicionar entrada:', error);
        }
    };

    useEffect(() => {
        const fetchEntradas = async () => {
            try {
                const response = await axios.get('http://localhost:5198/api/product-entry');
                setEntradas(response.data);
            } catch (error) {
                console.error('Erro ao buscar entradas:', error);
            }
        };

        fetchEntradas();
    }, [entrada]);

    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                const response = await axios.get('http://localhost:5198/api/products');
                setProdutos(response.data);
            } catch (error) {
                console.error('Erro ao buscar produtos:', error);
            }
        };

        fetchProdutos();
    }, []);

    const getProductName = (productId) => {
        const produto = produtos.find((p) => p.id === productId);
        return produto ? produto.name : 'Produto não encontrado';
    };

    return (
        <Container>
            Entradas

            <form onSubmit={handleSubmit}>
                <select
                    name="productId"
                    value={entrada.productId}
                    onChange={handleInputChange}
                    required
                >
                    <option value="">Selecione um produto</option>
                    {produtos.map((produto) => (
                        <option key={produto.id} value={produto.id}>
                            {produto.name}
                        </option>
                    ))}
                </select>
                <input
                    type="date"
                    name="dateEntry"
                    value={entrada.dateEntry}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="number"
                    name="quantity"
                    value={entrada.quantity}
                    onChange={handleInputChange}
                    min="0"
                    required
                />
                <button type="submit">Registrar Entrada</button>
            </form>

            <Table>
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Produto</th>
                        <th>Quantidade</th>
                    </tr>
                </thead>
                <tbody>
                    {entradas.map((entrada) => (
                        <tr key={entrada.id}>
                            <td>{entrada.dateEntry}</td>
                            <td>{getProductName(entrada.productId)}</td>
                            <td>{entrada.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default Entradas;