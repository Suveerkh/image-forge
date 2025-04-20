function applyGrayscale() {
  const input = document.getElementById('imageInput');
  const canvas = document.getElementById('canvas');
  const downloadLink = document.getElementById('downloadLink');

  if (!input.files.length) {
    alert("Please select an image.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (event) {
    const img = new Image();
    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const avg = (r + g + b) / 3;
        data[i] = data[i + 1] = data[i + 2] = avg;
      }

      ctx.putImageData(imageData, 0, 0);
      canvas.toBlob(blob => {
        const url = URL.createObjectURL(blob);
        downloadLink.href = url;
        downloadLink.download = "grayscale-image.jpg";
        downloadLink.style.display = 'inline-block';
      }, 'image/jpeg');
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(input.files[0]);
}
