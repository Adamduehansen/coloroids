type ColorChannel = number;

export interface ColorChannels {
  r: ColorChannel;
  g: ColorChannel;
  b: ColorChannel;
}

function applyColorChannel(
  existingColor: ColorChannel,
  addedColorChannel: ColorChannel
): number {
  if (existingColor === 255) {
    return existingColor;
  }
  return existingColor + addedColorChannel;
}

function combineColors(
  colorA: ColorChannels,
  colorB: ColorChannels
): ColorChannels {
  if (colorA.r === 255 && colorA.g === 255 && colorA.b === 255) {
    return colorB;
  }

  const newColor: ColorChannels = structuredClone(colorA);
  newColor.r = applyColorChannel(newColor.r, colorB.r);
  newColor.g = applyColorChannel(newColor.g, colorB.g);
  newColor.b = applyColorChannel(newColor.b, colorB.b);

  return newColor;
}

export default combineColors;
