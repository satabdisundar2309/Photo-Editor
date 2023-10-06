let choose_img_btn = document.querySelector(".choose-img button");
let choose_input = document.querySelector(".choose-img input");
let imgSrc = document.querySelector(".view-img img");
let filter_btns = document.querySelectorAll(".icons-room button");
let slider = document.querySelector(".slider input");
let filter_name = document.querySelector(".filter-info .name");
let slider_value = document.querySelector(".filter-info .value");
let rotate_btns = document.querySelectorAll(".icons-room1 button");
let reset = document.querySelector(".reset");
let save = document.querySelector(".save");

let brightness = 100,
  contrast = 100,
  saturate = 100,
  invert = 0,
  Blur = 0,
  rotate = 0,
  flipX = 1,
  flipY = 1;

choose_img_btn.addEventListener("click", () => {
  choose_input.click();
});

choose_input.addEventListener("change", () => {
  let file = choose_input.files[0];
  if (!file) {
    return;
  }
  imgSrc.src = URL.createObjectURL(file);
  imgSrc.addEventListener("load", () => {
    document.querySelector(".container").classList.remove("disabled");
  });
});

filter_btns.forEach((element) => {
  element.addEventListener("click", () => {
    // console.log(element)
    document.querySelector(".active").classList.remove("active");
    element.classList.add("active");
    filter_name.innerText = element.id;
    if (element.id === "brightness") {
      slider.max = "200";
      slider.value = brightness;
      slider_value.innerText = `${brightness}`;
    } else if (element.id === "contrast") {
      slider.max = "200";
      slider.value = contrast;
      slider_value.innerText = `${contrast}`;
    } else if (element.id === "saturate") {
      slider.max = "200";
      slider.value = saturate;
      slider_value.innerText = `${saturate}`;
    } else if (element.id === "invert") {
      slider.max = "100";
      slider.value = invert;
      slider_value.innerText = `${invert}`;
    } else if (element.id === "blur") {
      slider.max = "10";
      slider.value = Blur;
      slider_value.innerText = `${Blur}`;
    }
  });
});

slider.addEventListener("input", () => {
  slider_value.innerText = `${slider.value}%`;
  let sliderState = document.querySelector(".icons-room .active");
  if (sliderState.id === "brightness") {
    brightness = slider.value;
  } else if (sliderState.id === "contrast") {
    contrast = slider.value;
  } else if (sliderState.id === "saturate") {
    saturate = slider.value;
  } else if (sliderState.id === "invert") {
    invert = slider.value;
  } else if (sliderState.id === "blur") {
    Blur = slider.value;
  }
  imgSrc.style.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) invert(${invert}%) blur(${Blur}px)`;
});

rotate_btns.forEach((element) => {
  element.addEventListener("click", () => {
    if (element.id === "rotateLeft") {
      rotate -= 90;
    } else if (element.id === "rotateRight") {
      rotate += 90;
    } else if (element.id === "flipX") {
      flipX = flipX === 1 ? -1 : 1;
    } else if (element.id === "flipY") {
      flipY = flipY === 1 ? -1 : 1;
    }

    imgSrc.style.transform = `rotate(${rotate}deg) scale(${flipX}, ${flipY})`;
  });
});

reset.addEventListener("click", () => {
  brightness = 100;
  saturate = 100;
  contrast = 100;
  invert = 0;
  Blur = 0;
  rotate = 0;
  flipX = 1;
  flipY = 1;
  imgSrc.style.transform = `rotate(${rotate}deg) scale(${flipX}, ${flipY})`;
  imgSrc.style.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) invert(${invert}%) blur(${Blur}px)`;
});

// saving the image
save.addEventListener("click", () => {
  let canvas = document.createElement("canvas");
  let xyz = canvas.getContext("2d");
  canvas.width = imgSrc.naturalWidth;
  canvas.height = imgSrc.naturalHeight;
  xyz.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) invert(${invert}%) blur(${Blur}px)`;
  xyz.scale(flipX, flipY);
  xyz.translate(canvas.width / 2, canvas.height / 2);
  xyz.drawImage(
    imgSrc,
    -canvas.width / 2,
    -canvas.height / 2,
    canvas.width,
    canvas.height
  );

  let link = document.createElement("a");
  link.download = "img.jpeg";
  link.href= canvas.toDataURL();
  link.click();
});
