document.addEventListener('DOMContentLoaded',()=> {
  let canvas = document.getElementById('js-drawPicture');
  let ctx = canvas.getContext('2d');
  const canvasWidth = 600;
  const canvasHeight = 400;
  const download = document.getElementById('js-downloadCanvas');
  const pictureUpload = document.getElementById('js-pictureUpload');
  const canvasClear = document.getElementById('js-clear');
  const elaser = document.getElementById('js-eraser');
  const color = document.getElementById('js-colorBox');
  const lineWidth1 = document.getElementById('js-lineWidth-1')
  const lineWidth3= document.getElementById('js-lineWidth-3')
  const lineWidth5 = document.getElementById('js-lineWidth-5')
  const lineWidth10 = document.getElementById('js-lineWidth-10')
  let lineColor = '#000000'
  let drawJudgement = 0 // 0:白紙、 1:何かしら記入している
  let drawMode = 1;
  let x = 0;
  let y = 0;
  let clickFlag = 0; // クリック判定 0:クリック終了、1：クリック開始、2：クリック中
  let object = { handleEvent: DrawWithMause };

  function draw(x,y) {
    drawJudgement = 1;
    if (clickFlag === 1) {
      clickFlag = 2;
      ctx.beginPath();
      ctx.moveTo(x,y);
    } else {
    ctx.lineTo(x,y);
    }
    ctx.stroke();
  }

  function drawStart() {
    clickFlag = 1;
    canvas.addEventListener('mousemove', object);
  }

  function drawEnd() {
    clickFlag = 0;
    ctx.closePath();
    canvas.removeEventListener('mousemove', object);
  }

  function downloadPicture() {
    let dataURL = canvas.toDataURL();
    download.href = dataURL;
  }

  function changeDrawMode() {
    if (drawMode === 1) {
      drawMode = 2
      ctx.globalCompositeOperation = 'destination-out';
      elaser.textContent  = '描画モード'
    } else {
      ctx.globalCompositeOperation = 'source-over';
      drawMode = 1;
      ctx.strokeStyle = lineColor;
      elaser.textContent = '消しゴムモード';
    }
  }

  function changeLineWidth(e) {
    ctx.lineWidth = this.width;
  }

  function DrawWithMause(event) {
    let rect = event.currentTarget.getBoundingClientRect();
    x = event.clientX - rect.left;
    y = event.clientY - rect.top;
    draw(x,y);
  }

  canvas.addEventListener('mousedown',drawStart);
  canvas.addEventListener('mouseout', drawEnd);
  canvas.addEventListener('mouseup', drawEnd);

  download.addEventListener('click', downloadPicture);

  canvasClear.addEventListener('click', ()=> {
    drawJudgement = 0;
    ctx.clearRect(0,0, canvasWidth, canvasHeight);
  });

  elaser.addEventListener('click', changeDrawMode);

  lineWidth1.addEventListener('click', { width: 1, handleEvent: changeLineWidth});
  lineWidth3.addEventListener('click', { width: 3, handleEvent: changeLineWidth});
  lineWidth5.addEventListener('click', { width: 5, handleEvent: changeLineWidth});
  lineWidth10.addEventListener('click', { width: 10, handleEvent: changeLineWidth});

  color.addEventListener('change', ()=> {
    lineColor = color.value;
    ctx.strokeStyle = lineColor;
  });

  pictureUpload.addEventListener('click', async ()=> {
    if (drawJudgement === 0) {
      window.alert('何か記入してください')
    } else {
      let imageBlob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
      let formData = new FormData();
      formData.append("post[picture]", imageBlob, "picture.png");
      const token = document.getElementsByName("csrf-token")[0].content;
      let response = await fetch('/posts', {
        method: 'POST',
        headers: {'X-CSRF-Token': token},
        body: formData
      });

      let location =  await window.location.replace('/posts')
    };
  });
});