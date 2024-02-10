import { changeUserRole } from "@/app/action";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
  typescript: true,
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

/**
 * Handles the POST request for the Stripe webhook endpoint.
 *
 * @param request - The incoming request object.
 * @returns A response object based on the event type received.
 */
export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const sig: any = request.headers.get("stripe-signature");

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
      return handleCheckoutSessionCompletedEvent(event);
    }
    if (event.type === "customer.subscription.deleted") {
      return handleCustomerSubscriptionDeletedEvent(event);
    }
    if (event.type === "customer.subscription.updated") {
      return handleCustomerSubscriptionUpdatedEvent(event);
    }

    return new Response("Event type not supported", { status: 400 });
  } catch (error) {
    console.log(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

/**
 * Handles the completion event of a checkout session. Checks the line items of the session to
 * determine the role of the user and updates the user's role in Auth0.
 * @param event - The Stripe event object.
 * @returns A response indicating the success or failure of the operation.
 */
async function handleCheckoutSessionCompletedEvent(event: Stripe.Event) {
  const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
    (event.data.object as any).id,
    { expand: ["line_items"] }
  );
  const lineItems = sessionWithLineItems.line_items;

  if (!lineItems) return new Response("Internal Server Error", { status: 500 });

  try {
    const priceId = lineItems.data[0].price!.id as string;
    const roleId = determineRoleId(priceId);
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata!.userId;
    await changeUserRole(userId, roleId);
    return new Response("Success!", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response((error as Error).message, { status: 500 });
  }
}

/**
 * Handles the event when a customer subscription is deleted. When a subscription is deleted, the user's
 * role in Auth0 is changed to "hobby".
 *
 * @param event - The Stripe event object.
 * @returns A response indicating the success of handling the event.
 */
async function handleCustomerSubscriptionDeletedEvent(event: Stripe.Event) {
  const subscription = event.data.object as Stripe.Subscription;
  const customer = await retrieveCustomer(subscription.customer as string);
  const userId = customer.metadata.userId;
  await changeUserRole(userId, process.env.AUTH0_ROLE_HOBBY!);
  return new Response("Subscription deleted", { status: 200 });
}

/**
 * Handles the customer subscription updated event. When a subscription is updated, the subscription status is checked
 * to determine the user's role in Auth0. If the subscription is `cancelled`, `past_due`, or `unpaid`, the user's role is changed
 * to `hobby`. If the subscription is `active`, the user's role is updated based on the subscription price ID.
 *
 * @param event - The Stripe event object.
 * @returns A response indicating the result of the subscription update.
 */
async function handleCustomerSubscriptionUpdatedEvent(event: Stripe.Event) {
  const subscription = event.data.object as Stripe.Subscription;
  const customer = await retrieveCustomer(subscription.customer as string);
  const userId = customer.metadata.userId;
  const validStatuses = ["canceled", "past_due", "unpaid"];
  if (validStatuses.includes(subscription.status)) {
    await changeUserRole(userId, process.env.AUTH0_ROLE_HOBBY!);
    return new Response("Subscription cancelled or past due", {
      status: 200,
    });
  } else if (subscription.status === "active") {
    const priceId = subscription.items.data[0].price.id;
    const roleId = determineRoleId(priceId);
    await changeUserRole(userId, roleId);
    return new Response("Subscription renewed", { status: 200 });
  }
  return new Response("Subscription status not supported", { status: 400 });
}

/**
 * Determines the role ID in Auth0 based on the given price ID from Stripe Item.
 * @param priceId - The price ID to determine the role ID for.
 * @returns The role ID corresponding to the given price ID.
 * @throws {Error} If the price ID is unknown.
 */
function determineRoleId(priceId: string): string {
  if (
    priceId === process.env.STRIPE_PRICE_PRO_MON ||
    priceId === process.env.STRIPE_PRICE_PRO_YEAR
  ) {
    return process.env.AUTH0_ROLE_PRO as string;
  } else if (
    priceId === process.env.STRIPE_PRICE_BUSINESS_MON ||
    priceId === process.env.STRIPE_PRICE_BUSINESS_YEAR
  ) {
    return process.env.AUTH0_ROLE_BUSINESS as string;
  } else {
    throw new Error("Unknown price ID");
  }
}

/**
 * Retrieves a customer from Stripe.
 * @param customerId The ID of the customer to retrieve.
 * @returns A promise that resolves to the retrieved customer.
 */
async function retrieveCustomer(customerId: string): Promise<Stripe.Customer> {
  return stripe.customers.retrieve(customerId) as Promise<Stripe.Customer>;
}
