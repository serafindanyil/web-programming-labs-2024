// Створити клас “Банк” котрий містить поля:
// - назва
// - кількість клієнтів
// - кількість виданих кредитів

const MyBanksEl = document.getElementById("toMyBanks");
const CreateBankEl = document.getElementById("toCreateBank");
const createBankForm = document.getElementById("formCreateBank");

const inputTitleEl = document.getElementById("inputTitle");
const inputDescriptionEl = document.getElementById("inputDescription");
const inputCountClientsEl = document.getElementById("inputCountClients");
const inputCreditTakenCountEl = document.getElementById(
	"inputCreditTakenCount"
);

const inputSearchEl = document.getElementById("inputSearch");
const buttonSeacrhEl = document.getElementById("buttonSeacrh");
const buttonClearEl = document.getElementById("buttonClear");

const selectSortEl = document.getElementById("selectSort");

class Bank {
	constructor(name, description, clientCount, creditTakenCount) {
		this.name = name;
		this.description = description;
		this.clientCount = clientCount;
		this.creditTakenCount = creditTakenCount;
	}

	data() {
		return this.name, this.description, this.clientCount, this.creditTakenCount;
	}
}

class BankManager {
	static bankObject = new Object();

	static addBank(name, description, countClients = 0, creditTakenCount = 0) {
		const isBankCreated = Object.keys(BankManager.bankObject).find(
			(bankName) => bankName === name
		);

		if (!isBankCreated) {
			const newBankObject = new Bank(
				name,
				description,
				countClients,
				creditTakenCount
			);
			BankManager.bankObject[name] = newBankObject;
			return newBankObject;
		} else {
			alert.log("Користувач вже є!");
			return null;
		}
	}

	static getBankByName(name) {
		return BankManager.bankObject[name];
	}

	static listBanks() {
		return Object.keys(BankManager.bankObject);
	}
}

function switchPage(page) {
	const sectionCreateBank = document.querySelector(".section-create-bank");
	const sectionMyBanks = document.querySelector(".section-my-banks");

	if (page == "toCreateBank") {
		sectionCreateBank.classList.add("open");
		sectionMyBanks.classList.remove("open");

		CreateBankEl.classList.add("selected-page");
		MyBanksEl.classList.remove("selected-page");
	} else if (page == "toMyBanks") {
		sectionMyBanks.classList.add("open");
		sectionCreateBank.classList.remove("open");

		MyBanksEl.classList.add("selected-page");
		CreateBankEl.classList.remove("selected-page");
	}
}

function isValidate(element, type = 0) {
	if (isNaN(element) && element.trim() !== "") {
		return element;
	}
	return null;
}

function isValidateInteger(element) {
	if (isNaN(parseInt(element))) {
		return 0;
	} else {
		return parseInt(element);
	}
}

// по дефолту сторінка мої банки
switchPage("toMyBanks");

MyBanksEl.addEventListener("click", function () {
	switchPage("toMyBanks");
});

CreateBankEl.addEventListener("click", function () {
	switchPage("toCreateBank");
});

function selectedSorting() {
	const selectedValue = selectSortEl.value;
	return selectedValue;
}

function useSorting(sortingType) {
	const allCardNames = Object.keys(BankManager.bankObject);
	if (sortingType == "alphabet") {
		removeCards();

		const sortArrayByName = allCardNames.sort();
		sortArrayByName.forEach((value) => {
			const currentObject = BankManager.getBankByName(value);
			createCard(
				currentObject.name,
				currentObject.description,
				currentObject.clientCount,
				currentObject.creditTakenCount
			);
		});
	} else {
		removeCards();
		const clientCountValue = [];

		allCardNames.forEach((value) => {
			const currentObject = BankManager.getBankByName(value);
			createCard(
				currentObject.name,
				currentObject.description,
				currentObject.clientCount,
				currentObject.creditTakenCount
			);
			clientCountValue.push(currentObject.clientCount);
		});
		reduceValues(clientCountValue);
	}
}

