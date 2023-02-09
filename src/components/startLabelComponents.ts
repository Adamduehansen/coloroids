import { Comp } from 'kaboom';
import kctx from '../kctx';
import flashing from './custom/flashing';

const startLabelComponents: Comp[] = [
  kctx.text('Press space to start', {
    size: 24,
    font: 'sink',
  }),
  kctx.origin('center'),
  kctx.pos(kctx.width() / 2, 400),
  flashing(0.5),
];

export default startLabelComponents;
