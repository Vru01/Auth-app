let moving = true;
let position = 0;
let direction = 1; // 1 for right, -1 for left

function move() {
  if (moving) {
    position += direction;
    document.getElementById("movingButton").style.left = position + "px";

    if (position >= 200 || position <= 0) {
      direction *= -1;
    }

    requestAnimationFrame(move);
  }
}

move();

document.getElementById("movingButton").addEventListener("click", function () {
  moving = !moving;
  if (moving) {
    move();
  }
});
