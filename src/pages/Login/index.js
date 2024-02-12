import { Card, Button, Checkbox, Form, Input, message } from "antd"
import logo from '@/assets/logo.jpg'
import "./index.scss"
import { useStore } from "@/store"
import { useNavigate } from "react-router-dom"
function Login () {
  //useStore返回的根Store实例对象中包含组件Store实例对象
  const { loginStore } = useStore()
  const navigate = useNavigate()
  //收集表单所有数据
  async function onFinish (values) {
    console.log(values)
    await loginStore.getToken({
      mobile: values.account,
      code: values.password
    })
    navigate('/', { replace: true })
    message.success('Login successfully!')
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