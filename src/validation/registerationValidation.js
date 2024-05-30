import Joi from "joi";

import { validateEmailLogin, validatePasswordLogin } from "./logInValidation";

const firstSchema = Joi.object({
  first: Joi.string().min(2).max(256).required(),
});
const middleSchema = Joi.object({
  middle: Joi.string().min(2).max(256).allow(""),
});
const lastSchema = Joi.object({
  last: Joi.string().min(2).max(256).required(),
});
const phoneSchema = Joi.object({
  phone: Joi.string().min(9).max(11).required(),
});
const urlSchema = Joi.object({
  url: Joi.string().min(14).allow(""),
});
const altSchema = Joi.object({
  alt: Joi.string().min(2).max(256).allow(""),
});
const stateSchema = Joi.object({
  state: Joi.string().min(2).max(256).allow(""),
});
const countrySchema = Joi.object({
  country: Joi.string().min(2).max(256).required(),
});
const citySchema = Joi.object({
  city: Joi.string().min(2).max(256).required(),
});
const streetSchema = Joi.object({
  street: Joi.string().min(2).max(256).required(),
});
const houseNumberSchema = Joi.object({
  houseNumber: Joi.number().min(2).max(256).required(),
});
const zipSchema = Joi.object({
  zip: Joi.number().min(100000).max(10000000).required(),
});
const isBusinessSchema = Joi.object({
  isBusiness: Joi.boolean().required(),
});

const validateFirst = (first) => firstSchema.validate(first);
const validateMiddle = (middle) => middleSchema.validate(middle);
const validateLast = (last) => lastSchema.validate(last);
const validatePhone = (phone) => phoneSchema.validate(phone);
const validateUrl = (url) => urlSchema.validate(url);
const validateAlt = (alt) => altSchema.validate(alt);
const validateState = (state) => stateSchema.validate(state);
const validateCountry = (country) => countrySchema.validate(country);
const validateCity = (city) => citySchema.validate(city);
const validateStreet = (street) => streetSchema.validate(street);
const validateHouseNumber = (houseNumber) =>
  houseNumberSchema.validate(houseNumber);
const validateZip = (zip) => zipSchema.validate(zip);
const validateIsBusiness = (isBusiness) =>
  isBusinessSchema.validate({ isBusiness });

const validateSchema = {
  first: validateFirst,
  middle: validateMiddle,
  last: validateLast,
  email: validateEmailLogin,
  password: validatePasswordLogin,
  phone: validatePhone,
  url: validateUrl,
  alt: validateAlt,
  state: validateState,
  country: validateCountry,
  city: validateCity,
  street: validateStreet,
  houseNumber: validateHouseNumber,
  zip: validateZip,
  isBusiness: validateIsBusiness,
};

export { validateSchema };
