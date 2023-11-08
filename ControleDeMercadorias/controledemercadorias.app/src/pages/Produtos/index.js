import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Container, Table, Form } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button'

const Produtos = () => {

    const [produtos, setProdutos] = useState([]);
    const [productFieldsOK, setProductFieldsOK] = useState(true);

    const [novoProduto, setNovoProduto] = useState({
        name: '',
        manufacturer: '',
        type: '',
        description: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'name' && value.length > 3) {
            setProductFieldsOK(false)
        } else {
            setProductFieldsOK(true)
        }
        setNovoProduto({
            ...novoProduto,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5198/api/products', novoProduto);

            setProdutos([...produtos, response.data]);

            setNovoProduto({
                name: '',
                manufacturer: '',
                type: '',
                description: '',
            });
        } catch (error) {
            console.error('Erro ao adicionar produto:', error);
        }
    };

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

    return (
        <Container>
            <h4>CADASTRAR NOVO PRODUTO</h4>

            <Form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    name="name"
                    value={novoProduto.name}
                    onChange={handleInputChange}
                    placeholder="Nome do Produto"
                    required
                />
                <Input
                    type="text"
                    name="manufacturer"
                    value={novoProduto.manufacturer}
                    onChange={handleInputChange}
                    placeholder="Fabricante"
                />
                <Input
                    type="text"
                    name="type"
                    value={novoProduto.type}
                    onChange={handleInputChange}
                    placeholder="Tipo"
                />
                <Input
                    type="text"
                    name="description"
                    value={novoProduto.description}
                    onChange={handleInputChange}
                    placeholder="Descrição"
                />
                <Button type="submit" disabled={productFieldsOK}>Adicionar Produto</Button>
            </Form>

            <h4>PRODUTOS</h4>
            <Table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Fabricante</th>
                        <th>Tipo</th>
                        <th>Descrição</th>
                        <th>Quantidade em estoque</th>
                    </tr>
                </thead>
                <tbody>
                    {produtos.map((produto) => (
                        <tr key={produto.id}>
                            <td>{produto.name}</td>
                            <td>{produto.manufacturer}</td>
                            <td>{produto.type}</td>
                            <td>{produto.description}</td>
                            <td>{produto.quantityInStock}</td>
                        </tr>
                    ))}
                </tbody>
            </Table> 
        </Container>
    );
};

export default Produtos;