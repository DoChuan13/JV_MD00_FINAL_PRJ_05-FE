export function mainJs() {
}

export const detectEndOfPage = () => {
  window.addEventListener('scroll', (e) => {
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
      console.log("Bottom of page");
      return true;
    }
    return false;
  })
}

export const chatJs = () => {
}
