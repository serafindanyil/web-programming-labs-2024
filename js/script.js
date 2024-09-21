// Створити клас “Банк” котрий містить поля:
// - назва
// - кількість клієнтів
// - кількість виданих кредитів

function selectedUser() {
	const selectElement = document.getElementById("selectUser");
	const selectedValue = selectElement.value;
	return selectedValue;
}

class User {
	constructor(name) {
		this.name = name;
	}

	data() {
		return this.name;
	}
}

class BankOperation extends User {
	static creditCount = 0;

	constructor(name) {
		super(name); // Передаємо ім'я та прізвище батьківському класу
		this._creditLimit = 1000;
		this._balance = 0;
		this._credit = 0;

		// this.updateData(`$ ${this._balance}`, "countMoney");
	}

	// updateData(value, selector) {
	// 	const updateValue = document.getElementById(selector);
	// 	updateValue.textContent = value;
	// }

	addToDeposit(count) {
		if (count > 0) {
			this._balance += count;
		} else {
			return console.log("Число має бути позитивне");
		}

		// this.updateData(`$ ${this._balance}`, "countMoney");
	}

	// Метод для зняття коштів
	withdrawFromDeposit(count) {
		if (count > 0 && this._balance >= count) {
			this._balance -= count;
		} else {
			return console.log("Недостатньо коштів на рахунку");
		}
	}

	takeCredit(count) {
		if (this._credit + count <= this._creditLimit) {
			if (count > 0) {
				this._balance += count;
				this._credit += count;
			} else {
				return console.log("Число має бути позитивне");
			}
		} else {
			return console.log("Перевищено кредитний ліміт");
		}

		BankOperation.creditCount++;
		// this.updateData(`$ ${this._balance}`, "countMoney");
	}

	addToCredit(count) {
		if (count > 0 && this._balance >= count && this._credit >= count) {
			this._balance -= count;
			this._credit -= count;
		} else {
			return console.log("Недостатньо коштів на рахунку");
		}
	}
}

class UserManager {
	static userObject = [];
	static userObjectNames = [];

	userCount() {
		return UserManager.userObject.length;
	}

	// Метод для додавання нового об'єкта User
	addUser(name) {
		const isUserInArray = UserManager.userObjectNames.find(
			(userName) => userName === name
		);

		if (!isUserInArray) {
			const user = new BankOperation(name);

			UserManager.userObject.push(user);
			UserManager.userObjectNames.push(name);

			return user; // Повертає створеного користувача
		} else {
			console.log("Користувач вже є!");
		}
	}

	// Метод для зміни властивості 'name' у User за індексом або іменем
	getUserByName(name) {
		const user = UserManager.userObject.find((user) => user.data() === name);
		return user;
	}

	listUsers() {
		return UserManager.userObjectNames;
	}
}

const newUser = new UserManager();

// Функція для загального обновлення даних, вона має таку конструкцію через те що,
// коли у нас display ноне все крім останнього елемента, при створенні юзерів викликається фунція обновлення даних і створюється ексепшииин
function updateData() {
	if (newUser.userCount() < 1) {
		console.log("Юзарів немає, створіть юзера щоб обновити дані");
	} else {
		let userIsSelected = selectedUser();

		const changeValue = document.getElementById("countUsers");
		changeValue.textContent = newUser.userCount();

		const creditLimit = document.getElementById("creditLimitValue");
		const accessCreditValue = document.getElementById("accessCreditValue");
		const counterUserCredit = document.getElementById("countUserTakeCredit");

		creditLimit.textContent = `$ ${
			newUser.getUserByName(userIsSelected)._creditLimit
		}`;
		accessCreditValue.textContent = `$ ${
			newUser.getUserByName(userIsSelected)._creditLimit -
			newUser.getUserByName(userIsSelected)._credit
		}`;

		counterUserCredit.textContent = BankOperation.creditCount;

		const updateValue = document.getElementById("countMoney");
		updateValue.textContent = `$ ${
			newUser.getUserByName(userIsSelected)._balance
		}`;

		const countUserPayToCredit = document.getElementById(
			"countUserPayToCredit"
		);
		countUserPayToCredit.textContent = `$ ${
			newUser.getUserByName(userIsSelected)._credit
		}`;

		// Оновлюємо ім`я юзера
		const nameOfUser = document.getElementById("nameOfUser");
		nameOfUser.textContent = newUser.getUserByName(userIsSelected).name;
	}
}

