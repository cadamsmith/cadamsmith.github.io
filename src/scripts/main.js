document.addEventListener('DOMContentLoaded', () => {
  // add click events to all of the navbar burger btns
  const navbarBurgerBtns = Array.from(document.getElementsByClassName('navbar-burger'));
  navbarBurgerBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.target);
      if (!target) {
        return;
      }
  
      // activate navbar burger btn and navbar burger menu
      btn.classList.toggle('is-active');
      target.classList.toggle('is-active');
    });
  });
});
