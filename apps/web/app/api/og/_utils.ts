export async function loadGoogleFont(fontName: string): Promise<ArrayBuffer> {
  const fontUrl = `https://fonts.googleapis.com/css2?family=${fontName.replace(' ', '+')}&display=swap`

  const response = await fetch(fontUrl)
  const cssText = await response.text()

  const fontFaceMatch = cssText.match(/@font-face\s*{[^}]*}/)
  if (!fontFaceMatch) throw new Error(`Font face not found for ${fontName}`)

  const [fontFace] = fontFaceMatch
  const urlMatch = fontFace.match(/url\(([^)]+)\)/)
  if (!urlMatch) throw new Error(`Font URL not found for ${fontName}`)

  const fontFileUrl = urlMatch[1]?.replaceAll(/['"]/g, '')
  const fontResponse = await fetch(fontFileUrl ?? '')
  return await fontResponse.arrayBuffer()
}
