import { changeUserRole } from "@/app/action";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
  typescript: true,
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

console.log("endpointSecret:", endpointSecret);
export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const sig: any = request.headers.get("stripe-signature");
    console.log("stripe-signature:", request.headers.get("stripe-signature"));

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
    } catch (err: any) {
      return new Response(`Webhook Error: ${err.message}`, {
        status: 400,
      });
    }

    console.log("event.type", JSON.stringify(event.type));

    if (event.type === "checkout.session.completed") {
      const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
        (event.data.object as any).id,
        { expand: ["line_items"] }
      );
      const lineItems = sessionWithLineItems.line_items;

      if (!lineItems)
        return new Response("Internal Server Error", { status: 500 });

      try {
        // Determine the role based on the price ID
        const priceId = lineItems.data[0].price!.id as string;
        let roleId;
        if (
          priceId === process.env.STRIPE_PRICE_PRO_MON ||
          priceId === process.env.STRIPE_PRICE_PRO_YEAR
        ) {
          roleId = process.env.AUTH0_ROLE_PRO as string;
        } else if (
          priceId === process.env.STRIPE_PRICE_BUSINESS_MON ||
          priceId === process.env.STRIPE_PRICE_BUSINESS_YEAR
        ) {
          roleId = process.env.AUTH0_ROLE_BUSINESS as string;
        } else {
          throw new Error("Unknown price ID");
        }
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata!.userId;
        await changeUserRole(userId, roleId);
      } catch (error) {
        console.log(error);
        return new Response((error as Error).message, { status: 500 });
      }
      return new Response("Success!", { status: 200 });
    }
    if (event.type === "customer.subscription.deleted") {
      const subscription = event.data.object as Stripe.Subscription;

      // Retrieve the customer
      const customer = (await stripe.customers.retrieve(
        subscription.customer as string
      )) as Stripe.Customer;

      // Retrieve the userId from the customer's metadata
      const userId = customer.metadata.userId;

      await changeUserRole(userId, process.env.AUTH0_ROLE_HOBBY!);

      return new Response("Subscription deleted", { status: 200 });
    }
    // Default response for unhandled event types
    return new Response("Event type not handled", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
