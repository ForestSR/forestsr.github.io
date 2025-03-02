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

            // 页面滚动到图片预览区域
            const imagePreview = document.querySelector('.image-preview');
            const imagePreviewRect = imagePreview.getBoundingClientRect();
            const imagePreviewCenter = imagePreviewRect.top + imagePreviewRect.height / 2; // 图片预览区域的中心位置
            const windowCenter = window.innerHeight / 2; // 窗口的中心位置
            const scrollOffset = window.scrollY + imagePreviewCenter - windowCenter; // 计算滚动距离

            window.scrollTo({
                top: scrollOffset,
                behavior: 'smooth' // 平滑滚动
            });
        };
    };
    reader.readAsDataURL(file);
}
