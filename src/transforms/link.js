export default function link (data) {
  const [url, ...caption] = data.split(' ')
  return '[' + (caption.length > 0 ? caption.join(' ') : url) + '](' + url + ')'
}
