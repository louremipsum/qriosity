import { NextRequest } from "next/server";
import Stripe from "stripe";
import { getSession } from "@auth0/nextjs-auth0";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

interface StripeError {
  statusCode: number;
  message: string;
}

export async function POST(request: Request) {
  try {
    const sessionToCheck = await getSession();

    // If the user is not authenticated, return a 401 Unauthorized response
    if (!sessionToCheck) {
      return new Response("Unauthorized", { status: 401 });
    }
    const { userId, priceId, email, name } = await request.json();
    const { data: existingCustomers } = await stripe.customers.list({
      email: email,
    });

    let customerId;

    if (existingCustomers.length) {
      // If customers with the provided email exist, filter them by userId
      const customer = existingCustomers.find(
        (c) => c.metadata.userId === userId
      );

      if (customer) {
        // If a customer with the provided email and userId exists, use their ID
        customerId = customer.id;
      } else {
        // If no customer exists with the provided email and userId, create a new one
        const newCustomer = await stripe.customers.create({
          email: email,
          name: name,
          metadata: {
            userId,
          },
        });
        customerId = newCustomer.id;
      }
    } else {
      // If no customer exists with the provided email, create a new one
      const newCustomer = await stripe.customers.create({
        email: email,
        metadata: {
          userId,
        },
      });
      customerId = newCustomer.id;
    }

    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      customer: customerId,
      line_items: [
        {
          price: process.env[priceId],
          quantity: 1,
          tax_rates: ["txr_1OclJCSAUX9bbM3jPaltmlgC"],
        },
      ],
      mode: "subscription",
      allow_promotion_codes: true,

      billing_address_collection: "auto",
      metadata: {
        userId,
      },
      return_url: `${request.headers.get(
        "origin"
      )}/return?session_id={CHECKOUT_SESSION_ID}`,
      consent_collection: {
        terms_of_service: "required",
      },
      custom_text: {
        terms_of_service_acceptance: {
          message:
            "I agree to the [Terms of Service](https://qriosityx.vercel.app/terms-of-service) and [Privacy Policy](https://qriosityx.vercel.app/privacy)",
        },
      },
    });

    return Response.json({ sessionId: session.id });
  } catch (err) {
    console.error(err);
    const { statusCode, message } = err as StripeError;
    return new Response(message, { status: statusCode || 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const sessionToCheck = await getSession();

    // If the user is not authenticated, return a 401 Unauthorized response
    if (!sessionToCheck) {
      return new Response("Unauthorized", { status: 401 });
    }
    const sessionId = request.nextUrl.searchParams.get("session_id");

    const session = await stripe.checkout.sessions.retrieve(
      sessionId as string
    );

    return Response.json({
      status: session.status,
      customer_email: session.customer_details?.email,
    });
  } catch (err) {
    const { statusCode, message } = err as StripeError;
    return new Response(message, { status: statusCode || 500 });
  }
}
