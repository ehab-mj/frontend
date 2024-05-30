import Joi from "joi";
import { validateEmailLogin } from "./logInValidation";

const titleSchema = Joi.object({
  title: Joi.string().min(2).max(256).required(),
});
const descriptionSchema = Joi.object({
  description: Joi.string().min(2).max(1024).required(),
});
const categorySchema = Joi.object({
  category: Joi.string().min(2).max(1024).required(),
});
const ratingSchema = Joi.object({
  rating: Joi.number().min(1).max(5).allow(""),
});
const discountSchema = Joi.object({
  discount: Joi.number().min(0).max(100).allow(""),
});
const priceSchema = Joi.object({
  price: Joi.number().min(0).max(1000).required(),
});
const urlSchema = Joi.object({
  url: Joi.string().min(14).allow(""),
});
const altSchema = Joi.object({
  alt: Joi.string().min(2).max(256).allow(""),
});
const trailerSchema = Joi.object({
  trailer: Joi.string()
    .uri({ scheme: ["http", "https"] })
    .min(14)
    .allow(""),
});

const validateTitle = (title) => titleSchema.validate(title);
const validateDescription = (description) =>
  descriptionSchema.validate(description);
const validateCategorySchema = (category) => categorySchema.validate(category);
const validateRating = (rating) => ratingSchema.validate(rating);
const validateDiscount = (discount) => discountSchema.validate(discount);
const validatePrice = (price) => priceSchema.validate(price);
const validateTrailerSchema = (trailer) => trailerSchema.validate(trailer);
const validateUrl = (url) => urlSchema.validate(url);
const validateAlt = (alt) => altSchema.validate(alt);
const validateTrailer = (trailer) => trailerSchema.validate(trailer);

const validateSchema = {
  title: validateTitle,
  description: validateDescription,
  category: validateCategorySchema,
  trailer: validateTrailerSchema,
  rating: validateRating,
  discount: validateDiscount,
  price: validatePrice,
  url: validateUrl,
  alt: validateAlt,
  trailer: validateTrailer,
};

export default validateSchema;
