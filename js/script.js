// Створити клас “Банк” котрий містить поля:
// - назва
// - кількість клієнтів
// - кількість виданих кредитів

class User {
	static userCount = 0;

	constructor(firstName, lastName) {
		this.firstName = firstName;
		this.lastName = lastName;

		User.userCount++;
	}

	get data() {
		return `${this.firstName} ${this.lastName}`;
	}

	get userCount() {
		return User.userCount;
	}
}

class BankOperation extends User {
	static creditCount = 0;

	constructor(firstName, lastName) {
		super(firstName, lastName); // Передаємо ім'я та прізвище батьківському класу
		this._creditLimit = 1000;
		this._balance = 0;
		this._credit = 0;
	}

	addToDeposit(count) {
		if (count > 0) {
			this._balance += count;
		} else {
			return console.log("Число має бути позитивне");
		}
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

const user1 = new BankOperation("Danyil", "Serafin");
user1.addToDeposit(100);
console.log(user1);

// class Bank {
// 	constructor(name, creditSum) {}
// }

// class Person {
//   constructor(name, age) {
//       this.name = name;
//       this.age = age;
//   }

//   greet() {
//       console.log(`Привіт, мене звуть ${this.name}`);
//   }
// }

// const john = new Person('John', 30);
// john.greet();  // Виведе: Привіт, мене звуть John
