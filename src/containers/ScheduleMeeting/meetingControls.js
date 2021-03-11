export const meetingControls = {
  date: {
    label: "Date",
    elementType: "input",
    elementConfig: {
      type: "text",
      placeholder: "Enter Date (DD-MM-YYYY)"
    },
    value: "",
    validation: {
      required: true,
      isDate: true
    },
    valid: false,
    touched: false
  },
  name: {
    label: "Name",
    elementType: "input",
    elementConfig: {
      type: "text",
      placeholder: "Enter Organizer Name"
    },
    value: "",
    validation: {
      required: true
    },
    valid: false,
    touched: false
  },
  description: {
    label: "Description",
    elementType: "textarea",
    elementConfig: {
      type: "text",
      placeholder: "Enter Meeting Description"
    },
    value: "",
    valid: true,
    touched: false
  },
  attendees: {
    label: "Attendees",
    elementType: "input",
    elementConfig: {
      type: "email",
      placeholder: "Add Attendees"
    },
    value: "",
    validation: {
      required: false,
      isEmail: true,
      errorMessage: "Please enter valid and unique emails"
    },
    valid: true,
    touched: false
  }
};
