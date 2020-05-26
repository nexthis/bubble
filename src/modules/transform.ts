import gsap from 'gsap';
import { wait } from '../helpers/wait';

export const move = (element: HTMLElement, position: {x: number, y: number}) => {
    let point =  {x: position.x - element.clientWidth / 2, y: position.y - element.clientHeight / 2}
    ///element.style.transform = `translateX(${point.x}px) translateY(${point.y}px)`;

    gsap.to(element, 0.1, {x: point.x, y:point.y})
} 




export const dock = (element: HTMLElement, position: {x: number, y: number} | null, dock: Array<[number, number]>) => {
    position = position === null  ? {x: element.getBoundingClientRect().x, y: element.getBoundingClientRect().y} : position;


    // calculate the window size with a percentage
    const points = dock.map((item) => {
        return [(window.innerWidth - element.clientWidth) * (item[0] / 100), (window.innerHeight - element.clientHeight) * (item[1] / 100)]
    })

    // find nearly point like https://stackoverflow.com/questions/56306097/get-nearest-point-from-another-one-in-javascript
    const distance = (point: {x: number, y: number}) => {
        ///@ts-ignore
        return Math.pow(position.x - point.x, 2) + Math.pow(position.y - point.y, 2);
    }
    
    const near = points.reduce((a, b) => distance({x: a[0], y:a[1]}) < distance({x: b[0], y:b[1]}) ? a : b)
    
    gsap.to(element, 0.6, {x: near[0], y: near[1], ease: "back.out(3)"})
    
}


export const toggle = (element: HTMLElement, state: boolean) => {
    const elements = element.querySelectorAll('.bubble__menu-item');
    state ?
    gsap.to(elements, 0.2 , {x: (i) => Math.sin((60 * i) * (Math.PI / 180)) * 100, y: (i) => Math.cos((60 * i) * (Math.PI / 180)) * 100 })
    : gsap.to(elements,0.7, {x:0,y:0})
}