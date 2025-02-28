"use strict";

/**
 * Product controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::product.product", ({ strapi }) => {
  // Función para formatear los datos de un producto
  const formatProduct = (product) => {
    return {
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
        category: product.category,
        isOffer: product.isOffer,
        oldPrice: product.oldPrice,
      },
    };
  };

  return {
    async find(ctx) {
      // Obtenemos los productos con la implementación por defecto de Strapi
      const { data, meta } = await super.find(ctx);

      // Formateamos cada producto
      const formattedData = data.map(formatProduct);

      return { data: formattedData, meta };
    },

    async findOne(ctx) {
      const { id } = ctx.params;

      // Obtenemos un solo producto con `entityService.findOne`
      const product = await strapi.entityService.findOne(
        "api::product.product",
        id,
        { populate: "*" }
      );

      if (!product) {
        return ctx.notFound("Product not found");
      }

      // Formateamos el producto antes de devolverlo
      return { data: formatProduct(product) };
    },
  };
});
