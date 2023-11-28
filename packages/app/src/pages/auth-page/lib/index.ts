export const required = {
  isValid: false,
  message: 'обязательное поле',
};

export const nameLength = {
  isValid: false,
  message: 'имя должно быть не меньше 2 символов',
};

export const successValidation = {
  isValid: true,
  message: '',
};

export function validateName(name: string) {
  if (!name) {
    return required;
  }

  if (name.length < 2) {
    return nameLength;
  }

  return successValidation;
}
