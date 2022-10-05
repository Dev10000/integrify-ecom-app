/**
 * JavaScript Intl
 * Intl.NumberFormat: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
 * Intl.NumberFormat() constructor: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#options
 * Intl: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locale_identification_and_negotiation
 */

/**
 * JavaScript: Language Tags (BCP 47)
 * Good read: https://www.techonthenet.com/js/language_tags.php
 * List of language, region and all other subtags: https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry
 *
 * BCP 47 Language Tags is the Internet Best Current Practices (BCP) for language tags.
 * The purpose of these language tags is to establish codes to help identify languages
 * both spoken and written. A language tag is composed of a sequence of one or more subtags
 * such as language, region, variant and script subtags. When a language tag is comprised
 * of more than one subtag, the subtag values are separated by the "-" character.
 *
 * You will most commonly find language tags written with 2 subtags - language and region.
 * For example: en-US
 *
 * The language tag "en-US" is composed 2 subtags separated by the "-" character.
 * The value "en" is the language subtag for English and the value "US" is the region subtag
 * for the United States. Therefore, the language tag "en-US" represents US English.
 *
 * However, language tags can also include additional subtags for variants and scripts,
 * for example: hy-Latn-IT-arevela
 *
 * The language tag above would represent Eastern Armenian written in Latin script, as used in Italy.
 *
 * Since it is impossible to list all of the BCP 47 language tags and their combinations,
 * we have provided a list of what we have found to be the most commonly used language tags
 * (defined using Language and Region subtags):
 */

/**
 * JSDoc: en.wikipedia.org/wiki/JSDoc
 */

/**
 * Formats number as currency
 *
 * @param {Number} value        12.12345...
 * @param {String} currency     'EUR' - The currency to use in currency formatting. Possible values are the ISO 4217 currency codes.
 * @param {String} locale       'en-US' - A string with a BCP 47 language. en-US = "language subtag"-"REGION SUBTAG"
 * @return {String}              Formated number as currency string
 *
 * An IETF BCP 47 language tag is a standardized code or tag that is used to identify human languages in the Internet.
 */
const numberCurrencyFormat = (
  value: number,
  currency = 'EUR',
  locale = 'en-EU',
): string =>
  new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);

/**
 * Random Star Rating for Products
 *
 * @param {Number} minRating     1
 * @param {Number} maxRating     5
 * @return {Number}              Random number between minRating and maxRating
 */
const randomStarRating = (minRating: number, maxRating: number): number =>
  Math.floor(Math.random() * (maxRating - minRating + 1)) + minRating;

export { numberCurrencyFormat, randomStarRating };
