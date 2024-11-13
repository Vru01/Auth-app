const button = document.querySelector("button");
const input = document.querySelector("input");

const handleClick = (e) => {
  return (input.value = "Hello World!");
};
button.addEventListener("click", handleClick);

const para = document.querySelector("p");
const handleHover = (e) => {
  return (para.innerHTML = "Thanks");
};
para.addEventListener("mouseover", handleHover);
