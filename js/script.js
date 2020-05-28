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
      console.log("Drag Start");
    });
    slider.addEventListener('mouseleave', (e) => {
      isDown = false;
      slider.classList.remove('active');
      e.preventDefault();
      console.log("Drag Out");
    });
    slider.addEventListener('mouseup', (e) => {
      isDown = false;
      slider.classList.remove('active');
      e.preventDefault();
      console.log("Drag End");
    });
    slider.addEventListener('mousemove', (e) => {
      if(!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 1; //scroll-fast
      console.log("Drag Moves");
      slider.scrollLeft = scrollLeft - walk;
    });
}