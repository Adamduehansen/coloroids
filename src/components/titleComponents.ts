import { Comp } from 'kaboom';
import kctx from '../kctx';

const titleComponents: Comp[] = [
  kctx.text('COLOROIDS', {
    size: 64,
    font: 'sink',
  }),
  kctx.origin('center'),
  kctx.pos(kctx.width() / 2, 200),
];

export default titleComponents;
