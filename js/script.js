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

async function fetchBankData(dataType) {
	try {
		let outputData;

		switch (dataType) {
			case "alphabet":
				outputData = "bank?sort=alphabet";
				break;
			default:
				outputData = "bank";
				break;
		}

		const response = await fetch(`http://localhost:8080/${outputData}`);
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

async function fetchBankById(id) {
	try {
		const response = await fetch(`http://localhost:8080/bank/${id}`);

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		const data = await response.json();

		return data;
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
			cache: "no-store",
		});

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		return response;
	} catch (error) {
		console.error("Error posting data:", error);
	}
}

async function fetchFindBankData(keyword, sort = null) {
	try {
		let url;
		switch (sort) {
			case "alphabet":
				url = `http://localhost:8080/bank/search?keyword=${keyword}&sort=alphabet`;
				break;
			default:
				url = `http://localhost:8080/bank/search?keyword=${keyword}`;
		}
		const response = await fetch(url);
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

function updateCountersOnPage(objectArray) {
	let clientCountArray = [];
	let creditTakenCountArray = [];

	objectArray.forEach((element) => {
		clientCountArray.push(element.client_count);
		creditTakenCountArray.push(element.credit_taken_count);
	});

	clientTotalValueEl.textContent = reduceValues(clientCountArray);
	creditTotalValueEl.textContent = reduceValues(creditTakenCountArray);
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
				updateCountersOnPage(response);
			});
			break;

		case "alphabet":
			path.innerHTML = null;

			fetchBankData("alphabet").then((response) => {
				response.forEach((element) => {
					createCardOnPage(
						element.id,
						element.name,
						element.description,
						element.client_count,
						element.credit_taken_count
					);
				});
				updateCountersOnPage(response);
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
				updateCountersOnPage(response);
			});
			break;
	}
}

function useFindAndUpdateOnPage(keyword) {
	const sortedSelected = selectedSorting();

	const path = document.querySelector(".main-environment");
	path.innerHTML = null;

	switch (sortedSelected) {
		case "update":
			fetchFindBankData(keyword).then((response) => {
				response.forEach((element) => {
					createCardOnPage(
						element.id,
						element.name,
						element.description,
						element.client_count,
						element.credit_taken_count
					);
				});
				updateCountersOnPage(response);
			});
			break;
		case "alphabet":
			fetchFindBankData(keyword, "alphabet").then((response) => {
				response.forEach((element) => {
					createCardOnPage(
						element.id,
						element.name,
						element.description,
						element.client_count,
						element.credit_taken_count
					);
				});
				updateCountersOnPage(response);
			});
			break;
	}
}

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

function selectedSorting() {
	const selectedValue = selectSortEl.value;
	return selectedValue;
}

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
			if (response) {
				const currentSortingType = selectedSorting();
				updateDataOnPage(currentSortingType);
			}
		});

		inputTitleEl.value = "";
		inputDescriptionEl.value = "";
		inputCountClientsEl.value = "";
		inputCreditTakenCountEl.value = "";

		switchPage("toMyBanks");
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

	const editBankObject = {
		id: currentCardId,
		name: validatedInputTitle,
		description: validatedinputDescription,
		client_count: parseInputCountClients,
		credit_taken_count: parseInputCreditTakenCount,
	};

	fetchEditBank(editBankObject).then((response) => {
		if (response) {
			const currentSortingType = selectedSorting();

			updateDataOnPage(currentSortingType);
		}
	});

	inputEditTitleEl.value = "";
	inputEditDescriptionEl.value = "";
	inputEditCountClientsEl.value = "";
	inputEditCreditTakenCountEl.value = "";

	switchPage("toMyBanks");
});

// кнопка Edit
document.addEventListener("click", function (event) {
	if (event.target.classList.contains("toEditBank")) {
		const outerContainer = event.target.closest(".card--bank");

		if (outerContainer) {
			const id = outerContainer.id;
			if (id) {
				EditBankForm.dataset.idCurrentBank = id;
				switchPage("toEditBank");

				fetchBankById(id).then((response) => {
					if (response) {
						const { id, name, description, client_count, credit_taken_count } =
							response;

						inputEditTitleEl.placeholder = name;
						inputEditDescriptionEl.placeholder = description;
						inputEditCountClientsEl.placeholder = client_count;
						inputEditCreditTakenCountEl.placeholder = credit_taken_count;
					}
				});
			}
		}
	}
});

// кнопка Remove
document.addEventListener("click", function (event) {
	if (event.target.classList.contains("removeButton")) {
		const outerContainer = event.target.closest(".card--bank");

		const currentSortingType = selectedSorting();

		if (outerContainer) {
			const id = outerContainer.id;
			if (id) {
				fetchDeleteBank(id).finally(() => {
					updateDataOnPage(currentSortingType);
				});
			}
		}
	}
});

function validateSearchWithUsingSorting() {
	const validatedValue = isValidate(inputSearchEl.value);
	if (validatedValue !== null) {
		useFindAndUpdateOnPage(validatedValue);
	} else {
		alert("Шукане значення не може бути пустим");
	}
}

selectSortEl.addEventListener("change", validateSearchWithUsingSorting);

// FIXME: ПРИ ПОШУКУ ЕЛЕМЕНТУ ДОБАВ З СОРТУВАННЯМ ЗА ДОПОМОГОЮ НОВИХ ЕНД ПОІНТІВ З ПАРАМЕТРАМИ SEARCH і SORT
buttonSeacrhEl.addEventListener("click", validateSearchWithUsingSorting);

buttonClearEl.addEventListener("click", () => {
	const currentSortingType = selectedSorting();
	updateDataOnPage(currentSortingType);

	inputSearchEl.value = "";
});

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

function reduceValues(countArray) {
	const initialValue = 0;
	const sumWithInitial = countArray.reduce(
		(accumulator, currentValue) => accumulator + currentValue,
		initialValue
	);
	return sumWithInitial;
}

// IIFE початок роботи на сторінці

(function start() {
	// Фетчіть дані з api
	updateDataOnPage();
})();
