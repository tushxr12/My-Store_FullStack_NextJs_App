import { NextRequest } from 'next/server';
import { connectToDatabase } from '../../db';

type Params = {
    id: String;
}

export async function GET(request: NextRequest, { params }: { params: Params }) {

    const { db } = await connectToDatabase();
    

    const getParams = await params;
    const productId = getParams.id;

    const product = await db.collection('products').findOne({id: productId});

    if (!product) {
        return new Response(JSON.stringify({ message: 'Product not found' }), {
            status: 404,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    return new Response(JSON.stringify(product), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}