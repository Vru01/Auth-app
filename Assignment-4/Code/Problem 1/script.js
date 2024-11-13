const butElem = document.querySelector('button');
const inputElem = document.querySelector('input');
butElem.addEventListener('click', () => {
    const oldText = inputElem.value;
    return inputElem.value = oldText === 'ON' ? 'OFF' : 'ON';
});

const listItem = document.querySelectorAll("li");

const handleHover = (e) => {
  return (e.target.innerText = "ON");
};
if (listItem.length > 0) {
  listItem.forEach((item) => {
    item.addEventListener("mouseover", handleHover);
  });
}
