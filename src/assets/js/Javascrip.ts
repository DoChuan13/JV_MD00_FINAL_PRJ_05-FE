export function mainJs() {
  // @ts-ignore
  document.querySelector("#dark-mode-toggle").onclick = () => {
    document.documentElement.classList.toggle("dark");
    let a = document.querySelectorAll("*");
    for (let i = 0; i < a.length; i++) {
      a[i].classList.toggle("dark");
    }

    // document.body.classList.toggle("dark")
  };

  // @ts-ignore
  document.querySelector("#dark-mode-toggle-mb").onclick = () => {
    document.documentElement.classList.toggle("dark");
    // document.body.classList.toggle("dark")
  };

  /*window.onload = () => {
    fadeOut();
  };*/

  /*function loader() {
    // @ts-ignore
    document.querySelector(".loader-container").classList.add("active");
  }

  function fadeOut() {
    setTimeout(loader, 8900);
  }*/
}
