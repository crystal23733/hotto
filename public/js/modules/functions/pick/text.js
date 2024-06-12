export const numberEach = (number, random) => {
  number.forEach((child, index) => {
    console.log(child);
    child.textContent = random[index];
    child.style.color = 'white';
  });
};
