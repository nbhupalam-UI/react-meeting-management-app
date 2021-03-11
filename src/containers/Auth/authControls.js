export const authControls = {
  email: {
    elementType: "input",
    label: "E-mail Address",
    elementConfig: {
      type: "email",
      placeholder: "Enter Mail Address"
    },
    value: "",
    validation: {
      required: true,
      isEmail: true
    },
    valid: false,
    touched: false
  },
  password: {
    label: "Password",
    elementType: "input",
    elementConfig: {
      type: "password",
      placeholder: "Password"
    },
    value: "",
    validation: {
      required: true,
      minLength: 6
    },
    valid: false,
    touched: false
  }
};
