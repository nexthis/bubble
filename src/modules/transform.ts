import anime from 'animejs';
import { wait } from '../helpers/wait';

export const move = (element: HTMLElement, position: {x: number, y: number}) => {
    let point =  {x: position.x - element.clientWidth / 2, y: position.y - element.clientHeight / 2}
    anime({targets: element, translateX: point.x, translateY: point.y, duration: 200  })
} 


export const dock = (element: HTMLElement, position: {x: number, y: number}) => {
    console.log(window.innerHeight, window.innerWidth);
    
}