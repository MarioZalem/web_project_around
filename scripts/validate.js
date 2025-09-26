// === Mensajes de error personalizados en español ===
const getCustomErrorMessage = (inputElement) => {
  const validity = inputElement.validity;
  const fieldName = inputElement.getAttribute('name');
  
  if (validity.valueMissing) {
    if (fieldName === 'name') return "Por favor, introduce tu nombre.";
    if (fieldName === 'job') return "Por favor, describe tu profesión.";
    if (fieldName === 'title') return "Por favor, introduce el título del lugar.";
    if (fieldName === 'link') return "Por favor, introduce el enlace de la imagen.";
    return "Por favor, rellena este campo.";
  }
  
  if (validity.tooShort) {
    const minLength = inputElement.getAttribute('minlength');
    if (fieldName === 'name') {
      return `El nombre debe tener al menos ${minLength} caracteres. Longitud actual: ${inputElement.value.length}.`;
    }
    if (fieldName === 'job') {
      return `La descripción debe tener al menos ${minLength} caracteres. Longitud actual: ${inputElement.value.length}.`;
    }
    if (fieldName === 'title') {
      return `El título debe tener al menos ${minLength} caracteres. Longitud actual: ${inputElement.value.length}.`;
    }
    return `El texto debe tener al menos ${minLength} caracteres. Longitud actual: ${inputElement.value.length}.`;
  }
  
  if (validity.tooLong) {
    const maxLength = inputElement.getAttribute('maxlength');
    if (fieldName === 'name') {
      return `El nombre debe tener máximo ${maxLength} caracteres. Longitud actual: ${inputElement.value.length}.`;
    }
    if (fieldName === 'job') {
      return `La descripción debe tener máximo ${maxLength} caracteres. Longitud actual: ${inputElement.value.length}.`;
    }
    if (fieldName === 'title') {
      return `El título debe tener máximo ${maxLength} caracteres. Longitud actual: ${inputElement.value.length}.`;
    }
    return `El texto debe tener máximo ${maxLength} caracteres. Longitud actual: ${inputElement.value.length}.`;
  }
  
  if (validity.typeMismatch) {
    if (inputElement.type === 'url') {
      return "Introduce una dirección web válida (ejemplo: https://ejemplo.com/imagen.jpg).";
    }
  }
  
  return "Valor no válido.";
};

// === Funciones de validación ===
const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  if (errorElement) {
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
  }
};

const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  if (errorElement) {
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = "";
  }
};

const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    // Usar mensaje personalizado en español
    const customErrorMessage = getCustomErrorMessage(inputElement);
    showInputError(formElement, inputElement, customErrorMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  // Para que el botón se inactive al inicio si es necesario
  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, config);
  });
};

// === Función para limpiar validación ===
const clearValidation = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, config);
  });

  toggleButtonState(inputList, buttonElement, config);
};

// === Inicializar validación ===
// habilitar la validación llamando a enableValidation()
// pasar todas las configuraciones en la llamada
enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});
