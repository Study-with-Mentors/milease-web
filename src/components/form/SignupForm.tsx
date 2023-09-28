import { Form } from "antd";
import AuthenticateForm, { FIELD_TYPES } from "./AuthenticateForm";

export type LoginFormProps = {};

const SignupForm = ({ }: LoginFormProps) => {

  const fields = [
    {
      type: FIELD_TYPES.TEXT,
      fieldProps: {
        placeholder: "First Name",
        name: "firstName",
        rules: [
          { required: true, message: "First name must not empty!" },
        ],
        style: {
          width: "500px",
          height: "40px",
        },
        onChange: (value: any) => { },
      },
      cols: 4,
    },
    {
      type: FIELD_TYPES.TEXT,
      fieldProps: {
        placeholder: "Last Name",
        name: "lastName",
        rules: [
          { required: true, message: "Last name must not empty!" },
        ],
        style: {
          width: "500px",
          height: "40px",
        },
        onChange: (value: any) => { },
      },
      cols: 4,
    },
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
          height: "40px",
        },
        onChange: (value: any) => { },
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
          height: "40px",
        },
        onChange: (value: any) => { },
      },
      cols: 12,
    },
    {
      type: FIELD_TYPES.PASSWORD,
      fieldProps: {
        placeholder: "Confirm Password",
        name: "confirm",
        rules: [{ required: true, message: "Password must not empty!" }],
        style: {
          width: "500px",
          height: "40px",
        },
        onChange: (value: any) => { },
      },
      cols: 12,
    },
    {
      type: FIELD_TYPES.BUTTON,
      fieldProps: {
        type: "primary",
        htmlType: "submit",
        text: "Signup",
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
      </Form>
    </>
  );
};

export default SignupForm;
