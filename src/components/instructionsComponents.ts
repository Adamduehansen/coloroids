import kctx from '../kctx';

const instructionsComponents = [
  kctx.text(
    `Instructions:
Use R, G, B to match the color of
the asteroid you wish to destroy.
Control the spaceship with the
arrow keys and fire a rocket with
space
  `,
    {
      size: 18,
      font: 'sink',
      lineSpacing: 10,
    }
  ),
  kctx.origin('center'),
  kctx.pos(kctx.width() / 2, 300),
];

export default instructionsComponents;
