import { NextRequest } from "next/server";
import { products } from "@/app/product-data";
import { connectToDatabase } from "@/app/api/db";

type ShoppingCart = Record<string, string[]>;

const carts : ShoppingCart = {
    '1': ['123', '234'],
    '2': ['345'],
    // userId: [productId, productId, ...]
}

type Params = {
    id: string;
}

export async function GET(request: NextRequest, { params }: { params: Params }) {

    const { db } = await connectToDatabase();

    const getParams = await params;
    const userId = getParams.id;
    const userCart = await db.collection('carts').findOne({userId: userId});

    if(!userCart){
        return new Response(JSON.stringify([]), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    const cartIds = userCart.cartIds;
    const cartProducts = await db.collection('products').find({id: {$in: cartIds}}).toArray();

    return new Response(JSON.stringify(cartProducts), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

type CartBody = {
    productId: string;
}

export async function POST(request:NextRequest, { params }: { params: Params }) {
    const {db} = await connectToDatabase();

    const getParams = await params;
    const userId = getParams.id;

    const body: CartBody = await request.json();
    const { productId } = body;

    const updatedCart = await db.collection('carts').findOneAndUpdate(
        { userId: userId },
        { $push: { cartIds: productId } },
        { upsert: true, returnDocument: 'after' }
    );

    const cartProducts = await db.collection('products').find({id: {$in: updatedCart.cartIds}}).toArray();

    return new Response(JSON.stringify(cartProducts), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export async function DELETE(request:NextRequest, { params }: { params: Params }) {

    const {db} = await connectToDatabase();

    const getParams = await params;
    const userId = getParams.id;
    
    const body: CartBody = await request.json();
    const { productId } = body;

    console.log("Deleting productId: ", productId, " from userId: ", userId);
    

    const updatedCart = await db.collection('carts').findOneAndUpdate(
        { userId: userId },
        { $pull: { cartIds: productId } },
        { returnDocument: 'after' }
    );
    
    console.log("Carts after deletion: ", carts);
    
    const cartProducts = await db.collection('products').find({id: {$in: updatedCart.cartIds}}).toArray();

    return new Response(JSON.stringify(cartProducts), {
        status: 202,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}