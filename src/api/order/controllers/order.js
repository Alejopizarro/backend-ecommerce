"use strict";

// @ts-ignore
const stripe = require("stripe")(process.env.STRIPE_KEY);
/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

// module.exports = createCoreController('api::order.order');

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    const { products, shippingInfo } = ctx.request.body;

    console.log("Datos recibidos:", ctx.request.body); // Depuración

    try {
      const lineItems = await Promise.all(
        products.map(async (product) => {
          const item = await strapi.entityService.findOne(
            "api::product.product",
            product.id
          );

          if (!item) {
            throw new Error(`Producto con ID ${product.id} no encontrado`);
          }

          return {
            price_data: {
              currency: "eur",
              product_data: {
                name: item.productName, // Acceso corregido
              },
              unit_amount: Math.round(item.price * 100), // Acceso corregido
            },
            quantity: 1,
          };
        })
      );

      console.log("Line items creados:", lineItems); // Depuración

      const session = await stripe.checkout.sessions.create({
        shipping_address_collection: { allowed_countries: ["ES"] },
        payment_method_types: ["card"],
        mode: "payment",
        success_url: process.env.CLIENT_URL + "/success",
        cancel_url: process.env.CLIENT_URL + "/successError",
        line_items: lineItems,
      });

      console.log("Sesión de Stripe creada:", session); // Depuración

      await strapi
        .service("api::order.order")
        .create({ data: { products, stripeId: session.id, shippingInfo } });

      return { stripeSession: session };
    } catch (error) {
      console.error("Error en el controlador:", error); // Depuración
      ctx.response.status = 500;
      return { error };
    }
  },
}));
