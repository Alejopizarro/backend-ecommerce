"use strict";

/**
 *  about controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::product.product", ({ strapi }) => ({
  async findOne(ctx) {
    const { id } = ctx.params; // Obtiene el ID de la URL

    // Busca el producto con el ID
    const entity = await strapi.entityService.findOne(
      "api::product.product",
      id,
      {
        populate: "*", // Popula todas las relaciones si existen
      }
    );

    if (!entity) {
      return ctx.notFound("Product not found");
    }

    return entity;
  },
}));
