import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Container, Table } from './styles';

const Saidas = () => {

    const [saidas, setSaidas] = useState([]);

    const [produtos, setProdutos] = useState([]);

    const [saida, setSaida] = useState({
        productId: '',
        dateOutput: '',
        quantity: 0,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSaida({
            ...saida,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const produto = await axios.get(`http://localhost:5198/api/products/${saida.productId}`);

            if (produto.data.quantityInStock < saida.quantity) {
                alert(`não pode dar saída, quantidade em estoque insuficiente. Atualmente há ${produto.data.quantityInStock}`)
                setSaida({
                    productId: '',
                    dateOutput: '',
                    quantity: 0,
                });
            } else {
                await axios.post('http://localhost:5198/api/product-output', saida);
                setSaida({
                    productId: '',
                    dateOutput: '',
                    quantity: 0,
                });
            }
        } catch (error) {
            console.error('Erro ao adicionar saida:', error);
        }
    };

    useEffect(() => {
        const fetchEntradas = async () => {
            try {
                const response = await axios.get('http://localhost:5198/api/product-output');
                setSaidas(response.data);
            } catch (error) {
                console.error('Erro ao buscar entradas:', error);
            }
        };

        fetchEntradas();
    }, [saida]);

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
            Saídas

            <form onSubmit={handleSubmit}>
                <select
                    name="productId"
                    value={saida.productId}
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
                    name="dateOutput"
                    value={saida.dateOutput}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="number"
                    name="quantity"
                    value={saida.quantity}
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
                    {saidas.map((entrada) => (
                        <tr key={entrada.id}>
                            <td>{entrada.dateOutput}</td>
                            <td>{getProductName(entrada.productId)}</td>
                            <td>{entrada.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default Saidas;