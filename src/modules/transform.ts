import gsap from "gsap";

// find nearly point like https://stackoverflow.com/questions/56306097/get-nearest-point-from-another-one-in-javascript
const distance = (
  point: { x: number; y: number },
  position: { x: number; y: number }
) => {
  return Math.pow(position.x - point.x, 2) + Math.pow(position.y - point.y, 2);
};

const getNear = (
  points: Array<[number, number]>,
  position: { x: number; y: number }
) =>
  points.reduce((a, b) =>
    distance({ x: a[0], y: a[1] }, position) <
    distance({ x: b[0], y: b[1] }, position)
      ? a
      : b
  );

export const move = (
  element: HTMLElement,
  position: { x: number; y: number }
) => {
  let point = {
    x: position.x - element.clientWidth / 2,
    y: position.y - element.clientHeight / 2
  };
  gsap.to(element, 0.1, { x: point.x, y: point.y });
};

export const dock = (
  element: HTMLElement,
  position: { x: number; y: number } | null,
  dock: Array<[number, number]>
): [number, number] => {
  const pos: { x: number; y: number } =
    position === null
      ? {
          x: element.getBoundingClientRect().x,
          y: element.getBoundingClientRect().y
        }
      : position;

  const points = dock.map(
    (item: [number, number]): [number, number] => {
      return [
        (window.innerWidth - element.clientWidth) * (item[0] / 100),
        (window.innerHeight - element.clientHeight) * (item[1] / 100)
      ];
    }
  );

  const near = getNear(points, pos);

  gsap.to(element, 0.6, { x: near[0], y: near[1], ease: "back.out(3)" });

  return dock[points.indexOf(near)];
};

export const toggleMenu = (
  element: HTMLElement,
  state: boolean,
  dock: [number, number]
) => {
  const elements = element.querySelectorAll(".bubble__menu-item");
  state ? menuOpen(element, elements) : menuClose(element, elements, dock);
};

const menuOpen = (element: HTMLElement, elements: NodeListOf<Element>) => {
  gsap.to(elements, 0.5, { scale: 1 });
  gsap
    .to(element, 0.7, {
      x: (window.innerWidth - element.clientWidth) / 2,
      y: (window.innerHeight - element.clientHeight) / 2
    })
    .eventCallback("onComplete", () => {
      gsap.to(element.querySelector(".bubble__hamburger"), 0.2, { scale: 0.8 });
      gsap.to(elements, 0.2, {
        x: i => Math.sin(( 360 / elements.length ) * i * (Math.PI / 180)) * 100,
        y: i => Math.cos(( 360 / elements.length ) * i * (Math.PI / 180)) * 100
      });
    });
  
};

const menuClose = (
  element: HTMLElement,
  elements: NodeListOf<Element>,
  dock: [number, number]
) => {
  gsap.to(elements, 0.5, { scale: 0.5 });
  gsap.to(element, 0.7, {
    x: (window.innerWidth - element.clientWidth) * (dock[0] / 100),
    y: (window.innerHeight - element.clientHeight) * (dock[1] / 100)
  });
  gsap.to(element.querySelector(".bubble__hamburger"), 0.2, { scale: 1 });
  gsap.to(elements, 0.7, { x: 0, y: 0 });
};
