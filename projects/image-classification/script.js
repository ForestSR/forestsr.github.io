// 图片缩放控制
let scale = 1;
const minScale = 0.1; // 最小缩放比例
const maxScale = 3; // 最大缩放比例

function zoomIn() {
    if (scale < maxScale) {
        scale += 0.1;
        updateImageScale();
    }
}

function zoomOut() {
    if (scale > minScale) {
        scale -= 0.1;
        updateImageScale();
    }
}

function resetZoom() {
    scale = 1;
    updateImageScale();
}

function updateImageScale() {
    const img = document.getElementById('preview-image');
    img.style.transform = `scale(${scale})`;
    document.getElementById('upload-status').textContent = `[INFO] 当前缩放: ${Math.round(scale * 100)}%`;
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
        document.querySelector('.image-preview').style.display = 'flex'; /* 使用 flex 布局 */
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
