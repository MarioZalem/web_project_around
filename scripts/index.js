// === CONFIGURACIÓN ===
const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

// === CLASE CARD ===
class Card {
  constructor(name, link, templateSelector, handlers) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleImageClick = handlers.handleImageClick;
  }

  _getTemplate() {
    const template = document.querySelector(this._templateSelector).content;
    return template.querySelector(".content__card").cloneNode(true);
  }

  _setEventListeners() {
    // Like button
    this._likeButton.addEventListener("click", () => {
      this._likeButton.classList.toggle("content__card-button_liked");
    });

    // Delete button
    this._deleteButton.addEventListener("click", () => {
      this._element.remove();
    });

    // Image click
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this._link, this._name);
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".content__card-image");
    this._cardTitle = this._element.querySelector(".content__card-title");
    this._likeButton = this._element.querySelector(
      ".content__card-button_type_like"
    );
    this._deleteButton = this._element.querySelector(
      ".content__card-button_type_trash"
    );

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._setEventListeners();
    return this._element;
  }
}

// === CLASE POPUP ===
class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector(".popup__close-button");
    this._overlay = this._popup.querySelector(".popup__overlay");
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    this._closeButton.addEventListener("click", () => this.close());
    this._overlay.addEventListener("click", () => this.close());
  }
}

// === CLASE POPUP WITH IMAGE ===
class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(".popup__image");
    this._caption = this._popup.querySelector(".popup__text");
  }

  open(imageUrl, caption) {
    this._image.src = imageUrl;
    this._image.alt = caption;
    this._caption.textContent = caption;
    super.open();
  }
}

// === CLASE POPUP WITH FORM ===
class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
    this._submitHandler = submitHandler;
    this._inputs = this._form.querySelectorAll(".popup__input");
  }

  _getInputValues() {
    const values = {};
    this._inputs.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitHandler(this._getInputValues());
      this.close();
      this._form.reset();
    });
  }

  open() {
    super.open();
  }
}

// === CLASE USER INFO ===
class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent,
    };
  }

  setUserInfo({ name, job }) {
    this._name.textContent = name;
    this._job.textContent = job;
  }
}

// === SELECTORES ===
const selectors = {
  editButton: document.querySelector(".profile__edit-button"),
  addButton: document.querySelector(".profile__add-button"),
  cardsList: document.querySelector(".content__list"),
};

// === INICIALIZACIÓN ===
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__job",
});

const popupImage = new PopupWithImage(".popup_type_image");
popupImage.setEventListeners();

const popupEdit = new PopupWithForm(".popup", (inputValues) => {
  userInfo.setUserInfo({ name: inputValues.name, job: inputValues.job });
});
popupEdit.setEventListeners();

const popupAdd = new PopupWithForm(".popup_type_add", (inputValues) => {
  const card = new Card(inputValues.title, inputValues.link, "#card-template", {
    handleImageClick: (imageUrl, caption) => {
      popupImage.open(imageUrl, caption);
    },
  });
  selectors.cardsList.prepend(card.generateCard());
});
popupAdd.setEventListeners();

// === EVENT LISTENERS ===
selectors.editButton.addEventListener("click", () => {
  const currentInfo = userInfo.getUserInfo();
  const nameInput = document.querySelector(".popup__input_type_name");
  const jobInput = document.querySelector(".popup__input_type_job");
  nameInput.value = currentInfo.name;
  jobInput.value = currentInfo.job;
  popupEdit.open();
});

selectors.addButton.addEventListener("click", () => {
  popupAdd.open();
});

// === CARGAR CARDS INICIALES ===
initialCards.forEach((cardData) => {
  const card = new Card(cardData.name, cardData.link, "#card-template", {
    handleImageClick: (imageUrl, caption) => {
      popupImage.open(imageUrl, caption);
    },
  });
  selectors.cardsList.appendChild(card.generateCard());
});
