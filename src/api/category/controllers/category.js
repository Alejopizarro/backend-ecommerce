"use strict";

/**
 *  category controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::category.category",
  ({ strapi }) => ({
    async find(ctx) {
      const { data, meta } = await super.find(ctx);

      const formattedData = data.map((category) => ({
        id: category.id,
        attributes: {
          categoryName: category.categoryName,
          slug: category.slug,
          createdAt: category.createdAt,
          updatedAt: category.updatedAt,
          publishedAt: category.publishedAt,
          isFeatured: category.isFeatured,
          mainImage: category.mainImage
            ? {
                id: category.mainImage.id,
                attributes: {
                  url: category.mainImage.url,
                  formats: category.mainImage.formats || null,
                },
              }
            : null,
        },
      }));

      return { data: formattedData, meta };
    },
  })
);
