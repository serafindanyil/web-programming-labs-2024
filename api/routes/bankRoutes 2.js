import express from "express";
import { getBanks, getBanksByAlphabet } from "../services/bankServices";

const router = express.Router();

// отримати всі банки
router.get("/bank", async (req, res) => {
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

export default router;
