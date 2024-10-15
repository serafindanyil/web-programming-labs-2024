import express from "express";
import cors from "cors";
import {
	getBanks,
	getBanksByAlphabet,
	getBanksByKeyword,
	getBanksByKeywordWithSortByAlphabet,
	getBank,
	createBank,
	updateBank,
	deleteBank,
} from "./database.js";

const app = express();

app.use(express.json());
// без корса не буде працювати бек з ріними доменами
app.use(cors());

// CRUD запити

// отримати всі банки
app.get("/bank", async (req, res) => {
	try {
		let allSortedBanks;

		switch (req.query.sort) {
			case "alphabet":
				allSortedBanks = await getBanksByAlphabet();
				break;
			default:
				allSortedBanks = await getBanks();
				break;
		}

		res.send(allSortedBanks);
	} catch (error) {
		res
			.status(500)
			.send({ message: "Failed to get all banks", error: error.message });
	}
});

// отримати всі банки по ключ слову
app.get("/bank/search", async (req, res) => {
	try {
		let allSortedBanksWithSearch;
		const keyword = req.query.keyword;

		if (req.query.sort) {
			allSortedBanksWithSearch = await getBanksByKeywordWithSortByAlphabet(
				keyword
			);
		} else {
			allSortedBanksWithSearch = await getBanksByKeyword(keyword);
		}

		res.send(allSortedBanksWithSearch);
	} catch (error) {
		res.status(500).send({
			message: "Failed to get banks by keyword ",
			error: error.message,
		});
	}
});

// отримати банк по ід
app.get("/bank/:id", async (req, res) => {
	try {
		const id = req.params.id;

		const bank = await getBank(id);
		res.send(bank);
	} catch (error) {
		res
			.status(500)
			.send({ message: "Failed to get bank with id", error: error.message });
	}
});

// створити банк
app.post("/bank", async (req, res) => {
	try {
		const { name, description, client_count, credit_taken_count } = req.body;

		const newBank = await createBank(
			name,
			description,
			client_count,
			credit_taken_count
		);
		res.status(201).send(newBank);
	} catch (error) {
		res
			.status(500)
			.send({ message: "Failed to create bank", error: error.message });
	}
});

// оновити банк
app.put("/bank", async (req, res) => {
	try {
		const { id, name, description, client_count, credit_taken_count } =
			req.body;

		const updBank = await updateBank(
			id,
			name,
			description,
			client_count,
			credit_taken_count
		);
		res.status(201).send(updBank);
	} catch (error) {
		res
			.status(500)
			.send({ message: "Failed to update bank", error: error.message });
	}
});

// видалити банк
app.delete("/bank/:id", async (req, res) => {
	try {
		const id = req.params.id;
		await deleteBank(id);
		res.status(201).send({ message: "Bank deleted successfully" }); // Відправляємо відповідь
	} catch (error) {
		res
			.status(500)
			.send({ message: "Failed to delete bank", error: error.message }); // Відправляємо помилку
	}
});

// інше
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send("Something broke!");
});

app.listen(8080, () => {
	console.log("Server is running on port 8080");
});
