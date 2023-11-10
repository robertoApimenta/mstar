import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Input from '../../components/Input';
import Select from '../../components/Select';
import Button from '../../components/Button';

import { Container, Table, Form } from './styles';

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
                await axios.put(`http://localhost:5198/api/products/${saida.productId}`, {
                    name: produto.data.name,
                    manufacturer: produto.data.manufacturer,
                    type: produto.data.type,
                    description: produto.data.description,
                    quantityinstock: (Number(produto.data.quantityInStock) - Number(saida.quantity))
                });
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
        const fetchSaidas = async () => {
            try {
                const response = await axios.get('http://localhost:5198/api/product-output');
                setSaidas(response.data);
            } catch (error) {
                console.error('Erro ao buscar entradas:', error);
            }
        };

        fetchSaidas();
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

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    return (
        <Container>
            <h4>CADASTRAR NOVA SAÍDA</h4>

            <Form onSubmit={handleSubmit}>
                <Select
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
                </Select>
                <Input
                    type="date"
                    name="dateOutput"
                    value={saida.dateOutput}
                    onChange={handleInputChange}
                    required
                />
                <Input
                    type="number"
                    name="quantity"
                    value={saida.quantity}
                    onChange={handleInputChange}
                    min="1"
                    required
                />
                <Button type="submit">Registrar Entrada</Button>
            </Form>

            <h4>SAÍDAS</h4>
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
                            <td>{formatDate(entrada.dateOutput)}</td>
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