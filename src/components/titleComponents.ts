import { Comp } from 'kaboom';
import kctx from '../kctx';
import colorizedText from './custom/colorizedText';

const titleComponents: Comp[] = [
  colorizedText('COLOROIDS', {
    size: 64,
    font: 'sink',
  }),
  kctx.origin('center'),
  kctx.pos(kctx.width() / 2, 150),
];

export default titleComponents;
