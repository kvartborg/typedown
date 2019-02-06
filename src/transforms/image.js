export default async function image (path, caption) {
  return '![' + (caption ? caption : path) + '](' + path + ')'
}
