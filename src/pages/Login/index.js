import { Card, Button, Checkbox, Form, Input } from "antd"
import logo from '@/assets/logo.jpg'
import "./index.scss"
function Login () {
  //收集表单所有数据
  function onFinish (values) {
    // console.log(values)

  }
  function onFinishFailed (errors) {
    // console.log(errors)
  }
  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        <Form validateTrigger={['onBlur']}
          name="basic"
          labelCol={{
            span: 7,
          }}
          wrapperCol={{
            span: 14,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Account"
            name="account"
            rules={[
              {
                required: true,
                message: 'Please input your phone number!',

              },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: 'Please input your phone number in the correct format!'
              }

            ]}
          >
            <Input placeholder='Please input your phone number' />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password placeholder='Please input your password' />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 2,
              span: 10,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 9,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
export default Login