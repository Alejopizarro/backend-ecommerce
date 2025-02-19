"use strict";

/**
 * product controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::product.product", ({ strapi }) => ({
  async find(ctx) {
    // Llamamos a la implementación predeterminada de Strapi
    const { data, meta } = await super.find(ctx);

    // Modificamos la estructura de la respuesta
    const formattedData = data.map((product) => ({
      id: product.id,
      attributes: {
        productName: product.productName,
        slug: product.slug,
        description: product.description,
        active: product.active,
        price: product.price,
        brand: product.brand,
        size: product.size,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
        publishedAt: product.publishedAt,
        isFeatured: product.isFeatured,
        images: {
          data: product.images
            ? product.images.map((img) => ({
                id: img.id,
                attributes: { url: img.url },
              }))
            : [],
        },
      },
    }));

    return { data: formattedData, meta };
  },
}));
