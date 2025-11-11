import { NextRequest } from "next/server";
import { products } from "@/app/product-data";
import { use } from "react";

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

    const getParams = await params;
    const userId = getParams.id;
    const productIds = carts[userId as string];

    if(productIds === undefined){
        return new Response(JSON.stringify([]), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    const cartProducts = productIds.map(id => products.find(p => p.id === id));

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
    const getParams = await params;
    const userId = getParams.id;

    const body: CartBody = await request.json();
    const { productId } = body;

    carts[userId] = carts[userId] ? carts[userId].concat(productId) : [productId];
    const cartProducts = carts[userId].map(id => products.find(p => p.id === id));

    return new Response(JSON.stringify(cartProducts), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export async function DELETE(request:NextRequest, { params }: { params: Params }) {

    const getParams = await params;
    const userId = getParams.id;
    
    const body: CartBody = await request.json();
    const { productId } = body;

    console.log("Deleting productId: ", productId, " from userId: ", userId);
    

    carts[userId] = carts[userId] ? carts[userId].filter(id => id !== productId) : [];
    console.log("Carts after deletion: ", carts);
    
    const cartProducts = carts[userId].map(id => products.find(p => p.id === id));

    return new Response(JSON.stringify(cartProducts), {
        status: 202,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}