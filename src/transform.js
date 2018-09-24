import transforms from './transforms'
import EventEmitter from 'events'
import parse from './parse'

/**
 * Transform data
 * @param {String}  data   string to transform
 * @param {Object}  options transformation options
 * @return {String} output
 */
export default function transform (data) {
  for (const transform of transforms) {
    data = parse(transform.name, data, transform)
  }

  return data
}