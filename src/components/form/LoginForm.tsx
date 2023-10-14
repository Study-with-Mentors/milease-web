import { Divider, Form } from "antd";
import styled from "./LoginSignupForm.module.scss";
import GoogleIcon from "../../assets/google_icon.png";
import AuthenticateForm, { FIELD_TYPES } from "./AuthenticateForm";

export type LoginFormProps = {};

const LoginForm = ({ }: LoginFormProps) => {

  const fields = [
    {
      type: FIELD_TYPES.TEXT,
      fieldProps: {
        placeholder: "Email",
        name: "email",
        rules: [
          { required: true, message: "Email must not empty!" },
          {
            type: "email",
            message: "Please input valid email!",
          },
        ],
        style: {
          width: "500px",
          height: "50px",
        },
        onChange: () => { },
      },
      cols: 12,
    },
    {
      type: FIELD_TYPES.PASSWORD,
      fieldProps: {
        placeholder: "Password",
        name: "password",
        rules: [{ required: true, message: "Password must not empty!" }],
        style: {
          width: "500px",
          height: "50px",
        },
        onChange: () => { },
      },
      cols: 12,
    },
    {
      type: FIELD_TYPES.BUTTON,
      fieldProps: {
        type: "primary",
        htmlType: "submit",
        text: "Login",
        style: {}
      },
      formProps: { wrapperCol: { span: 24, offset: 0 } },
      cols: 12,
    },
  ];

  return (
    <>
      <Form
        name="basic"
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        layout="vertical"
        autoComplete="off"
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <AuthenticateForm fields={fields} />
        <div className={styled["footer"]}>
          <Divider className={styled["divider"]}>Or</Divider>
          <div className={styled["button-wrapper"]}>
            <button className={styled["btn"]}>
              <img className={styled["icon"]} src={GoogleIcon} alt="" /> Login with Google
            </button>
          </div>
        </div>
      </Form>
    </>
  );
};

export default LoginForm;
