// 图片缩放控制
let scale = 1;
const minScale = 0.1;
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
    img.style.transform = `scale(${scale})`;
    document.getElementById('upload-status').textContent = `[INFO] 当前缩放: ${(scale * 100).toFixed(1)}%`;
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

        // 隐藏上传区域，显示图片预览区域
        document.querySelector('.upload-zone').style.display = 'none';
        document.querySelector('.image-preview').style.display = 'flex';

        // 重置缩放比例
        resetZoom();

        // 调整图片尺寸以适应容器
        img.onload = function() {
            const container = document.querySelector('.image-preview');
            const containerWidth = container.clientWidth;
            const containerHeight = container.clientHeight;
            const imgWidth = img.naturalWidth;
            const imgHeight = img.naturalHeight;

            // 计算适合容器的比例
            const widthRatio = containerWidth / imgWidth;
            const heightRatio = containerHeight / imgHeight;
            const scaleRatio = Math.min(widthRatio, heightRatio);

            // 设置图片初始尺寸
            img.style.width = `${imgWidth * scaleRatio}px`;
            img.style.height = `${imgHeight * scaleRatio}px`;

            // 更新日志
            document.getElementById('upload-status').textContent = '[INFO] 图片上传成功';
        };
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

    // 点击上传区域触发文件选择
    uploadZone.addEventListener('click', () => input.click());

    // 文件选择事件
    input.addEventListener('change', handleImageUpload);

    // 缩放按钮事件
    zoomInBtn.addEventListener('click', zoomIn);
    zoomOutBtn.addEventListener('click', zoomOut);
    resetBtn.addEventListener('click', resetZoom);

    // 初始化时隐藏图片预览区域
    document.querySelector('.image-preview').style.display = 'none';
}); 
