import { Button, Checkbox, DatePicker, Form, Input, Select } from "antd";
import "./AuthenticateForm.css";

const renderText = ({ fieldProps }: any) => {
  const { placeholder, name, rules, style } = fieldProps;

  return (
    <Form.Item
      wrapperCol={{ span: 24 }}
      name={name}
      rules={rules}
      style={style}
    >
      <Input style={{ height: "50px" }} placeholder={placeholder} />
    </Form.Item>
  );
};

const renderButton = ({ fieldProps, formProps }: any) => {
  const { type, htmlType, text, isLoading } = fieldProps;

  return (
    <Form.Item {...formProps}>
      <Button
        type={type}
        htmlType={htmlType}
        style={{
          width: "100%",
          height: "50px",
          borderRadius: "38px",
          color: "#fffff",
          fontWeight: 600,
          fontSize: "18px",
          backgroundColor: "#ee5a5b",
        }}
        loading={isLoading}
      >
        {text}
      </Button>
    </Form.Item>
  );
};

const renderPassword = ({ fieldProps }: any) => {
  const { placeholder, name, rules, style } = fieldProps;
  return (
    <Form.Item
      name={name}
      rules={rules}
      wrapperCol={{ span: 24 }}
      style={style}
    >
      <Input.Password style={{ height: "50px" }} placeholder={placeholder} />
    </Form.Item>
  );
};

const renderCheckBox = ({ fieldProps }: any) => {
  const { options, name, rules, label } = fieldProps;

  return (
    <Form.Item
      name={name}
      label={label}
      rules={rules}
      wrapperCol={{ span: 24 }}
    // style={style}
    >
      <Checkbox.Group
        style={{
          marginLeft: "40px",
        }}
        options={options}
      />
    </Form.Item>
  );
};

const renderSelect = ({ fieldProps }: any) => {
  const { options, name, rules, label, placeholder } = fieldProps;

  return (
    <Form.Item
      name={name}
      label={label}
      rules={rules}
      wrapperCol={{ span: 24 }}
    >
      <Select
        placeholder={placeholder}
        options={options}
        size="large"
        listHeight={100}
      />
    </Form.Item>
  );
};

const renderSelectDate = ({ fieldProps }: any) => {
  const { name, rules, style, label, placeholder } = fieldProps;

  return (
    <Form.Item
      name={name}
      label={label}
      rules={[rules]}
      wrapperCol={{ span: 24 }}
    >
      <DatePicker style={style} placeholder={placeholder} />
    </Form.Item>
  );
};

export const FIELD_TYPES = {
  TEXT: "text",
  BUTTON: "button",
  PASSWORD: "password",
  CHECKBOX: "checkbox",
  SELECT: "select",
  SELECTDATE: "selectDate",
};

const FORM_MAPPING = {
  [FIELD_TYPES.TEXT]: renderText,
  [FIELD_TYPES.BUTTON]: renderButton,
  [FIELD_TYPES.PASSWORD]: renderPassword,
  [FIELD_TYPES.CHECKBOX]: renderCheckBox,
  [FIELD_TYPES.SELECT]: renderSelect,
  [FIELD_TYPES.SELECTDATE]: renderSelectDate,
};

const AuthenticateForm = ({ fields }: any) => {
  return (
    <div>
      {fields.map(
        ({ type, fieldProps, formProps }: any, index: number) => {
          return (
            <div key={index}>
              {FORM_MAPPING[type]({
                fieldProps: fieldProps,
                formProps: formProps,
              })}
            </div>
          );
        }
      )}
    </div>
  );
};

export default AuthenticateForm;
