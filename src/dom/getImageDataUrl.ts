export interface GetImageDataUrlOptions {
  readonly size?: number
  readonly type?: string
  readonly quality?: any
}

export default async function getImageDataUrl(src: string, options: GetImageDataUrlOptions = {}): Promise<string> {
  const { size = 1, type, quality } = options
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if(null === ctx) throw new Error(`Can't get canvas context`)
  
  const image = new Image()
  image.setAttribute('src', src)
  await image.decode()

  const imageWidth = image.naturalWidth
  const imageHeight = image.naturalHeight
  const ratio = imageWidth > imageHeight ? imageWidth / imageHeight : imageHeight / imageWidth
  const detalSize = size / ratio
  const [ width, height ] = imageWidth > imageHeight ? [ size, detalSize ] : [ detalSize, size ]

  canvas.setAttribute('width', width.toString())
  canvas.setAttribute('height', height.toString())
  image.setAttribute('width', width.toString())
  image.setAttribute('height', height.toString())

  ctx.drawImage(image, 0, 0, width, height)

  return canvas.toDataURL(type, quality)
}