import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import ColumnChart from './chart';

import axios from 'axios'

import { Container, Form, Table, Relatorios, Entradas, Saidas, Chart } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

const Home = () => {

    const [entradas, setEntradas] = useState([]);
    const [saidas, setSaidas] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [mergedEntries, setMergedEntries] = useState([]);
    const [mergedOutputs, setMergedOutputs] = useState([]);
    const [date, setDate] = useState('');

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
    }, []);

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
    }, []);

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

    const handleSubmit = (event) => {
        event.preventDefault();
        const selectedMonth = new Date(date).getMonth() + 1;

        const filteredEntries = entradas.filter((entry) => {
            const month = new Date(entry.dateEntry).getMonth() + 1;
            return month === selectedMonth;
        });

        const filteredOutputs = saidas.filter((output) => {
            const month = new Date(output.dateOutput).getMonth() + 1;
            return month === selectedMonth;
        });

        const productMap = {};
        produtos.forEach((product) => {
            productMap[product.id] = product.name;
        });

        const entriesWithProductNames = filteredEntries.map((entry) => ({
            ...entry,
            productName: productMap[entry.productId],
        }));

        const outputsWithProductNames = filteredOutputs.map((output) => ({
            ...output,
            productName: productMap[output.productId],
        }));

        const mergedEntries = entriesWithProductNames.reduce((acc, entry) => {
            const existingEntry = acc.find((item) => item.productId === entry.productId);

            if (existingEntry) {
                existingEntry.quantity += entry.quantity;
            } else {
                acc.push({
                    productId: entry.productId,
                    quantity: entry.quantity,
                    dateEntry: entry.dateEntry,
                    productName: entry.productName,
                });
            }

            return acc;
        }, []);

        const mergedOutputs = outputsWithProductNames.reduce((acc, output) => {
            const existingOutput = acc.find((item) => item.productId === output.productId);

            if (existingOutput) {
                existingOutput.quantity += output.quantity;
            } else {
                acc.push({
                    productId: output.productId,
                    quantity: output.quantity,
                    dateOutput: output.dateOutput,
                    productName: output.productName,
                });
            }

            return acc;
        }, []);

        setMergedEntries(mergedEntries)
        setMergedOutputs(mergedOutputs)
    };

    const handleInputChange = (event) => {
        setDate(event.target.value);
    };

    function formatDate(dateString) {
        const date = new Date(dateString);
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${month}-${year}`;
    };

    const generatePDF = () => {
        const content = document.getElementById('meuRelatorio');
        const pdf = new jsPDF('p', 'pt', 'letter');

        html2canvas(content).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            pdf.addImage(imgData, 'PNG', 40, 40, 500, 300);
            pdf.save('relatorio.pdf');
        });
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Input
                    type="date"
                    name="dateEntry"
                    value={date}
                    onChange={handleInputChange}
                    required
                />
                <Button type="submit">Filtrar dados</Button>
                {mergedEntries.length < 1 ? '' :
                    <Button
                        type="button"
                        onClick={generatePDF}
                        contentId="meuRelatorio"
                        style={{marginLeft: '10px', backgroundColor: 'red'}}
                    >
                        Gerar PDF
                    </Button>
                }
                
            </Form>

            
            {mergedEntries.length < 1 ? '' : 
                <Relatorios id="meuRelatorio">
                    <h4>ENTRADAS NO PERÍODO {formatDate(date)}</h4>
                    <Entradas>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Produto</th>
                                    <th>Quantidade</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mergedEntries.map((entrada) => (
                                    <tr key={entrada.productId}>
                                        <td>{entrada.productName}</td>
                                        <td>{entrada.quantity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <Chart>
                            <ColumnChart data={mergedEntries} />
                        </Chart>
                        
                    </Entradas>
                    <h4>SAÍDAS NO PERÍODO {formatDate(date)}</h4>
                    <Saidas>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Produto</th>
                                    <th>Quantidade</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mergedOutputs.map((output) => (
                                    <tr key={output.productId}>
                                        <td>{output.productName}</td>
                                        <td>{output.quantity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <Chart>
                            <ColumnChart data={mergedOutputs} />
                        </Chart>
                    </Saidas>
                </Relatorios>
            }
            
        </Container>
    );
};

export default Home;