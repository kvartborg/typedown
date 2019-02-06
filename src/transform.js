import parse from './parse'

/**
 * Transform data
 * @param {String}  data   string to transform
 * @param {Object}  options transformation options
 * @return {String} output
 */
export default async function transform (data) {
  return await parse(data)
}
