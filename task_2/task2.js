document.addEventListener('DOMContentLoaded', () => {
  const pLayer1 = document.querySelector('.p_layer-1');
  const pLayer2 = document.querySelector('.p_layer-2');
  const content = document.querySelector('.content');

  const transitionThreshold = 300; 

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    pLayer1.style.transform = `translateY(${scrollY * 0.3}px)`;
    pLayer2.style.transform = `translateY(${scrollY * 0.5}px)`;

    if (scrollY > transitionThreshold) {    
        pLayer1.style.opacity = '0';
        pLayer2.style.opacity = '1';
    }  
    else {
      pLayer1.style.opacity = '1';
      pLayer2.style.opacity = '0';
    }
  });
});
