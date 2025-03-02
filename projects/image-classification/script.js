// 模型可视化初始化
function initModelVisualization() {
    const container = document.querySelector('.model-visualization');
    
    // 使用Three.js创建3D网络结构
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.offsetWidth/container.offsetHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    
    // 创建神经网络层可视化
    const layers = [
        { nodes: 32, color: 0xff6b6b },
        { nodes: 64, color: 0x4ecdc4 },
        { nodes: 128, color: 0x45b7d1 }
    ];

    layers.forEach((layer, i) => {
        const geometry = new THREE.SphereGeometry(0.2);
        const material = new THREE.MeshBasicMaterial({ color: layer.color });
        for(let j=0; j<layer.nodes; j++){
            const sphere = new THREE.Mesh(geometry, material);
            sphere.position.set(
                i*2 - layers.length,
                j - layer.nodes/2,
                0
            );
            scene.add(sphere);
        }
    });

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
    
    // 图片上传处理
    document.getElementById('image-upload').addEventListener('change', function(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        
        reader.onload = function(event) {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                // 此处添加模型预测逻辑
                document.querySelector('.prediction-result').innerHTML = `
                    <div class="prediction">
                        <div class="confidence" style="width: 85%">飞机 85%</div>
                        <div class="confidence" style="width: 70%">鸟类 70%</div>
                    </div>
                `;
            }
        }
        reader.readAsDataURL(file);
    });
});
