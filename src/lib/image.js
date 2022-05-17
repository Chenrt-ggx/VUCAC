export function loadImage(file, logger) {
  return new Promise((resolve) => {
    if (file.type.indexOf('image/') === -1) {
      logger('图片格式错误或不受支持');
      resolve(null);
    }
    if (typeof FileReader === 'function') {
      const reader = new FileReader();
      reader.onload = (event) => {
        let test = new Image();
        test.src = event.target.result.toString();
        test.onerror = function () {
          logger('图片损坏，请检查后重试');
          resolve(null);
        };
        test.onload = function () {
          resolve(event.target.result);
        };
      };
      reader.readAsDataURL(file);
    } else {
      logger('API 未被支持，请更换浏览器后重试');
      resolve(null);
    }
  });
}

export function mixImage(image, mask) {
  return new Promise((resolve) => {
    let buffer = new Image();
    buffer.src = mask;
    buffer.onload = function () {
      let canvas = document.createElement('canvas');
      let content = canvas.getContext('2d');
      canvas.width = 1000;
      canvas.height = 1000;
      content.drawImage(image, 0, 0, canvas.width, canvas.height);
      content.drawImage(buffer, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL());
    };
  });
}
