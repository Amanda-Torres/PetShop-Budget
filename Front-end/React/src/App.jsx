import { Button, Form, DatePicker, InputNumber, Card } from 'antd';
import axios from 'axios';

const onFinish = (values) => {
  console.log('Success:', values);
  handleSubmit(values);
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const handleSubmit = async (values) => {
  try {
    const response = await axios.post('http://localhost:4000/orcamento', values);
    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error:', error);
  }
};

// Valores iniciais para os campos do formulário
const initialValues = {
  data: undefined, // Você pode definir uma data inicial aqui, se desejar
  cachorroP: undefined, // Quantidade inicial de cachorros pequenos
  cachorroG: undefined, // Quantidade inicial de cachorros grandes
};


const App = () => (
  <Card
    className='Card'
    title={<h2 className="CardTitle">Orçamento</h2>}
    bordered={true}
    size="small"
    style={{
      width: 500,
      margin: 'auto', 
      marginTop: '50px', 
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
);

export default App;