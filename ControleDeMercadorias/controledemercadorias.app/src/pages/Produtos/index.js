import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Container, Table } from './styles';

const Produtos = () => {

    const [produtos, setProdutos] = useState([]);

    const [novoProduto, setNovoProduto] = useState({
        name: '',
        manufacturer: '',
        type: '',
        description: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
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
            Produtos

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={novoProduto.name}
                    onChange={handleInputChange}
                    placeholder="Nome do Produto"
                    required
                />
                <input
                    type="text"
                    name="manufacturer"
                    value={novoProduto.manufacturer}
                    onChange={handleInputChange}
                    placeholder="Fabricante"
                    required
                />
                <input
                    type="text"
                    name="type"
                    value={novoProduto.type}
                    onChange={handleInputChange}
                    placeholder="Tipo"
                />
                <input
                    type="text"
                    name="description"
                    value={novoProduto.description}
                    onChange={handleInputChange}
                    placeholder="Descrição"
                />
                <button type="submit">Adicionar Produto</button>
            </form>

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