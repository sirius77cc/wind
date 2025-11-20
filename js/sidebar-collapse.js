/**
 * 侧边栏折叠功能
 * 支持点击章节标题折叠/展开子菜单
 */
(function() {
  'use strict';
  
  /**
   * 初始化侧边栏折叠功能
   */
  function initSidebarCollapse() {
    // 等待侧边栏加载完成
    setTimeout(function() {
      const sidebarNav = document.querySelector('.sidebar-nav');
      if (!sidebarNav) {
        console.warn('侧边栏未找到，跳过折叠功能初始化');
        return;
      }
      
      // 找到所有带有子菜单的项（strong 标签后面有 ul）
      const items = sidebarNav.querySelectorAll('ul > li');
      
      items.forEach(function(item) {
        const strong = item.querySelector('strong');
        const subMenu = item.querySelector('ul');
        
        if (strong && subMenu) {
          // 默认展开第一级菜单
          item.classList.add('open');
          
          // 添加点击事件处理器
          strong.addEventListener('click', handleStrongClick);
        }
      });
    }, 100);
  }
  
  /**
   * 处理章节标题点击事件
   * @param {Event} e - 点击事件对象
   */
  function handleStrongClick(e) {
    e.preventDefault();
    e.stopPropagation();
    
    // 切换父元素的 open 类
    const item = this.closest('li');
    if (item) {
      item.classList.toggle('open');
    }
  }
  
  /**
   * 注册 docsify 插件
   */
  function registerPlugin() {
    if (window.$docsify) {
      window.$docsify.plugins = [].concat(
        window.$docsify.plugins || [], 
        function(hook) {
          // 在每次页面渲染完成后初始化折叠功能
          hook.doneEach(function() {
            initSidebarCollapse();
          });
        }
      );
    } else {
      console.error('docsify 未找到，侧边栏折叠功能无法初始化');
    }
  }
  
  // 注册插件
  registerPlugin();
})();

