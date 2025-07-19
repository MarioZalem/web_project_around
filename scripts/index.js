// === Selectores de elementos del DOM ===
const profile = {
  editButton: document.querySelector(".profile__edit-button"),
  addButton: document.querySelector(".profile__add-button"),
  name: document.querySelector(".profile__name"),
  job: document.querySelector(".profile__job"),
};

const popups = {
  edit: document.querySelector(".popup"),
  add: document.querySelector(".popup_type_add"),
  image: document.querySelector(".popup_type_image"),
};

const forms = {
  edit: popups.edit.querySelector(".popup__form"),
  add: popups.add.querySelector(".popup__form"),
};

const inputs = {
  name: document.querySelector(".popup__input_type_name"),
  job: document.querySelector(".popup__input_type_job"),
  title: popups.add.querySelector(".popup__input_type_title"),
  link: popups.add.querySelector(".popup__input_type_link"),
};

const cardsList = document.querySelector(".content__list");
const cardTemplate = document.querySelector("#card-template").content;

// === Funciones auxiliares ===
const openPopup = (popup) => popup.classList.add("popup_opened");
const closePopup = (popup) => popup.classList.remove("popup_opened");

// === Eventos globales ===
document
  .querySelectorAll(".content__card-button_type_trash")
  .forEach((button) => {
    button.addEventListener("click", (evt) => {
      const card = evt.target.closest(".content__card");
      if (card) card.remove();
    });
  });

// Event listener para botones de like existentes
document
  .querySelectorAll(".content__card-button_type_like")
  .forEach((button) => {
    button.addEventListener("click", (evt) => {
      // Usar currentTarget en lugar de target para asegurar que sea el botón
      evt.currentTarget.classList.toggle("content__card-button_liked");
    });
  });
// Event listener para imágenes existentes
document.querySelectorAll(".content__card-image").forEach((cardImage) => {
  cardImage.addEventListener("click", () => {
    const popupImage = popups.image.querySelector(".popup__image");
    const popupText = popups.image.querySelector(".popup__text");

    popupImage.src = cardImage.src;
    popupImage.alt = cardImage.alt;
    popupText.textContent = cardImage.alt;

    openPopup(popups.image);
  });
});

document.querySelectorAll(".popup__close-button").forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

// === Función para crear una tarjeta ===
function createCard(title, imageUrl) {
  const cardElement = cardTemplate
    .querySelector(".content__card")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".content__card-image");
  const cardTitle = cardElement.querySelector(".content__card-title");
  const likeButton = cardElement.querySelector(
    ".content__card-button_type_like"
  );
  const deleteButton = cardElement.querySelector(
    ".content__card-button_type_trash"
  );

  cardImage.src = imageUrl;
  cardImage.alt = title;
  cardTitle.textContent = title;

  // Evento para like
  likeButton.addEventListener("click", (evt) =>
    evt.currentTarget.classList.toggle("content__card-button_liked")
  );

  // Evento para borrar
  deleteButton.addEventListener("click", () => cardElement.remove());

  // Evento para ver imagen
  cardImage.addEventListener("click", () => {
    const popupImage = popups.image.querySelector(".popup__image");
    const popupText = popups.image.querySelector(".popup__text");

    popupImage.src = imageUrl;
    popupImage.alt = title;
    popupText.textContent = title;

    openPopup(popups.image);
  });

  return cardElement;
}

// === Eventos para perfil ===
profile.editButton.addEventListener("click", () => {
  inputs.name.value = profile.name.textContent;
  inputs.job.value = profile.job.textContent;
  openPopup(popups.edit);
});

forms.edit.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profile.name.textContent = inputs.name.value;
  profile.job.textContent = inputs.job.value;
  closePopup(popups.edit);
});

// === Eventos para añadir tarjetas ===
profile.addButton.addEventListener("click", () => {
  forms.add.reset();
  openPopup(popups.add);
});

forms.add.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const newCard = createCard(inputs.title.value, inputs.link.value);
  cardsList.prepend(newCard);
  closePopup(popups.add);
  forms.add.reset();
});

// === Cerrar popups al hacer clic en el overlay ===
document.querySelectorAll(".popup__overlay").forEach((overlay) => {
  const popup = overlay.closest(".popup");
  overlay.addEventListener("click", () => closePopup(popup));
});

// === Cerrar popups con Escape ===
document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    if (openedPopup) closePopup(openedPopup);
  }
});
