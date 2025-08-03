document.addEventListener('DOMContentLoaded', function() {
  const characters = [
    document.querySelector('.img-1'),
    document.querySelector('.img-2'),
    document.querySelector('.img-3')
  ];
  const speedFactors = [0.3, 0.2, 0.1];
  let scrollX = 0;
  let isDragging = false;
  let startX, startY;
  let velocity = 0;
  let lastTime = 0;
  let animationFrame;
  const friction = 0.85;
  const sensitivity = 2.5;
  let isHorizontalScroll = false;

  function handleHorizontalMove(deltaX) {
    scrollX += deltaX * sensitivity;
    velocity = deltaX;
    updateCharacterPositions();
  }

  function animate(time) {
    if (!lastTime) lastTime = time;
    const deltaTime = Math.min(time - lastTime, 100) / 16;
    lastTime = time;

    if (Math.abs(velocity) > 0.5) {
      scrollX += velocity * deltaTime;
      velocity *= friction;
      updateCharacterPositions();
      animationFrame = requestAnimationFrame(animate);
    }
  }

  document.addEventListener('touchstart', function(e) {
    isDragging = true;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    isHorizontalScroll = false;
    velocity = 0;
    cancelAnimationFrame(animationFrame);
  }, { passive: true });

  document.addEventListener('touchmove', function(e) {
    if (!isDragging) return;
    
    const x = e.touches[0].clientX;
    const y = e.touches[0].clientY;
    const deltaX = startX - x;
    const deltaY = startY - y;
  
    if (!isHorizontalScroll && Math.abs(deltaX) > 5) {
      isHorizontalScroll = Math.abs(deltaX) > Math.abs(deltaY);
    }
    
    if (isHorizontalScroll) {
      handleHorizontalMove(deltaX);
      e.preventDefault();
    }
    
    startX = x;
    startY = y;
  }, { passive: false });

  document.addEventListener('touchend', function() {
    isDragging = false;
    lastTime = 0;
    if (isHorizontalScroll) {
      animationFrame = requestAnimationFrame(animate);
    }
    isHorizontalScroll = false;
  });
 
  document.addEventListener('mousedown', function(e) {
    isDragging = true;
    startX = e.clientX;
    velocity = 0;
    cancelAnimationFrame(animationFrame);
    e.preventDefault();
  });

  document.addEventListener('mousemove', function(e) {
    if (!isDragging) return;
    const x = e.clientX;
    const deltaX = startX - x;
    handleHorizontalMove(deltaX);
    startX = x;
  });

  document.addEventListener('mouseup', function() {
    isDragging = false;
    lastTime = 0;
    animationFrame = requestAnimationFrame(animate);
  });

  window.addEventListener('wheel', function(e) {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      handleHorizontalMove(e.deltaX);
      e.preventDefault();
    }
  }, { passive: false });

  function updateCharacterPositions() {
    characters.forEach((char, index) => {
      char.style.transform = `translateX(${scrollX * speedFactors[index]}px)`;
    });
  }
});
