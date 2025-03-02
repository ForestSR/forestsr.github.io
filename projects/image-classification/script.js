// 图片缩放控制
let scale = 1;
const minScale = 0.5;
const maxScale = 3;

function zoomIn() {
    if (scale < maxScale) {
        scale += 0.1;
        document.getElementById('preview-image').style.transform = `scale(${scale})`;
    }
}

function zoomOut() {
    if (scale > minScale) {
        scale -= 0.1;
        document.getElementById('preview-image').style.transform = `scale(${scale})`;
    }
}

function resetZoom() {
    scale = 1;
    document.getElementById('preview-image').style.transform = `scale(${scale})`;
}

// 图片上传处理
function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(event) {
        const img = document.getElementById('preview-image');
        img.src = event.target.result;
        document.querySelector('.upload-zone').style.display = 'none';
        document.querySelector('.image-preview').style.display = 'block';
        document.getElementById('upload-status').textContent = '[INFO] 图片上传成功';
        resetZoom();
    }
    reader.readAsDataURL(file);
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    const uploadZone = document.querySelector('.upload-zone');
    const input = document.querySelector('#image-upload');
    const zoomInBtn = document.getElementById('zoom-in');
    const zoomOutBtn = document.getElementById('zoom-out');
    const resetBtn = document.getElementById('reset');

    uploadZone.addEventListener('click', () => input.click());
    input.addEventListener('change', handleImageUpload);
    zoomInBtn.addEventListener('click', zoomIn);
    zoomOutBtn.addEventListener('click', zoomOut);
    resetBtn.addEventListener('click', resetZoom);
});
