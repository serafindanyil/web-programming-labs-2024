// Створити клас “Банк” котрий містить поля:
// - назва
// - кількість клієнтів
// - кількість виданих кредитів

const MyBanksEl = document.getElementById("toMyBanks");
const CreateBankEl = document.getElementById("toCreateBank");
const EditBankEl = document.querySelectorAll(".toEditBank");
// querySelectorAll для прослуховування всіх елементів які мають такий клас
const createBankForm = document.getElementById("formCreateBank");
const EditBankForm = document.getElementById("formEditBank");

const inputTitleEl = document.getElementById("inputTitle");
const inputDescriptionEl = document.getElementById("inputDescription");
const inputCountClientsEl = document.getElementById("inputCountClients");
const inputCreditTakenCountEl = document.getElementById(
	"inputCreditTakenCount"
);

const inputEditTitleEl = document.getElementById("inputEditTitle");
const inputEditDescriptionEl = document.getElementById("inputEditDescription");
const inputEditCountClientsEl = document.getElementById(
	"inputEditCountClients"
);
const inputEditCreditTakenCountEl = document.getElementById(
	"inputEditCreditTakenCount"
);

const inputSearchEl = document.getElementById("inputSearch");
const buttonSeacrhEl = document.getElementById("buttonSeacrh");
const buttonClearEl = document.getElementById("buttonClear");

const selectSortEl = document.getElementById("selectSort");

const clientTotalValueEl = document.getElementById("clientTotalValue");
const creditTotalValueEl = document.getElementById("creditTotalValue");

// class Bank {
// 	constructor(name, description, clientCount, creditTakenCount) {
// 		this.name = name;
// 		this.description = description;
// 		this.clientCount = clientCount;
// 		this.creditTakenCount = creditTakenCount;
// 	}

// 	data() {
// 		return [
// 			this.name,
// 			this.description,
// 			this.clientCount,
// 			this.creditTakenCount,
// 		];
// 	}

// 	editBankInformation(newN, newD, newCC, newCTC) {
// 		this.name = newN === null ? this.name : newN;
// 		this.description = newD === null ? this.description : newD;
// 		this.clientCount = newCC === null ? this.clientCount : newCC;
// 		this.creditTakenCount = newCTC === null ? this.creditTakenCount : newCTC;
// 	}

// 	deleteObject() {
// 		delete this;
// 	}
// }

// class BankManager {
// 	static bankObject = new Object();

// 	static addBank(name, description, countClients = 0, creditTakenCount = 0) {
// 		const isBankCreated = Object.keys(BankManager.bankObject).find(
// 			(bankName) => bankName === name
// 		);

// 		if (!isBankCreated) {
// 			const newBankObject = new Bank(
// 				name,
// 				description,
// 				countClients,
// 				creditTakenCount
// 			);
// 			BankManager.bankObject[name] = newBankObject;
// 			return newBankObject;
// 		} else {
// 			alert("З таким іменем банк вже є!");
// 			// return null;
// 		}
// 	}

// 	static getBankByName(name) {
// 		return BankManager.bankObject[name];
// 	}

// 	static editBankByName(currentName, newN, newD, newCC, newCTC) {
// 		const isBankExsist = Object.keys(BankManager.bankObject).find(
// 			(bankName) => bankName === newN
// 		);

// 		if (!isBankExsist) {
// 			BankManager.bankObject[currentName].editBankInformation(
// 				newN,
// 				newD,
// 				newCC,
// 				newCTC
// 			);
// 			BankManager.bankObject[newN] = BankManager.bankObject[currentName];
// 			delete BankManager.bankObject[currentName];
// 		} else {
// 			alert("З таким іменем банк вже є! Використайте інше ім`я");
// 		}
// 	}

// 	static deleteCardByName(currentName) {
// 		BankManager.bankObject[currentName].deleteObject();
// 		delete BankManager.bankObject[currentName];
// 	}

// 	static listBanks() {
// 		return Object.keys(BankManager.bankObject);
// 	}
// }

