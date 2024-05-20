import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, {
      message: "Product name is required",
    })
    .max(400, {
      message: "Max 400 charaters allowed",
    }),
  price: z.coerce.number().positive().min(1, {
    message: "Price is required",
  }),
  quantity: z.coerce
    .number({
      required_error: "Quantity is required",
      invalid_type_error: "Only numbers allowed",
    })
    .min(1),
  colorId: z.string().min(1, {
    message: "Product color is required",
  }),
  brandId: z.string().min(1, {
    message: "Brand is required",
  }),
});

export const brandSchema = z.object({
  name: z.string().trim().min(1, {
    message: "Brand name is required",
  }),
});

export const colorSchema = z.object({
  value: z.string().trim().min(1, {
    message: "Color value is required",
  }),
  name: z.string().trim().min(1, {
    message: "Color name is required",
  }),
});
export const settingsSchema = z.object({
  name: z.string().trim().min(1, {
    message: "Store name is required",
  }),
});

export const storeSchema = z.object({
  name: z.string().trim().min(1, {
    message: "Store name is required",
  }),
});
// images: z
//     .object({
//         url: z.string().min(1, {
//             message: "Product image is required",
//         }),
//     })
//     .array(),
// categoryId: z.string().min(1, {
//     message: "Category is required",
// sizeId: z.string().trim().optional(),
// description: z
//     .string()
//     .trim()
//     .max(2000, {
//         message: "max 2000 characters allowed",
//     })
//     .optional(),
// isFeatured: z.boolean().default(false).optional(),
// isArchived: z.boolean().default(false).optional(),
// ratings: z.coerce
//     .number()
//     .positive()
//     .min(1, "Enter between 1 and 5")
//     .max(5, "Enter between 1 and 5"),
