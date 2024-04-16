import { svgPreloader } from "./svg.js";

export function createPreloader() {
    const preloaderBlock = document.createElement('div');
    const preloaderCircle = document.createElement('span');

    preloaderBlock.classList.add('preloader');
    preloaderCircle.classList.add('loader')
    preloaderCircle.id = 'loader';
    preloaderCircle.innerHTML = svgPreloader();

    preloaderBlock.append(preloaderCircle);

    return preloaderBlock;
};