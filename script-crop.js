let img = null;
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let croppedImage = null;

document.getElementById('imageInput').addEventListener('change', (e) => {
  let reader = new FileReader();
  reader.onload = function (event) {
    img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(e.target.files[0]);
});

function cropImage() {
  const width = 200;  // Crop width
  const height = 200; // Crop height
  const x = 50;       // X position for crop
  const y = 50;       // Y position for crop

  croppedImage = ctx.getImageData(x, y, width, height);
  canvas.width = width;
  canvas.height = height;
  ctx.putImageData(croppedImage, 0, 0);

  const downloadLink = document.getElementById('downloadLink');
  canvas.toBlob(blob => {
    const url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = "cropped-image.jpg";
    downloadLink.style.display = 'inline-block';
  }, 'image/jpeg');
}
