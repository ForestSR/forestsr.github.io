// script.js
// 3D模型可视化
function initModelVisualization() {
    const canvas = document.querySelector('#model-canvas');
    const renderer = new THREE.WebGLRenderer({ 
        canvas,
        antialias: true,
        alpha: true
    });
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.offsetWidth/canvas.offsetHeight, 0.1, 1000);
    camera.position.z = 5;

    // 创建神经网络结构
    const layers = [
        { nodes: 5, color: 0xff6b6b, radius: 0.3 },
        { nodes: 3, color: 0x4ecdc4, radius: 0.2 },
        { nodes: 1, color: 0x45b7d1, radius: 0.4 }
    ];

    layers.forEach((layer, i) => {
        const angleStep = (Math.PI * 2) / layer.nodes;
        for(let j = 0; j < layer.nodes; j++) {
            const geometry = new THREE.SphereGeometry(layer.radius);
            const material = new THREE.MeshPhongMaterial({ 
                color: layer.color,
                emissive: layer.color,
                emissiveIntensity: 0.3
            });
            const node = new THREE.Mesh(geometry, material);
            
            node.position.x = i * 2 - layers.length;
            node.position.y = Math.cos(angleStep * j) * 1.5;
            node.position.z = Math.sin(angleStep * j) * 1.5;
            
            scene.add(node);
        }
    });

    // 添加灯光
    const light = new THREE.PointLight(0xffffff, 1);
    light.position.set(0, 0, 5);
    scene.add(light);

    // 动画循环
    function animate() {
        requestAnimationFrame(animate);
        scene.rotation.y += 0.005;
        renderer.render(scene, camera);
    }
    animate();
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    initModelVisualization();
    
    // 动态数字增长
    document.querySelectorAll('.spec-value').forEach(element => {
        const target = parseInt(element.dataset.target);
        let current = 0;
        const interval = setInterval(() => {
            element.textContent = current.toFixed(current > 100 ? 1 : 0);
            if(current >= target) clearInterval(interval);
            current += target / 50;
        }, 20);
    });

    // 图片上传交互
    const uploadZone = document.querySelector('.upload-zone');
    const input = document.querySelector('#image-upload');

    uploadZone.addEventListener('click', () => input.click());
    input.addEventListener('change', handleImageUpload);
});

function handleImageUpload(e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        // 显示预览
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
            // 模拟预测结果
            document.querySelector('.predicted-class').textContent = '飞机';
            document.querySelector('.confidence-value').textContent = '92.3%';
            document.querySelector('.confidence-bar').style.width = '92.3%';
        }
    }
    reader.readAsDataURL(file);
}
