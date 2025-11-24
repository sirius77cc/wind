/**
 * 回到顶部按钮功能
 * 监听页面滚动，显示/隐藏回到顶部按钮
 */

(function() {
  // 等待 DOM 加载完成
  document.addEventListener('DOMContentLoaded', function() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (!backToTopBtn) return;

    // 监听滚动事件
    window.addEventListener('scroll', function() {
      // 当滚动超过 300px 时显示按钮
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });

    // 点击按钮回到顶部
    backToTopBtn.addEventListener('click', function() {
      // 平滑滚动到顶部
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  });

  // 监听路由变化（Docsify 特有）
  if (window.$docsify) {
    window.$docsify.plugins = [].concat(window.$docsify.plugins || [], function(hook) {
      // 每次路由变化后，确保按钮状态正确
      hook.doneEach(function() {
        const backToTopBtn = document.getElementById('backToTop');
        if (!backToTopBtn) return;
        
        // 检查当前滚动位置
        if (window.pageYOffset > 300) {
          backToTopBtn.classList.add('show');
        } else {
          backToTopBtn.classList.remove('show');
        }
      });
    });
  }
})();

