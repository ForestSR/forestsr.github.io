// 图片操作相关变量
let scale = 1;
let isDragging = false;
let startX, startY, translateX = 0, translateY = 0;
const minScale = 0.1;
const maxScale = 3;

// 缩放功能
function zoomIn() {
    if (scale < maxScale) {
        scale += 0.1;
        updateImageScale();
    } else {
        updateStatus('[INFO] 已达到最大缩放比例');
    }
}

function zoomOut() {
    if (scale > minScale) {
        scale -= 0.1;
        updateImageScale();
    } else {
        updateStatus('[INFO] 已达到最小缩放比例');
    }
}

function updateImageScale() {
    const img = document.getElementById('preview-image');
    img.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
    updateStatus(`[INFO] 当前缩放: ${(scale * 100).toFixed(1)}%`);
}

// 重置功能
function resetZoom() {
    scale = 1;
    translateX = 0;
    translateY = 0;
    updateImageScale();
}

// 清除功能
function clearImage() {
    document.querySelector('.upload-zone').style.display = 'flex';
    document.querySelector('.image-preview').style.display = 'none';
    document.getElementById('preview-image').src = '';
    document.getElementById('image-upload').value = '';
    resetZoom();
    updateStatus('[STATUS] 已重置，等待新输入...');
}

// 拖拽功能
function initDrag() {
    const img = document.getElementById('preview-image');
    
    img.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX - translateX;
        startY = e.clientY - translateY;
        img.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        translateX = e.clientX - startX;
        translateY = e.clientY - startY;
        
        img.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    	  img.style.cursor = 'grab'; // 始终显示可拖拽光标
    });
}

// 图片上传处理
function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith('image/')) {
        updateStatus('[ERROR] 请上传有效的图片文件');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const img = document.getElementById('preview-image');
        img.src = event.target.result;

        document.querySelector('.upload-zone').style.display = 'none';
        document.querySelector('.image-preview').style.display = 'flex';
        resetZoom();

        img.onload = function() {
            const container = document.querySelector('.image-preview');
            const imgWidth = img.naturalWidth;
            const imgHeight = img.naturalHeight;

            // 自动滚动到可视区域
            container.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });

            updateStatus('[INFO] 图片加载完成');
            initDrag(); // 初始化拖拽功能
        };
    };
    reader.readAsDataURL(file);
}

// 工具函数
function updateStatus(text) {
    const statusElement = document.getElementById('upload-status');
    statusElement.textContent = text;
    statusElement.style.animation = 'highlight 0.5s';
    setTimeout(() => statusElement.style.animation = '', 500);
}

// 初始化事件
document.addEventListener('DOMContentLoaded', () => {
    const uploadZone = document.querySelector('.upload-zone');
    const input = document.querySelector('#image-upload');
    const controls = {
        zoomIn: document.getElementById('zoom-in'),
        zoomOut: document.getElementById('zoom-out'),
        reset: document.getElementById('reset'),
        clear: document.getElementById('clear-btn')
    };

    // 事件绑定
    uploadZone.addEventListener('click', () => input.click());
    input.addEventListener('change', handleImageUpload);
    controls.zoomIn.addEventListener('click', zoomIn);
    controls.zoomOut.addEventListener('click', zoomOut);
    controls.reset.addEventListener('click', resetZoom);
    controls.clear.addEventListener('click', clearImage);

    // 初始状态
    document.querySelector('.image-preview').style.display = 'none';
    
    // 添加CSS动画
    const style = document.createElement('style');
    style.textContent = `
        @keyframes highlight {
            0% { opacity: 0.5; }
            50% { opacity: 1; }
            100% { opacity: 0.5; }
        }
    `;
    document.head.appendChild(style);
});
