import { mongooseConnect } from "@/lib/mongoose";
const stripe = require('stripe')(process.env.STRIPE_SK);
import { buffer } from "micro";
import { Order } from "@/models/order";

const endpointSecret = "whsec_331dc2cfb98580a24207845d14a1060e3ff64a9ba0e0453ff60c9ccba979f2ec";

export default async function handler(req,res) {
    await mongooseConnect();
    const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(await buffer(req), sig, endpointSecret);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const data = event.data.object;
      const orderId = data.metadata.orderId;
      const paid = data.payment_status === 'paid';
      if (orderId && paid) {
        await Order.findByIdAndUpdate(orderId,{
          paid:true,
        })
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).send('ok');
}

export const config = {
    api: {bodyParser:false,}
  };