import { proxy } from 'valtio';

const state = proxy({
    intro: true,
    color: '#EFBD48',
    isLogoTexture: true,
    isFullTexture: false,
    logoDecal: './react.png',
    fullDecal: './react.png',
    size: 0.15,
    positionX: 0,
    positionY: 0,
});

export default state;