function switchPage(page) {
	const sectionCreateBank = document.querySelector(".section-create-bank");
	const sectionEditBank = document.querySelector(".section-edit-bank");
	const sectionMyBanks = document.querySelector(".section-my-banks");

	if (page == "toCreateBank") {
		sectionCreateBank.classList.add("open");
		sectionMyBanks.classList.remove("open");
		sectionEditBank.classList.remove("open");

		CreateBankEl.classList.add("selected-page");
		MyBanksEl.classList.remove("selected-page");
	} else if (page == "toMyBanks") {
		sectionMyBanks.classList.add("open");
		sectionCreateBank.classList.remove("open");
		sectionEditBank.classList.remove("open");

		MyBanksEl.classList.add("selected-page");
		CreateBankEl.classList.remove("selected-page");
	} else if (page == "toEditBank") {
		sectionEditBank.classList.add("open");
		sectionCreateBank.classList.remove("open");
		sectionMyBanks.classList.remove("open");

		CreateBankEl.classList.add("selected-page");
		MyBanksEl.classList.remove("selected-page");
	}
}

async function fetchBankData() {
	try {
		const response = await fetch("http://localhost:8080/bank");
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		const data = await response.json();
		const arrayOfObjects = Array.isArray(data) ? data : [data];

		return arrayOfObjects;
	} catch (error) {
		console.error("Fetch error: ", error);
	}
}

async function fetchCreateBank(dataObject) {
	try {
		const response = await fetch("http://localhost:8080/bank", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(dataObject),
		});

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		const responseData = await response.json(); // Отримуємо та парсимо відповідь
		return responseData;
	} catch (error) {
		console.error("Error posting data:", error);
	}
}

async function fetchEditBank(dataObject) {
	try {
		const response = await fetch(`http://localhost:8080/bank`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(dataObject),
		});

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		const responseData = await response.json(); // Отримуємо та парсимо відповідь
		return responseData;
	} catch (error) {
		console.error("Error posting data:", error);
	}
}

async function fetchDeleteBank(id) {
	try {
		const response = await fetch(`http://localhost:8080/bank/${id}`, {
			method: "DELETE",
		});

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		return response;
	} catch (error) {
		console.error("Error posting data:", error);
	}
}

function updateDataOnPage(method) {
	const path = document.querySelector(".main-environment");

	switch (method) {
		case "update":
			path.innerHTML = null;

			fetchBankData().then((response) => {
				response.forEach((element) => {
					createCardOnPage(
						element.id,
						element.name,
						element.description,
						element.client_count,
						element.credit_taken_count
					);
				});
			});
			break;

		case "alphabetSort":
			path.innerHTML = null;

			fetchBankData().then((response) => {
				response.forEach((element) => {
					createCardOnPage(
						element.id,
						element.name,
						element.description,
						element.client_count,
						element.credit_taken_count
					);
				});
			});
			break;

		default:
			fetchBankData().then((response) => {
				response.forEach((element) => {
					createCardOnPage(
						element.id,
						element.name,
						element.description,
						element.client_count,
						element.credit_taken_count
					);
				});
			});
			break;
	}
}

// async function fetchData() {
// 	try {
// 		const response = await fetch("http://localhost:8080/bank");
// 		if (!response.ok) {
// 			throw new Error("Network response was not ok");
// 		}
// 		const data = await response.json();

// 		const arrayOfObjects = Array.isArray(data) ? data : [data];

// 		return arrayOfObjects;
// 	} catch (error) {
// 		console.error("Fetch error: ", error);
// 	}
// }

// let currentEditObjectName;
// function updateInfoOnEditPage(objectNameWillEdit) {
// 	const [name, description, clientCount, ...creditTakenCount] =
// 		BankManager.getBankByName(objectNameWillEdit).data();

// 	inputEditTitleEl.placeholder = name;
// 	inputEditDescriptionEl.placeholder = description;
// 	inputEditCountClientsEl.placeholder = clientCount;
// 	inputEditCreditTakenCountEl.placeholder = creditTakenCount;

// 	currentEditObjectName = objectNameWillEdit;
// }

function isValidate(element) {
	if (isNaN(element) && element.trim() !== "") {
		return element;
	}
	return null;
}

