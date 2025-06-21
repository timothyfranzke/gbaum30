import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with the secret key
// Note: In production, you should use environment variables for the API key
