import express from "express";
import cors from "cors";
import {
	getBanks,
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

// список банків
app.get("/bank", async (req, res) => {
	const banks = await getBanks();

	res.send(banks);
});

// отримати банк по ід
app.get("/bank/:id", async (req, res) => {
	const id = req.params.id;

	const bank = await getBank(id);
	res.send(bank);
});

// створити банк
app.post("/bank", async (req, res) => {
	const { name, description, client_count, credit_taken_count } = req.body;

	const newBank = await createBank(
		name,
		description,
		client_count,
		credit_taken_count
	);
	res.status(201).send(newBank);
});

// оновити банк
app.put("/bank", async (req, res) => {
	const { id, name, description, client_count, credit_taken_count } = req.body;

	const updBank = await updateBank(
		id,
		name,
		description,
		client_count,
		credit_taken_count
	);
	res.status(201).send(updBank);
});

// видалити банк
app.delete("/bank/:id", async (req, res) => {
	const id = req.params.id;
	await deleteBank(id);
	res.status(201);
});

// інше
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send("Something broke!");
});

app.listen(8080, () => {
	console.log("Server is running on port 8080");
});
