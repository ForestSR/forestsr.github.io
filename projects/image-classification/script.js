// 图片缩放控制
let scale = 1;
const minScale = 0.5;
const maxScale = 3;

function zoomIn() {
    if (scale < maxScale) {
        scale += 0.1;
        updateImageScale();
    } else {
        document.getElementById('upload-status').textContent = '[INFO] 已达到最大缩放比例';
    }
}

function zoomOut() {
    if (scale > minScale) {
        scale -= 0.1;
        updateImageScale();
    } else {
        document.getElementById('upload-status').textContent = '[INFO] 已达到最小缩放比例';
    }
}

function updateImageScale() {
    const img = document.getElementById('preview-image');
    const container = document.querySelector('.upload-zone');

    // 计算图片和容器的中心点
    const containerRect = container.getBoundingClientRect();
    const imgRect = img.getBoundingClientRect();
    
    const offsetX = (containerRect.width - imgRect.width * scale) / 2;
    const offsetY = (containerRect.height - imgRect.height * scale) / 2;

    // 应用缩放和偏移
    img.style.transform = `
        translate(${offsetX}px, ${offsetY}px)
        scale(${scale})
    `;

    // 更新控制台信息
    document.getElementById('upload-status').textContent =
        `[INFO] 当前缩放: ${(scale * 100).toFixed(1)}%`;
}

function resetZoom() {
    scale = 1;
    updateImageScale();
}

// 图片上传处理
function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith('image/')) {
        document.getElementById('upload-status').textContent = '[ERROR] 请上传图片文件';
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const img = document.getElementById('preview-image');
        img.src = event.target.result;
        img.style.display = 'block';
        document.querySelector('.upload-zone').style.display = 'none';
        document.querySelector('.image-preview').style.display = 'flex';
        document.getElementById('upload-status').textContent = '[INFO] 图片上传成功';
        resetZoom();
    }
    reader.onerror = function(error) {
        console.error('文件读取失败:', error); // 调试
        document.getElementById('upload-status').textContent = '[ERROR] 文件读取失败';
    };
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
