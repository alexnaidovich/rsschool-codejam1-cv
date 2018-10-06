/**
 * Application entry point
 */
import 'styles/index.scss';

// ================================
// START YOUR APP HERE
// ================================
const Flickity = require('flickity');

window.onload = () => {
    const pfSlider = new Flickity('#portfolio', {
        cellAlign: 'left',
    });
}