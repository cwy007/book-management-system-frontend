import { Button, Form, Input } from "antd";
import "./index.css";

const FormItem = Form.Item;
const { Password } = Input;

interface RegisterUser {
  username: string;
  password: string;
  password2: string;
}

const onFinish = (values: RegisterUser) => {
  console.log(values);
};

const layout1 = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const layout2 = {
  labelCol: { span: 0 },
  wrapperCol: { span: 24 },
};

function Register() {
  return (
    <div id="register-container">
      <h1>图书管理系统</h1>
      <Form {...layout1} onFinish={onFinish} colon={false} autoComplete="off">
        <FormItem
          label="用户名"
          name="username"
          rules={[{ required: true, message: "请输入用户名!" }]}
        >
          <Input />
        </FormItem>

        <FormItem
          label="密码"
          name="password"
          rules={[{ required: true, message: "请输入密码!" }]}
        >
          <Password />
        </FormItem>

        <FormItem
          label="确认密码"
          name="password2"
          rules={[{ required: true, message: "请输入确认密码!" }]}
        >
          <Password />
        </FormItem>

        <FormItem {...layout2}>
          <div className="links">
            <a href="/login">已有账号？去登录</a>
          </div>
        </FormItem>

        <FormItem {...layout2}>
          <Button block type="primary" htmlType="submit">
            注册
          </Button>
        </FormItem>
      </Form>
    </div>
  );
}

export default Register;
