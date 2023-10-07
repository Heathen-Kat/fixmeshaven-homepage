import {mongooseConnect} from "@/lib/mongoose";
import {Product} from "@/models/product";
import {Order} from "@/models/order";

const stripe = require('stripe')(process.env.STRIPE_SK);

export default async function handler(req,res) {
  if (req.method !== 'POST') {
    res.json('should be a POST request');
    return;
  }
  const {
    name,email,city,
    postalCode,streetAddress,country,
    cartProducts,
  } = req.body;
  await mongooseConnect();
  const productsIds = cartProducts;
  const uniqueIds = [...new Set(productsIds)];
  const productsInfos = await Product.find({_id:uniqueIds});

  let line_items = [];
  for (const productId of uniqueIds) {
    const productInfo = productsInfos.find(p => p._id.toString() === productId);
    const quantity = productsIds.filter(id => id === productId)?.length || 0;
    if (quantity > 0 && productInfo) {
      line_items.push({
        quantity,
        price_data: {
          currency: "USD",
          product_data: {name:productInfo.title},
          unit_amount: productInfo.price * 108,          
        },
      });
    }
  }

  const orderDoc = await Order.create({
    line_items,name,email,city,postalCode,
    streetAddress,country,paid:false,
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    allow_promotion_codes: true,
    customer_email:email,  
    billing_address_collection: 'auto',
    custom_fields: [{
      key: 'username',
      label: {
        type: 'custom',
        custom: 'Youtube Username'
      },
      type: 'text',
    },
    {
      key: 'status',
      label: {
        type: 'custom',
        custom: 'Ship or Rip',
      },      
      type: 'dropdown',
      dropdown: {
        options: [
          {
            label: 'Ship no rip',
            value: 'Ship',
          },
          {
            label: 'Hold then ship at end of month, no rip',
            value: 'ShipAndHold',
          },
          {
            label: 'Rip and Ship',
            value: 'RipAndShip',
          },
          {
            label: 'Rip, hold, and ship at end of month',
            value: 'RipAndHold',
          },
        ],
      },
    }],
   
    success_url: process.env.PUBLIC_URL + '/cart?success=1',
    cancel_url: process.env.PUBLIC_URL + '/cart?canceled=1',
    
    metadata: {orderId:orderDoc._id.toString()},
  });

  res.json({
    url:session.url,
  })

}
