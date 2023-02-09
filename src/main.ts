import './style.css';
import gameScene from './gameScene';
import startScene from './startScene';

scene('gameScene', gameScene);
scene('startScene', startScene);

go('startScene');
