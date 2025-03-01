// 自定义鼠标指针
const cursor = document。querySelector('.custom-cursor');
const cursorCore = document。querySelector('.cursor-core');
const cursorTrail = document。querySelector('.cursor-trail');

document。addEventListener('mousemove'， (e) => {
    cursor。style。transform = `translate(${e。clientX}px, ${e。clientY}px)`;
    cursorCore。style。transform = `translate(${e。clientX}px, ${e。clientY}px)`;
    cursorTrail。style。transform = `translate(${e。clientX}px, ${e。clientY}px)`;
});

// 点击特效
document。addEventListener('click'， () => {
    cursorCore。style。transform += ' scale(1.5)';
    setTimeout(() => {
        cursorCore。style。transform = cursorCore。style。transform。replace(' scale(1.5)'， '');
    }， 100);
});

// 三维粒子背景
function initParticles() {
    const scene = new THREE。Scene();
    const camera = new THREE。PerspectiveCamera(75， window。innerWidth / window。innerHeight， 0.1， 1000);
    const renderer = new THREE。WebGLRenderer({ alpha: true });
    renderer。setSize(window。innerWidth， window。innerHeight);
    document。getElementById('particle-canvas')。appendChild(renderer。domElement);

    const geometry = new THREE。BufferGeometry();
    const vertices = [];
    for (let i = 0; i < 5000; i++) {
        vertices。push(
            Math。random() * 2000 - 1000，
            Math。random() * 2000 - 1000，
            Math。random() * 2000 - 1000
        );
    }
    geometry。setAttribute('position'， new THREE。Float32BufferAttribute(vertices， 3));

    const material = new THREE。PointsMaterial({
        size: 2，
        color: 0x00ffff，
        transparent: true，
        opacity: 0.8
    });

    const particles = new THREE。Points(geometry， material);
    scene。add(particles);
    camera。position。z = 1000;

    function animate() {
        requestAnimationFrame(animate);
        particles。rotation。x += 0.0001;
        particles。rotation。y += 0.0001;
        renderer。render(scene， camera);
    }
    animate();
}
initParticles();
