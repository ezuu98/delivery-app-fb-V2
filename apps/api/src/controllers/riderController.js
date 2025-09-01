import { listRiders } from '../models/riderModel.js';
export function getRiders(_req, res) { return res.json(listRiders()); }
