export const createValidVideoUrl = (url: string) => {
  const lastPath = url.slice(url.lastIndexOf('/'))
  return `https://www.youtube.com/embed${lastPath}`
}
