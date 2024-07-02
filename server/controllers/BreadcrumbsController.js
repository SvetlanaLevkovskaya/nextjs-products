import { generateData } from '../db.js';
import jsonServer from 'json-server';

const router = jsonServer.router(generateData());

export const getAllBreadcrumbs = async (req, res) => {
	try {
		const breadcrumbs = await router.db.get('breadcrumbs').value();
		res.json(breadcrumbs);
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Не удалось получить список хлебных крошек',
		});
	}
};

export const getFinalBreadcrumb = async (req, res) => {
	try {
		const breadcrumbs = await router.db.get('breadcrumbs').value();

		const randomIndex = Math.floor(Math.random() * breadcrumbs.length);

		res.json(breadcrumbs[randomIndex]);
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Не удалось получить конечную хлебную крошку',
		});
	}
};
