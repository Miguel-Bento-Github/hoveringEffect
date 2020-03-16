import content from "./origin.js";
const centerPiece = document.querySelector(".center-piece");
const changeBackground = (e) => {
    const currentElement = document.elementFromPoint(e.clientX, e.clientY);
    let x;
    let y;
    if (currentElement instanceof HTMLElement) {
        x = e.pageX - currentElement.offsetLeft;
        y = e.pageY - currentElement.offsetTop;
    }
    const previousStyles = window.getComputedStyle(currentElement);
    const defaultBackground = previousStyles.getPropertyValue("background-color");
    const xy = x + " " + y;
    const bgWebKit = "-webkit-gradient(radial, " +
        xy +
        ", 0, " +
        xy +
        ", 60, from(rgba(0, 90, 135, 0.4)), to(rgba(0, 90, 135, 0.0))), " +
        defaultBackground;
    const mouseLeave = () => {
        if (currentElement instanceof HTMLElement)
            currentElement.style.background = defaultBackground;
    };
    if (currentElement.classList.contains("link")) {
        if (currentElement instanceof HTMLElement) {
            currentElement.style.background = bgWebKit;
            currentElement.onmouseleave = mouseLeave;
        }
    }
};
const a = document.querySelectorAll(".link");
const changeContent = ({ target }) => {
    centerPiece.innerHTML = content[target.id];
    a.forEach(link => {
        link.id == target.id
            ? (link.className = "link active")
            : (link.className = "link");
    });
};
a.forEach(link => {
    link.onclick = e => changeContent(e);
    link.onmousemove = e => changeBackground(e);
});
const loadContent = () => {
    centerPiece.innerHTML = content.monet;
};
window.onload = loadContent;
