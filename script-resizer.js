function resizeImage() {
  const input = document.getElementById('imageInput');
  const widthInput = document.getElementById('width');
  const heightInput = document.getElementById('height');
  const canvas = document.getElementById('canvas');
  const downloadLink = document.getElementById('downloadLink');

  if (!input.files.length) {
    alert("Please select an image.");
    return;
  }

  if (!widthInput.value || !heightInput.value) {
    alert("Please enter width and height.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (event) {
    const img = new Image();
    img.onload = function () {
      canvas.width = parseInt(widthInput.value);
      canvas.height = parseInt(heightInput.value);
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(blob => {
        const url = URL.createObjectURL(blob);
        downloadLink.href = url;
        downloadLink.download = "resized-image.jpg";
        downloadLink.style.display = 'inline-block';
      }, 'image/jpeg');
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(input.files[0]);
}
