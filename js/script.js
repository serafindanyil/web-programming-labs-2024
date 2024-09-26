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

class Bank {
	constructor(name) {
		this.name = name;
		this.clientCount = 0;
		this.givenCreditCount = 0;
	}

	get data() {
		return this.name;
	}
}

class BankManager {
	static bankObject = new Object();

	static addBank(name) {
		const isBankCreated = Object.keys(BankManager.bankObject).find(
			(bankName) => bankName === name
		);

		if (!isBankCreated) {
			const newBankObject = new Bank(name);
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
	} else if (page == "toMyBanks") {
		sectionMyBanks.classList.add("open");
		sectionCreateBank.classList.remove("open");
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

createBankForm.addEventListener("submit", function (event) {
	// const inputTitleEl = document.getElementById("inputTitle");
	// const inputDescriptionEl = document.getElementById("inputDescription");
	// const inputCountClientsEl = document.getElementById("inputCountClients");
	// const inputCreditTakenCountEl = document.getElementById(
	// 	"inputCreditTakenCount"
	// );
});
