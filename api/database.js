import mysql from "mysql2";

import dotenv from "dotenv";
dotenv.config();

const pool = mysql
	.createPool({
		host: process.env.MYSQL_HOST,
		user: process.env.MYSQL_USER,
		password: process.env.MYSQL_PASSWORD,
		database: process.env.MYSQL_DATABASE,
	})
	.promise();

export async function getBanks() {
	const [rows] = await pool.query("SELECT * FROM bank");
	return rows;
}

export async function getBank(id) {
	const [rows] = await pool.query("SELECT * FROM bank WHERE id = ?", [id]);
	return rows[0];
}

export async function createBank(
	name,
	description,
	client_count,
	credit_taken_count
) {
	const [result] = await pool.query(
		"INSERT INTO bank (name, description, client_count, credit_taken_count) VALUES (?, ?, ?, ?)",
		[name, description, client_count, credit_taken_count]
	);

	const id = result.insertId;

	return getBank(id);
}

export async function updateBank(
	id,
	name = null,
	description = null,
	client_count = null,
	credit_taken_count = null
) {
	const queryParams = [];
	const queryParts = [];

	if (name !== null) {
		queryParts.push("name = ?");
		queryParams.push(name);
	}
	if (description !== null) {
		queryParts.push("description = ?");
		queryParams.push(description);
	}
	if (client_count !== null) {
		queryParts.push("client_count = ?");
		queryParams.push(client_count);
	}
	if (credit_taken_count !== null) {
		queryParts.push("credit_taken_count = ?");
		queryParams.push(credit_taken_count);
	}

	if (queryParts.length === 0) {
		return { message: "No fields to update" };
	}

	const queryString = `UPDATE bank SET ${queryParts.join(", ")} WHERE id = ?`;

	// Додаємо id в кінець
	queryParams.push(id);

	await pool.query(queryString, queryParams);

	return getBank(id);
}

export async function deleteBank(id) {
	await pool.query("DELETE FROM bank WHERE id = ?", [id]);
}
