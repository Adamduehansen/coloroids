import './style.css';
import gameScene from './scenes/gameScene';
import startScene from './scenes/startScene';

scene('gameScene', gameScene);
scene('startScene', startScene);

go('startScene');
