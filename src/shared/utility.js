export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  };
};

function datesFn() {
  let today = new Date();
  let currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const days = new Date(currentYear, currentMonth + 1, 0).getDate();
  const datesArray = Array.from(Array(days), (day) => day);
  return {
    currentMonth,
    currentYear,
    datesArray,
    days
  };
}
export const { currentMonth, currentYear, datesArray, days } = datesFn();

export const checkValidity = (value, rules) => {
  let isValid = true;
  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid = value.trim() !== "" && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.isDate) {
    let [date, month, year] = value.split("-");
    date = date * 1;
    month = month * 1;
    year = year * 1;
    if (
      date < 0 ||
      date > days ||
      month !== currentMonth + 1 ||
      year !== currentYear
    ) {
      isValid = false;
    }
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid;
  }

  return isValid;
};

export const getFormElementsArray = (controls) => {
  const formElementsArray = [];
  for (let key in controls) {
    formElementsArray.push({
      id: key,
      config: controls[key]
    });
  }
  return formElementsArray;
};
