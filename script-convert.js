function convertImage() {
  const input = document.getElementById('imageInput');
  const format = document.getElementById('format').value;
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

      canvas.toBlob(blob => {
        const url = URL.createObjectURL(blob);
        downloadLink.href = url;
        downloadLink.download = `converted.${format.split('/')[1]}`;
        downloadLink.textContent = "Download Converted Image";
        downloadLink.style.display = 'inline-block';
      }, format);
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(input.files[0]);
}
