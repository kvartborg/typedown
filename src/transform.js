import transforms from './transforms'
import parse from './parse'

/**
 * Transform data
 * @param {String}  data   string to transform
 * @param {Object}  options transformation options
 * @return {String} output
 */
export default async function transform (data) {
  for (const transform of Object.values(transforms)) {
    data = await parse(transform.name, data, transform)
  }

  return data
}