function isValidateInteger(element) {
	if (isNaN(parseInt(element))) {
		return null;
	} else if (element >= 0) {
		return parseInt(element);
	} else {
		alert("Значення має бути більше нуля!!");
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

// // кнопка Edit
// document.addEventListener("click", function (event) {
// 	if (event.target.classList.contains("toEditBank")) {
// 		const outerContainer = event.target.closest(".card--bank");

// 		if (outerContainer) {
// 			const h3El = outerContainer.querySelector("h3");
// 			if (h3El) {
// 				updateInfoOnEditPage(h3El.textContent);
// 			}
// 		}
// 		switchPage("toEditBank");
// 	}
// });

// // FIXME: КНОПКА НЕ РОБИТЬ ТА ШО ЕДІТ, САМ ПЕРЕХІД ПРАЦЮЄ, АЛЕ ЧОМУСЬ НЕ ВІДСЛІДКОВУЄТЬСЯ ДІЯ ПО QUERYSELECTORALL

// function selectedSorting() {
// 	const selectedValue = selectSortEl.value;
// 	return selectedValue;
// }

// function useSorting(sortingType) {
// 	const allCardNames = Object.keys(BankManager.bankObject);
// 	const clientCountValue = [];
// 	const creditCountValue = [];
// 	if (sortingType == "alphabet") {
// 		removeCards();

// 		const sortArrayByName = allCardNames.sort();
// 		sortArrayByName.forEach((value) => {
// 			const currentObject = BankManager.getBankByName(value);
// 			createCard(
// 				currentObject.name,
// 				currentObject.description,
// 				currentObject.clientCount,
// 				currentObject.creditTakenCount
// 			);
// 			clientCountValue.push(currentObject.clientCount);
// 			creditCountValue.push(currentObject.creditTakenCount);
// 		});
// 	} else {
// 		removeCards();

// 		allCardNames.forEach((value) => {
// 			const currentObject = BankManager.getBankByName(value);
// 			createCard(
// 				currentObject.name,
// 				currentObject.description,
// 				currentObject.clientCount,
// 				currentObject.creditTakenCount
// 			);
// 			clientCountValue.push(currentObject.clientCount);
// 			creditCountValue.push(currentObject.creditTakenCount);
// 		});
// 	}

// async function updateDataOnPage(array) {
// 	array.forEach((element) => {
// 		createCardOnPage(
// 			element.id,
// 			element.name,
// 			element.description,
// 			element.client_count,
// 			element.credit_taken_count
// 		);
// 	});
// }

// fetchData().then((data) => {
// 	updateDataOnPage(data);
// });

// 	clientTotalValueEl.textContent = reduceValues(clientCountValue);
// 	creditTotalValueEl.textContent = reduceValues(creditCountValue);
// }

// function useFind(findingValue) {
// 	const allCardNames = Object.keys(BankManager.bankObject);

// 	const findedNames = allCardNames.filter((name) =>
// 		name.toLowerCase().includes(findingValue.trim().toLowerCase())
// 	);

// 	removeCards();

// 	const clientCountValue = [];
// 	const creditCountValue = [];
// 	findedNames.forEach((value) => {
// 		const currentObject = BankManager.getBankByName(value);
// 		createCard(
// 			currentObject.name,
// 			currentObject.description,
// 			currentObject.clientCount,
// 			currentObject.creditTakenCount
// 		);
// 		clientCountValue.push(currentObject.clientCount);
// 		creditCountValue.push(currentObject.creditTakenCount);
// 	});

// 	clientTotalValueEl.textContent = reduceValues(clientCountValue);
// 	creditTotalValueEl.textContent = reduceValues(creditCountValue);

// 	if (findedNames.length == 0) {
// 		alert("За таким запитом нікого не знайдено");
// 	}
// }

function createCardOnPage(id, name, customText, clientsCount, creditsCount) {
	// Створюємо елементи
	const card = document.createElement("div");
	card.classList.add("card", "card--bank");
	card.id = id;

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
	editButton.classList.add("btn", "btn--edit", "toEditBank");

	editButton.textContent = "Edit";

	const removeButton = document.createElement("button");
	removeButton.classList.add("btn", "btn--remove", "removeButton");
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

// function editCard(name, description, clientCount, creditTakenCount) {
// 	BankManager.editBankByName(
// 		currentEditObjectName,
// 		name,
// 		description,
// 		clientCount,
// 		creditTakenCount
// 	);

// 	currentEditObjectName = null;
// }

// // function deleteObjectAndCard(objectName) {}

createBankForm.addEventListener("submit", function (event) {
	const validatedInputTitle = isValidate(inputTitleEl.value);
	const validatedinputDescription = isValidate(inputDescriptionEl.value);
	const parseInputCountClients =
		isValidateInteger(inputCountClientsEl.value) === null
			? 0
			: isValidateInteger(inputCountClientsEl.value);
	const parseInputCreditTakenCount =
		isValidateInteger(inputCreditTakenCountEl.value) === null
			? 0
			: isValidateInteger(inputCreditTakenCountEl.value);

	if (validatedInputTitle && validatedinputDescription) {
		const newBankObject = {
			name: validatedInputTitle,
			description: validatedinputDescription,
			client_count: parseInputCountClients,
			credit_taken_count: parseInputCreditTakenCount,
		};

		fetchCreateBank(newBankObject).then((response) => {
			createCardOnPage(
				response.id,
				response.name,
				response.description,
				response.client_count,
				response.credit_taken_count
			);
		});

		inputTitleEl.value = "";
		inputDescriptionEl.value = "";
		inputCountClientsEl.value = "";
		inputCreditTakenCountEl.value = "";

		switchPage("toMyBanks");
		// useSorting(selectedSorting());
	}
});

EditBankForm.addEventListener("submit", function (event) {
	const validatedInputTitle = isValidate(inputEditTitleEl.value);
	const validatedinputDescription = isValidate(inputEditDescriptionEl.value);
	const parseInputCountClients = isValidateInteger(
		inputEditCountClientsEl.value
	);
	const parseInputCreditTakenCount = isValidateInteger(
		inputEditCreditTakenCountEl.value
	);

	const currentCardId = event.target.getAttribute("data-id-current-bank");
	const currentCardEl = document.getElementById(currentCardId);

	const editBankObject = {
		id: currentCardId,
		name: validatedInputTitle,
		description: validatedinputDescription,
		client_count: parseInputCountClients,
		credit_taken_count: parseInputCreditTakenCount,
	};

	fetchEditBank(editBankObject).then((response) => {
		createCardOnPage(
			response.id,
			response.name,
			response.description,
			response.client_count,
			response.credit_taken_count
		);
		currentCardEl.remove();
	});

	inputEditTitleEl.value = "";
	inputEditDescriptionEl.value = "";
	inputEditCountClientsEl.value = "";
	inputEditCreditTakenCountEl.value = "";

	switchPage("toMyBanks");
	// useSorting(selectedSorting());
});

// кнопка Edit
document.addEventListener("click", function (event) {
	if (event.target.classList.contains("toEditBank")) {
		const outerContainer = event.target.closest(".card--bank");

		if (outerContainer) {
			const id = outerContainer.id;
			const currentCardEl = document.getElementById(id);
			if (id) {
				switchPage("toEditBank");
				EditBankForm.dataset.idCurrentBank = id;
			}
		}
	}
});

// кнопка Remove
document.addEventListener("click", function (event) {
	if (event.target.classList.contains("removeButton")) {
		const outerContainer = event.target.closest(".card--bank");

		if (outerContainer) {
			const id = outerContainer.id;
			const currentCardEl = document.getElementById(id);
			if (id) {
				fetchDeleteBank(id);
				currentCardEl.remove();
			}
		}
	}
});

// selectSortEl.addEventListener("change", function () {
// 	useSorting(selectedSorting());
// });

// buttonSeacrhEl.addEventListener("click", () => {
// 	const validatedValue = isValidate(inputSearchEl.value);
// 	useFind(validatedValue);
// 	// inputSearchEl.value = "";
// });

// // Відстежуємо натискання клавіш на input
// inputSearchEl.addEventListener("keydown", function (event) {
// 	// Перевіряємо, чи натиснута клавіша Enter (код 13 або 'Enter')
// 	if (event.key === "Enter") {
// 		// Спрацьовує кнопка
// 		const validatedValue = isValidate(inputSearchEl.value);
// 		useFind(validatedValue);
// 		// inputSearchEl.value = "";
// 	}
// });

// buttonClearEl.addEventListener("click", () => {
// 	useSorting(selectedSorting());
// 	inputSearchEl.value = "";
// });

// function reduceValues(countArray) {
// 	const initialValue = 0;
// 	const sumWithInitial = countArray.reduce(
// 		(accumulator, currentValue) => accumulator + currentValue,
// 		initialValue
// 	);
// 	return sumWithInitial;
// }

// IIFE початок роботи на сторінці

(function start() {
	// Фетчіть дані з api
	updateDataOnPage();
})();
