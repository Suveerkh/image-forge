function compressImage() {
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
      canvas.width = img.width / 2;
      canvas.height = img.height / 2;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, img.width / 2, img.height / 2);
      canvas.toBlob(blob => {
        const url = URL.createObjectURL(blob);
        downloadLink.href = url;
        downloadLink.download = "compressed-image.jpg";
        downloadLink.style.display = 'inline-block';
      }, 'image/jpeg', 0.7); // JPEG format with 70% quality
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(input.files[0]);
}
