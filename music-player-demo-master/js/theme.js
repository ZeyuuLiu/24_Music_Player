// 为深色模式切换按钮添加相应js
document.getElementById('theme-toggle-button').addEventListener('click', function() {
    document.documentElement.classList.toggle('dark-theme');
});