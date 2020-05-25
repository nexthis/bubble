export const move = (element: HTMLElement, position: {x: number, y: number}) => {
    let point =  {x: position.x - element.clientWidth / 2, y: position.y - element.clientHeight / 2}
    element.style.transform = `translate(${point.x}px, ${point.y}px)`;
} 
