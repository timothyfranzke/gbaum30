import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with the secret key
// Note: In production, you should use environment variables for the API key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16', // Use the latest API version or specify the one you need
});

export async function GET(request: NextRequest) {
  try {
    // Extract query parameters if needed
    const searchParams = request.nextUrl.searchParams;
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit') as string) : 100;
    const active = searchParams.get('active') === 'true' ? true : undefined;

    // Call the Stripe API to get products
    const products = await stripe.products.list({
      limit,
      active,
    });

    // Return the products as JSON
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products from Stripe:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    
    // Create a new product in Stripe
    const product = await stripe.products.create({
      name: body.name,
      description: body.description,
      images: body.images,
      active: body.active,
      metadata: body.metadata,
    });

    // Return the created product
    return NextResponse.json(product);
  } catch (error) {
    console.error('Error creating product in Stripe:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