function useFind(findingValue) {
	const allCardNames = Object.keys(BankManager.bankObject);

	const findedNames = allCardNames.filter((name) =>
		name.toLowerCase().includes(findingValue.toLowerCase())
	);

	removeCards();

	const clientCountValue = [];
	findedNames.forEach((value) => {
		const currentObject = BankManager.getBankByName(value);
		createCard(
			currentObject.name,
			currentObject.description,
			currentObject.clientCount,
			currentObject.creditTakenCount
		);
		clientCountValue.push(currentObject.clientCount);
	});

	reduceValues(clientCountValue);
	xf;

	if (findedNames.length == 0) {
		alert("За таким запитом нікого не знайдено");
	}
}

function createCard(name, customText, clientsCount, creditsCount) {
	// Створюємо елементи
	const card = document.createElement("div");
	card.classList.add("card", "card--bank");

	const heading = document.createElement("h3");
	heading.classList.add("tertiary-heading", "margin-bottom-sm");
	heading.textContent = name;

	const clientsCounter = document.createElement("p");
	clientsCounter.classList.add("counter", "margin-bottom-sm");
	clientsCounter.textContent = `Clients count: ${clientsCount}`;

	const creditsCounter = document.createElement("p");
	creditsCounter.classList.add("counter", "margin-bottom-md");
	creditsCounter.textContent = `Credits taken count: ${creditsCount}`;

	const paragraph = document.createElement("p");
	paragraph.classList.add("paragraph", "margin-bottom-sm");
	paragraph.textContent = customText;

	const lastUpdateParagraph = document.createElement("p");
	lastUpdateParagraph.classList.add("card_last-update", "margin-bottom-md");
	lastUpdateParagraph.textContent = `Last update - mins ago`;

	const elementContainer = document.createElement("div");
	elementContainer.classList.add("element-container");

	const editButton = document.createElement("button");
	editButton.classList.add("btn", "btn--edit");
	editButton.textContent = "Edit";

	const removeButton = document.createElement("button");
	removeButton.classList.add("btn", "btn--remove");
	removeButton.textContent = "Remove";

	elementContainer.appendChild(editButton);
	elementContainer.appendChild(removeButton);

	card.appendChild(heading);
	card.appendChild(clientsCounter);
	card.appendChild(creditsCounter);
	card.appendChild(paragraph); // Додаємо customText
	card.appendChild(lastUpdateParagraph);
	card.appendChild(elementContainer);

	const path = document.querySelector(".main-environment");
	path.appendChild(card);
}

function removeCards() {
	const path = document.querySelector(".main-environment");
	path.innerHTML = null;
}

// function deleteObjectAndCard(objectName) {}

createBankForm.addEventListener("submit", function (event) {
	const validatedInputTitle = isValidate(inputTitleEl.value);
	const validatedinputDescription = isValidate(inputDescriptionEl.value);
	const parseInputCountClients = isValidateInteger(inputCountClientsEl.value);
	const parseInputCreditTakenCount = isValidateInteger(
		inputCreditTakenCountEl.value
	);

	if (validatedInputTitle && validatedinputDescription) {
		BankManager.addBank(
			validatedInputTitle,
			validatedinputDescription,
			parseInputCountClients,
			parseInputCreditTakenCount
		);

		createCard(
			validatedInputTitle,
			parseInputCountClients,
			parseInputCreditTakenCount,
			validatedinputDescription
		);

		inputTitleEl.value = "";
		inputDescriptionEl.value = "";
		inputCountClientsEl.value = "";
		inputCreditTakenCountEl.value = "";

		switchPage("toMyBanks");
		useSorting(selectedSorting());
	}
});

selectSortEl.addEventListener("change", function () {
	useSorting(selectedSorting());
});

// const inputSearchEl = document.getElementById("inputSearch");
// const buttonSeacrhEl = document.getElementById("buttonSeacrh");
// const buttonClearEl = document.getElementById("buttonClear");

buttonSeacrhEl.addEventListener("click", () => {
	const validatedValue = isValidate(inputSearchEl.value);
	useFind(validatedValue);
	inputSearchEl.value = "";
});

buttonClearEl.addEventListener("click", () => {
	useSorting(selectedSorting());
	inputSearchEl.value = "";
});

function reduceValues(countArray) {
	const initialValue = 0;
	const sumWithInitial = countArray.reduce(
		(accumulator, currentValue) => accumulator + currentValue,
		initialValue
	);

	const totalValueEl = document.getElementById("totalValue");
	totalValueEl.textContent = sumWithInitial;
}