// Створити новий акаунт

// Події на клік створити юзера
document.getElementById("createUser").addEventListener("click", () => {
	const name = document.getElementById("userName").value;
	const changeValue = document.getElementById("countUsers");

	// Селект
	const addToSelectUser = document.getElementById("selectUser");

	// Створюємо новий елемент option
	const newOption = document.createElement("option");

	// Додавання юзера
	if (name.trim() === "") {
		console.log("Значення не має бути пустим");
	} else {
		newUser.addUser(name);
		// очищення інпуту
		document.getElementById("userName").value = "";
		// Додавання нового юзера до селекта
		newOption.value = name;
		newOption.text = name;
		// Оновлення лічильника
		// changeValue.textContent = newUser.userCount();
		//Додавання нового юзера до селекта
		addToSelectUser.add(newOption);
		// Оновлення лічильника функція

		if (newUser.userCount() >= 1) {
			// Коли у нас немає юзерів появляється тільки картка з створенням профілів
			const containerEl = document.querySelector(".container");

			containerEl.classList.remove("container--one-obj");
			containerEl.classList.add("container--many-obj");
		}

		updateData();
	}
});

// Події на клік взяти креди
document.getElementById("takeCredit").addEventListener("click", () => {
	const creditValue = document.getElementById("creditValue").value;
	const creditLimit = document.getElementById("creditLimitValue");
	const accessCreditValue = document.getElementById("accessCreditValue");
	const counterUserCredit = document.getElementById("countUserTakeCredit");
	let userIsSelected = selectedUser();

	// Додавання юзера
	if (creditValue.trim() === "") {
		console.log("Значення не має бути пустим");
	} else {
		newUser.getUserByName(userIsSelected).takeCredit(Number(creditValue));
		// очищення інпуту
		document.getElementById("creditValue").value = "";
		// Оновлення лічильника
		// creditLimit.textContent =
		// 	newUser.getUserByName(userIsSelected)._creditLimit;
		// accessCreditValue.textContent =
		// 	newUser.getUserByName(userIsSelected)._creditLimit -
		// 	newUser.getUserByName(userIsSelected)._credit;
		// counterUserCredit.textContent = BankOperation.creditCount;

		// Оновлення лічильника функція
		updateData();
	}
});

// Погасити кредит
document.getElementById("payToCredit").addEventListener("click", () => {
	const payToCreditValue = document.getElementById("payToCreditValue").value;

	let userIsSelected = selectedUser();

	// Додавання юзера
	if (payToCreditValue.trim() === "") {
		console.log("Значення не має бути пустим");
	} else {
		newUser.getUserByName(userIsSelected).addToCredit(Number(payToCreditValue));
		// очищення інпуту
		document.getElementById("payToCreditValue").value = "";

		// Оновлення лічильника функція
		updateData();
	}
});

const selectElement = document.getElementById("selectUser");

// Обновлює дані коли переключається між юзерами
selectElement.addEventListener("change", function () {
	updateData();
});

// Відслідковування кнопок коли нажимається ентер

// створити профіль
const userNameEl = document.getElementById("userName");
const createUserEl = document.getElementById("createUser");

// Відстежуємо натискання клавіш на input
userNameEl.addEventListener("keydown", function (event) {
	// Перевіряємо, чи натиснута клавіша Enter (код 13 або 'Enter')
	if (event.key === "Enter") {
		// Спрацьовує кнопка
		createUserEl.click();
	}
});

// Взяти кредит
const creditValueEl = document.getElementById("creditValue");
const takeCreditEl = document.getElementById("takeCredit");

// Відстежуємо натискання клавіш на input
creditValueEl.addEventListener("keydown", function (event) {
	// Перевіряємо, чи натиснута клавіша Enter (код 13 або 'Enter')
	if (event.key === "Enter") {
		// Спрацьовує кнопка
		takeCreditEl.click();
	}
});

// Погасити кредит
const payToCreditValueEl = document.getElementById("payToCreditValue");
const payToCreditEl = document.getElementById("payToCredit");

// Відстежуємо натискання клавіш на input
payToCreditValueEl.addEventListener("keydown", function (event) {
	// Перевіряємо, чи натиснута клавіша Enter (код 13 або 'Enter')
	if (event.key === "Enter") {
		// Спрацьовує кнопка
		payToCreditEl.click();
	}
});
