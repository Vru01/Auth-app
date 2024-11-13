const removeRedCircle = () => {
    const redCircle = document.getElementById('red');
    if (redCircle) {
        redCircle.remove();
    }
};

const button = document.getElementById('clickme');
button.addEventListener('click', removeRedCircle);

const circle = document.getElementById('circle');

function toggleColor(isEntering) {
    const circle = document.getElementById('circle');
    if (isEntering) {
        circle.style.backgroundColor = 'orange';
        circle.style.color = 'black'
    } else {
        circle.style.backgroundColor = 'black';
        circle.style.color = 'white';
    }
}

circle.addEventListener('mouseover', () => toggleColor(true));
circle.addEventListener('mouseout', () => toggleColor(false));