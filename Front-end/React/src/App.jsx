import { useState } from 'react';
import { Button, Form, DatePicker, InputNumber, Card } from 'antd';
import axios from 'axios';

const App = () => {
  const [dataList, setDataList] = useState([]);

const onFinish = (values) => {
  handleSubmit(values);
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const handleSubmit = async (values) => {
  try {
    const response = await axios.post('http://localhost:4000/orcamento', values);
    const data = {
      nome: response.data?.nomePetShop,
      menorPreco: response.data?.menorPreco,
      data: values.data,
      cachorroP: values.cachorroP,
      cachorroG: values.cachorroG,
    } 
    setDataList([data, ...dataList]);
  } catch (error) {
    console.error('Error:', error);
  }
};

const handleRemoveTopCard = () => {
  setDataList(dataList.slice(1));
};

const initialValues = {
  data: undefined,
  cachorroP: undefined,
  cachorroG: undefined,
};

return (
<div style={{ display: 'flex', alignItems: dataList.length === 0 ? 'center' : 'start', justifyContent: dataList.length > 0 ? 'space-around' : 'center', width: '100%', height: '97vh' }}>
  <Card
    className='Card'
    title={<h2 className="CardTitle">Orçamento</h2>}
    bordered={true}
    size="small"
    style={{
      width: '500px',
      height: '300px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    }}
  >
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 400, 
        margin: 'auto',
      }}
      initialValues={initialValues}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Escolha uma data:"
        name="data"
      >
        <DatePicker format='DD/MM/YYYY'/>
      </Form.Item>

      <Form.Item
        label="Cachorros pequeno:"
        name="cachorroP"
      >
        <InputNumber />
      </Form.Item>

      <Form.Item
        label="Cachorros grandes:"
        name="cachorroG"
      >
        <InputNumber />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 8,
        }}
        style={{
          textAlign: 'center',
        }}
      >
        <Button type="primary" htmlType="submit" >
          Enviar
        </Button>
      </Form.Item>
    </Form>
  </Card>

  <div>
    {dataList.map((data, index) => (
      <Card
        key={index}
        title={`Dados #${dataList.length - index}`}
        style={{ width: 300, margin: '20px 0' }}
        extra={index === 0 ? <Button onClick={handleRemoveTopCard}>Remover</Button> : null}
      >
        <p>Nome do Pet Shop: {data.nome}</p>
        <p>Data: {new Date(data.data).toLocaleDateString("pt-br")}</p>
        <p>Qnt. cachorro(s) pequeno(s): {data.cachorroP}</p>
        <p>Qnt. cachorro(s) grande(s): {data.cachorroG}</p>
        <p>Melhor preço: {data.menorPreco}</p>
      </Card>
    ))}
  </div>

  </div>
);
};

export default App;
