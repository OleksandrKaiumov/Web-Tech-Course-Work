const emptyFieldError = "Field is empty";
const emailFieldError = "Email is invalid";
const invalidFieldClass = "contact-section__field--invalid";
const hiddenErrorClass = "contact-section__error-message--hidden";
const sendButton = document.getElementById("sendButton");
const contactForm = document.getElementById("contactForm");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const backToTopButton = document.getElementById("backToTopButton");
const fieldConfigs = [
    { id: "firstNameField", validator: IsFieldNotEmpty },
    { id: "lastNameField", validator: IsFieldNotEmpty },
    { id: "emailField", validator: IsEmailFieldValid },
    { id: "themeField", validator: IsFieldNotEmpty },
    { id: "messageField", validator: IsFieldNotEmpty }
];
const fieldsObjects = [];
let errorCount = 0;
const pageName = window.location.pathname.split("/").pop().split('.')[0];
const activePageOptionClass = "nav-menu__link-title--active";
const pageNames = ["index", "lore", "glossary", "contacts"];
const activeNavMenuClass = "nav-menu--active";
const activeMenuButtonClass = "main-header__menu-button--active";
const menuButton = document.getElementById("menuButton");
const navMenu = document.getElementById("navMenu");

for (const name of pageNames) {
    if (pageName === name) {
        const id = name + "PageOption";
        document.getElementById(id).classList.add(activePageOptionClass);
    }
}

for (const config of fieldConfigs) {
    const field = document.getElementById(config.id);

    fieldsObjects.push({
        element: field,
        validator: config.validator
    });

    field.addEventListener("blur", (e) => {
        config.validator(e.target);
        UpdateSendButtonState();
    });
}

sendButton.addEventListener("click", TrySubmitContactForm);
backToTopButton.addEventListener("click", ScrollToTop);
menuButton.addEventListener("click", ToggleNavMenu);

function IsFieldNotEmpty(field) {
    const value = field.value.trim();
    const errorElem = field.nextElementSibling;

    if (value === "") {
        AddError(field, errorElem);
        return false;
    }

    RemoveError(field, errorElem);
    return true;
}

function IsEmailFieldValid(field) {
    const value = field.value.trim();
    const errorElem = field.nextElementSibling;

    if (!emailRegex.test(value)) {
        AddError(field, errorElem);
        return false;
    }

    RemoveError(field, errorElem);
    return true;
}

function AddError(field, errorElem) {
    if (errorElem.classList.contains(hiddenErrorClass)) {
        errorElem.classList.remove(hiddenErrorClass);
        field.classList.add(invalidFieldClass);
        errorCount++;
    }
}

function RemoveError(field, errorElem) {
    if (!errorElem.classList.contains(hiddenErrorClass)) {
        errorElem.classList.add(hiddenErrorClass);
        field.classList.remove(invalidFieldClass);
        errorCount--;
    }
}

function UpdateSendButtonState() {
    if (errorCount > 0) DisableSendButton();
    else EnableSendButton();
}

function DisableSendButton() {
    sendButton.setAttribute("disabled", "disabled");
}

function EnableSendButton() {
    sendButton.removeAttribute("disabled");
}

function TrySubmitContactForm() {
    let anyError = false;
    for (const fieldObj of fieldsObjects) {
        if (!fieldObj.validator(fieldObj.element)) anyError = true;
    }

    if (!anyError) contactForm.submit();
    else DisableSendButton();
}

function ScrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function ToggleNavMenu() {
    navMenu.classList.toggle(activeNavMenuClass);
    menuButton.classList.toggle(activeMenuButtonClass)
}