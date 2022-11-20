import { validateHTMLColorHex, validateHTMLColorName, validateHTMLColorSpecialName } from '../utils/validate-color'

type QueryParams = { color?: string }
type Params = { icon: string }

const warningSvg = '<svg width="64" height="64" viewBox="0 0 256 256"><path fill="#eab308" d="M236.7 188L148.8 36a24 24 0 0 0-41.6 0L19.3 188A23.9 23.9 0 0 0 40 224h176a23.9 23.9 0 0 0 20.7-36ZM120 104a8 8 0 0 1 16 0v40a8 8 0 0 1-16 0Zm8 88a12 12 0 1 1 12-12a12 12 0 0 1-12 12Z"/></svg>'

const fetchIcon = async (prefix: string, icon: string) => {
  return $fetch<Blob>(`https://api.iconify.design/${prefix}/${icon}.svg`)
    .then(blob => blob.text())
}

export default defineEventHandler(async (event) => {
  const { color } = getQuery(event) as QueryParams

  const { icon } = event.context.params as Params
  const [prefix, iconName] = icon.split(':')

  try {
    const svgString = await fetchIcon(prefix, iconName)

    if (!color) {
      // TODO: not working
      return send(event, svgString, 'image/svg+xml')
    }

    let parsedColor = null

    if (validateHTMLColorName(color) || validateHTMLColorSpecialName(color)) {
      parsedColor = color
    }
    else {
      const hexWithHash = `#${color}`
      if (validateHTMLColorHex(hexWithHash))
        parsedColor = hexWithHash
    }

    const coloredSvg = parsedColor
      ? svgString.replace(/currentColor/g, parsedColor)
      : svgString

    return send(event, coloredSvg, 'image/svg+xml')
  }
  catch (err) {
    return send(event, warningSvg, 'image/svg+xml')
  }
})
