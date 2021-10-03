let MAXIMUM_WIDTH = 80;
let MAXIMUM_HEIGHT = 80;
let fileCount = 0;
let file = {};
$(document).ready(function () {
  // init sliders
  const $widthValueSpan = $('.widthValueSpan');
  const $width = $('#width');
  $widthValueSpan.html($width.val());
  $width.on('input change', () => {
    $widthValueSpan.html($width.val());
    console.log($width.val());
    MAXIMUM_WIDTH = $width.val();
    MAXIMUM_HEIGHT = $height.val();
  });
  const $heightValueSpan = $('.heightValueSpan');
  const $height = $('#height');
  $heightValueSpan.html($height.val());
  $height.on('input change', () => {
    $heightValueSpan.html($height.val());
    console.log($height.val());
    MAXIMUM_WIDTH = $width.val();
    MAXIMUM_HEIGHT = $height.val();
  });
  // picture upload
  const canvas = document.getElementById('preview');
  const fileInput = document.querySelector('input[type="file"]');
  const asciiImage = document.getElementById('ascii');
  const refreshBtn = document.getElementById('refresh');
  const fileName = document.getElementById('fileName');

  const context = canvas.getContext('2d');

  const toGrayScale = (r, g, b) => 0.21 * r + 0.72 * g + 0.07 * b;

  const getFontRatio = () => {
    const pre = document.createElement('pre');
    pre.style.display = 'inline';
    pre.textContent = ' ';

    document.body.appendChild(pre);
    const { width, height } = pre.getBoundingClientRect();
    document.body.removeChild(pre);

    return height / width;
  };

  const fontRatio = getFontRatio();

  const convertToGrayScales = (context, width, height) => {
    const imageData = context.getImageData(0, 0, width, height);

    const grayScales = [];

    for (let i = 0; i < imageData.data.length; i += 4) {
      const r = imageData.data[i];
      const g = imageData.data[i + 1];
      const b = imageData.data[i + 2];

      const grayScale = toGrayScale(r, g, b);

      // var i = (y * 4) * imageData.width + x * 4;
      // var grayScale = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;
      // imageData.data[i] = grayScale;
      // imageData.data[i + 1] = grayScale;
      // imageData.data[i + 2] = grayScale;

      imageData.data[i] = imageData.data[i + 1] = imageData.data[i + 2] = grayScale;

      grayScales.push(grayScale);
    }

    context.putImageData(imageData, 0, 0);

    return grayScales;
  };

  const clampDimensions = (width, height) => {
    const rectifiedWidth = Math.floor(getFontRatio() * width);

    if (height > MAXIMUM_HEIGHT) {
      const reducedWidth = Math.floor(rectifiedWidth * MAXIMUM_HEIGHT / height);
      return [reducedWidth, MAXIMUM_HEIGHT];
    }

    if (width > MAXIMUM_WIDTH) {
      const reducedHeight = Math.floor(height * MAXIMUM_WIDTH / rectifiedWidth);
      return [MAXIMUM_WIDTH, reducedHeight];
    }

    return [rectifiedWidth, height];
  };

  refreshBtn.onclick = () => {
    console.log('hi')

    const reader = new FileReader();
    reader.onload = (event) => {
      const image = new Image();
      image.onload = () => {
        const [width, height] = clampDimensions(image.width, image.height);

        canvas.width = width;
        canvas.height = height;

        context.drawImage(image, 0, 0, width, height);
        const grayScales = convertToGrayScales(context, width, height);

        // fileInput.style.display = 'none';
        drawAscii(grayScales, width);
      }

      image.src = event.target.result;
    };

    reader.readAsDataURL(file);
  };

  fileInput.onchange = (e) => {
    file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = (event) => {
      const image = new Image();
      image.onload = () => {
        const [width, height] = clampDimensions(image.width, image.height);

        canvas.width = width;
        canvas.height = height;

        context.drawImage(image, 0, 0, width, height);
        const grayScales = convertToGrayScales(context, width, height);

        // fileInput.style.display = 'none';
        drawAscii(grayScales, width);
      }

      image.src = event.target.result;
    };

    reader.readAsDataURL(file);
    fileName.textContent = (function () {
      let f = fileInput.value.split(/(\\|\/)/g).pop();
      if (f.length >= window.innerWidth / 27) {
        f = f.substr(0, window.innerWidth / 27) + "...";
      }
      return f;
    })();
    fileInput.value = "";
    refreshBtn.disabled = false;
  };

  // const grayRamp = '$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/|()1{}[]?-_+~<>i!lI;:,"^`\'. ';

  // const grayRamp = "@MBHENR#KWXDFPQASUZbdehx*8Gm&04LOVYkpq5Tagns69owz$CIu23Jcfry%1v7l+it[] {}?j|()=~!-/<>\"^_';,:`. ";
  const grayRamp = ".:-=+*#%@"

  const rampLength = grayRamp.length;

  const getCharacterForGrayScale = grayScale => grayRamp[Math.ceil((rampLength - 1) * grayScale / 255)];

  const drawAscii = (grayScales, width) => {
    const ascii = grayScales.reduce((asciiImage, grayScale, index) => {
      let nextChars = getCharacterForGrayScale(grayScale);
      if ((index + 1) % width === 0) {
        nextChars += '\n';
      }
      return asciiImage + nextChars;
    }, '');

    asciiImage.textContent = ascii;
  };
});
