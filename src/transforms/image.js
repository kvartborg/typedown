export default async function image (data) {
  const [url, ...caption] = data.split(' ')
  return '![' + (caption.length > 0 ? caption.join(' ') : url) + '](' + url + ')'
}
