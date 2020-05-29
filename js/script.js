let slider = document.querySelector('.slider');

if (slider) {
	let card = document.querySelector('.slider');
    let isDown = false;
    let startX;
    let scrollLeft;
  
    slider.addEventListener('mousedown', (e) => {
      isDown = true;
      slider.classList.add('active');
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
      e.preventDefault();
    });
    slider.addEventListener('mouseleave', (e) => {
      isDown = false;
      slider.classList.remove('active');
      e.preventDefault();
    });
    slider.addEventListener('mouseup', (e) => {
      isDown = false;
      slider.classList.remove('active');
      e.preventDefault();
    });
    slider.addEventListener('mousemove', (e) => {
      if(!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 1; //scroll-fast
      slider.scrollLeft = scrollLeft - walk;
    });
}