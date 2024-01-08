import { connectToDatabase } from '../../util/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const items = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'Invalid or empty array provided' });
  }

  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('expense');
    const result = await collection.insertMany(items);
    res.status(200).json({ 
      message: 'Data inserted successfully', 
      insertedIds: result.insertedIds,
      status: true
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
