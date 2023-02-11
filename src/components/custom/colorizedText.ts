import { Color, TextComp, TextCompOpt } from 'kaboom';
import kctx from '../../kctx';

const CHARACTER_COLORS = [
  kctx.RED,
  kctx.GREEN,
  kctx.BLUE,
  kctx.YELLOW,
  kctx.CYAN,
  kctx.MAGENTA,
];

let animationTimer = 0;

interface ColorizedText extends TextComp {}

function colorizedText(
  txt: string,
  options?: Omit<TextCompOpt, 'transform'>
): ColorizedText {
  const letterColors = new Array<Color>(txt.length).fill(kctx.WHITE).map(() => {
    return kctx.choose(CHARACTER_COLORS);
  });

  const optionsWithTransform: TextCompOpt = {
    ...options,
    transform: (index) => {
      if (animationTimer === 0) {
        letterColors[index] = kctx.choose(CHARACTER_COLORS);
      }

      return {
        color: letterColors[index],
      };
    },
  };

  const text = kctx.text(txt, optionsWithTransform);

  return {
    ...text,
    update: function () {
      animationTimer += kctx.dt();

      if (animationTimer > 0.25) {
        animationTimer = 0;
        return;
      }
    },
  };
}

export default colorizedText;
