import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Container, Table, Form } from './styles';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Button from '../../components/Button';


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

            const produto = await axios.get(`http://localhost:5198/api/products/${entrada.productId}`);

            await axios.put(`http://localhost:5198/api/products/${entrada.productId}`, {
                name: produto.data.name,
                manufacturer: produto.data.manufacturer,
                type: produto.data.type,
                description: produto.data.description,
                quantityinstock: (Number(produto.data.quantityInStock) + Number(entrada.quantity))
            });

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

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    return (
        <Container>
            <h4>CADASTRAR NOVA ENTRADA</h4>

            <Form onSubmit={handleSubmit}>
                <Select
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
                </Select>

                <Input
                    type="date"
                    name="dateEntry"
                    value={entrada.dateEntry}
                    onChange={handleInputChange}
                    required
                />
                <Input
                    type="number"
                    name="quantity"
                    value={entrada.quantity}
                    onChange={handleInputChange}
                    min="1"
                    required
                />
                <Button type="submit">Registrar Entrada</Button>
            </Form>
            <h4>ENTRADAS</h4>
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
                            <td>{formatDate(entrada.dateEntry)}</td>
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