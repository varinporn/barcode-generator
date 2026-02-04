import JsBarcode from "jsbarcode"

export const getBarcodeUrl = (value: string) => {
  if (!value) return ""

  const canvas = document.createElement("canvas")

  try {
    JsBarcode(canvas, value, {
      format: "CODE128",
      width: 2,
      height: 60,
      displayValue: false,
    })
  } catch (error) {
    console.error(error)
  }

  return canvas.toDataURL("image/png")
}
