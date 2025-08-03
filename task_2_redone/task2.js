document.addEventListener('DOMContentLoaded', function() {
  const img1 = document.querySelector('.img-1');
  const img2 = document.querySelector('.img-2');
  const img3 = document.querySelector('.img-3');
  let scrollX = 0;
  let isDragging = false;
  let startX;

  window.addEventListener('wheel', function(e) {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey) {
      scrollX += (e.deltaX || e.deltaY) * 0.3;
      updateCharacterPositions();
      e.preventDefault();
    }
  }, { passive: false });

    document.addEventListener('touchstart', function(e) {
      isDragging = true;
      startX = e.touches[0].clientX;
    }, { passive: true });

    document.addEventListener('touchmove', function(e) {
      if (!isDragging) return;
        const x = e.touches[0].clientX;
        scrollX += (startX - x) * 0.3;
        startX = x;
        updateCharacterPositions();
        e.preventDefault();
    }, { passive: false });

    document.addEventListener('touchend', function() {
      isDragging = false;
 });

  document.addEventListener('mousedown', function(e) {
      isDragging = true;
      startX = e.clientX;
  });

  document.addEventListener('mousemove', function(e) {
      if (!isDragging) return;
      const x = e.clientX;
      scrollX += (startX - x) * 0.3;
      startX = x;
      updateCharacterPositions();
  });

  document.addEventListener('mouseup', function() {
    isDragging = false;
  });

  function updateCharacterPositions() {
      img1.style.transform = `translateX(${scrollX * 0.3}px)`;
      img2.style.transform = `translateX(${scrollX * 0.2}px)`;
      img3.style.transform = `translateX(${scrollX * 0.1}px)`;
  }

  console.log("DELTARUNE page loaded with horizontal character movement");
});
