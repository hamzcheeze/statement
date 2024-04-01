import { connectToDatabase } from '../../util/mongodb';
import { URLSearchParams } from 'url';

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// sample url = http://localhost:3000/api/getbyperiod?startDate=2024-03-01&endDate=2024-03-31&type=food
export default async function handler(req, res) {
    const urlParams = new URLSearchParams(req.url.split('?')[1]);
    const startDate = urlParams.get('startDate');
    const endDate = urlParams.get('endDate');
    const type = urlParams.get('type');
    const newType = capitalizeFirstLetter(type.toLowerCase());

    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
    try {
        const { db } = await connectToDatabase();
        const collection = await db.collection('expense');
        const matchStage = {
            date: {
                $gte: startDate,
                $lte: endDate
            }
        };
        if (type !== 'All') {
            matchStage.type = newType;
        }
        const documents = await collection.aggregate([
            {
                $match: matchStage
            },
            {
                $group: {
                    _id: null,
                    totalAmount: {
                        $sum: {
                            $toInt: "$amount"
                        }
                    }
                }
            }
        ]).toArray();
        res.status(200).json(documents);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
