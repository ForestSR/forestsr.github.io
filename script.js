// 自定义鼠标指针
const cursor = document。querySelector('.cursor');
document。addEventListener('mousemove'， (e) => {
    cursor。style。left = e。pageX + 'px';
    cursor。style。top = e。pageY + 'px';
});

// 点击特效
document。addEventListener('click'， () => {
    cursor。style。transform = 'scale(1.5)';
    setTimeout(() => {
        cursor。style。transform = 'scale(1)';
    }， 100);
});

// 卡片倾斜效果
VanillaTilt。init(document。querySelectorAll('.card')， {
    max: 25，
    speed: 400，
    glare: true，
    'max-glare': 0.5，
});
