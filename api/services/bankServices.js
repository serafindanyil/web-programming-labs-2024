import pool from "../config/database.js";
import parseBank from "../models/bankModels.js";

async function getBanks() {
	const [rows] = await pool.query(`
    SELECT
    bank.id,
    bank.title,
    bank.description,
    bank.img_src AS imgSrc,
    bank.bond_price AS bondPrice,
    GROUP_CONCAT(DISTINCT bond_percentages.percentage ORDER BY bond_percentages.percentage ASC) AS bondPercent,
    GROUP_CONCAT(DISTINCT bank_characteristics.characteristic ORDER BY bank_characteristics.characteristic ASC) AS charArray
FROM
    bank
LEFT JOIN
    bank_has_bond_percentages ON bank.id = bank_has_bond_percentages.bank_id
LEFT JOIN
    bond_percentages ON bank_has_bond_percentages.bond_percentages_id = bond_percentages.id
LEFT JOIN
    bank_characteristics ON bank.id = bank_characteristics.bank_id
GROUP BY
    bank.id;

    `);
	const finishBanks = parseBank(rows);
	return finishBanks;
}

async function getBanksByAlphabet() {
	const [rows] = await pool.query(`
    SELECT
    bank.id,
    bank.title,
    bank.description,
    bank.img_src AS imgSrc,
    bank.bond_price AS bondPrice,
    GROUP_CONCAT(DISTINCT bond_percentages.percentage ORDER BY bond_percentages.percentage ASC) AS bondPercent,
    GROUP_CONCAT(DISTINCT bank_characteristics.characteristic ORDER BY bank_characteristics.characteristic ASC) AS charArray
FROM
    bank
LEFT JOIN
    bank_has_bond_percentages ON bank.id = bank_has_bond_percentages.bank_id
LEFT JOIN
    bond_percentages ON bank_has_bond_percentages.bond_percentages_id = bond_percentages.id
LEFT JOIN
    bank_characteristics ON bank.id = bank_characteristics.bank_id
GROUP BY
    bank.id
ORDER BY
    bank.title ASC;
    `);
	const finishBanks = parseBank(rows);
	return finishBanks;
}

async function getBanksByKeyword(key) {
	const formatedKeyword = `%${key}%`;
	const [rows] = await pool.query(
		`
		SELECT
			bank.id,
			bank.title,
			bank.description,
			bank.img_src AS imgSrc,
			bank.bond_price AS bondPrice,
			GROUP_CONCAT(DISTINCT bond_percentages.percentage ORDER BY bond_percentages.percentage ASC) AS bondPercent,
			GROUP_CONCAT(DISTINCT bank_characteristics.characteristic ORDER BY bank_characteristics.characteristic ASC) AS charArray
		FROM
			bank
		LEFT JOIN
			bank_has_bond_percentages ON bank.id = bank_has_bond_percentages.bank_id
		LEFT JOIN
			bond_percentages ON bank_has_bond_percentages.bond_percentages_id = bond_percentages.id
		LEFT JOIN
			bank_characteristics ON bank.id = bank_characteristics.bank_id
		WHERE
			bank.title LIKE ?
		GROUP BY
			bank.id;
		`,
		[formatedKeyword]
	);
	const finishBanks = parseBank(rows);
	return finishBanks;
}

async function getBanksByKeywordWithSortByAlphabet(key) {
	const formatedKeyword = `%${key}%`;
	const [rows] = await pool.query(
		`
		SELECT
			bank.id,
			bank.title,
			bank.description,
			bank.img_src AS imgSrc,
			bank.bond_price AS bondPrice,
			GROUP_CONCAT(DISTINCT bond_percentages.percentage ORDER BY bond_percentages.percentage ASC) AS bondPercent,
			GROUP_CONCAT(DISTINCT bank_characteristics.characteristic ORDER BY bank_characteristics.characteristic ASC) AS charArray
		FROM
			bank
		LEFT JOIN
			bank_has_bond_percentages ON bank.id = bank_has_bond_percentages.bank_id
		LEFT JOIN
			bond_percentages ON bank_has_bond_percentages.bond_percentages_id = bond_percentages.id
		LEFT JOIN
			bank_characteristics ON bank.id = bank_characteristics.bank_id
		WHERE
			bank.title LIKE ?
		GROUP BY
			bank.id
		ORDER BY
			bank.title ASC;
		`,
		[formatedKeyword]
	);
	const finishBanks = parseBank(rows);
	return finishBanks;
}

async function getBank(id) {
	const [rows] = await pool.query(
		`
		SELECT
			bank.id,
			bank.title,
			bank.description,
			bank.img_src AS imgSrc,
			bank.bond_price AS bondPrice,
			GROUP_CONCAT(DISTINCT bond_percentages.percentage ORDER BY bond_percentages.percentage ASC) AS bondPercent,
			GROUP_CONCAT(DISTINCT bank_characteristics.characteristic ORDER BY bank_characteristics.characteristic ASC) AS charArray
		FROM
			bank
		LEFT JOIN
			bank_has_bond_percentages ON bank.id = bank_has_bond_percentages.bank_id
		LEFT JOIN
			bond_percentages ON bank_has_bond_percentages.bond_percentages_id = bond_percentages.id
		LEFT JOIN
			bank_characteristics ON bank.id = bank_characteristics.bank_id
		WHERE 
			bank.id = ?
		GROUP BY
			bank.id;
		`,
		[id]
	);
	const finishBanks = parseBank(rows);
	return finishBanks[0];
}

async function createBank(name, description, client_count, credit_taken_count) {
	const [result] = await pool.query(
		"INSERT INTO bank (name, description, client_count, credit_taken_count) VALUES (?, ?, ?, ?)",
		[name, description, client_count, credit_taken_count]
	);

	const id = result.insertId;

	return getBank(id);
}

async function updateBank(
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

async function deleteBank(id) {
	await pool.query("DELETE FROM bank WHERE id = ?", [id]);
}

export default {
	getBanks,
	getBanksByAlphabet,
	getBanksByKeyword,
	getBanksByKeywordWithSortByAlphabet,
	getBank,
	createBank,
	updateBank,
	deleteBank,
};
