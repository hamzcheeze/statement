import { connectToDatabase } from '../../util/mongodb';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
    try {
        const { db } = await connectToDatabase();
        const collection = await db.collection('expense');
        const documents = await collection
            .find({})
            .sort({ "date": -1 })
            .toArray();
        res.status(200).json(documents);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
