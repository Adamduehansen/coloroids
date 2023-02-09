import startLabelComponents from './components/startLabelComponents';
import titleComponents from './components/titleComponents';
import kctx from './kctx';

function startGame(): void {
  kctx.go('gameScene');
}

export default function startScene(): void {
  kctx.add(titleComponents);
  kctx.add(startLabelComponents);

  kctx.onKeyRelease('space', startGame);
}
