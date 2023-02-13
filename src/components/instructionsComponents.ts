import kctx from '../kctx';

const instructionsComponents = [
  kctx.text(
    `Instructions:
Use R, G, B to match the color of
the asteroid you want to destroy.
Reset color to White with W.
Control the spaceship with the
arrow keys and fire a rocket with
the space key 
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
