/**
 * 主题切换器
 * 支持 vue、dark、buble、pure 四种主题
 */
(function() {
  'use strict';
  
  // 主题配置
  const THEME_CONFIG = {
    'vue': '//cdn.jsdelivr.net/npm/docsify@4/themes/vue.css',
    'dark': '//cdn.jsdelivr.net/npm/docsify@4/themes/dark.css',
    'buble': '//cdn.jsdelivr.net/npm/docsify@4/themes/buble.css',
    'pure': '//cdn.jsdelivr.net/npm/docsify@4/themes/pure.css'
  };
  
  const DEFAULT_THEME = 'vue';
  const STORAGE_KEY = 'docsify-theme';
  
  // DOM 元素
  let switcher, button, dropdown, currentThemeText, options;
  
  /**
   * 初始化主题切换器
   */
  function init() {
    // 获取 DOM 元素
    switcher = document.getElementById('themeSwitcher');
    button = document.getElementById('themeSwitcherBtn');
    dropdown = document.getElementById('themeDropdown');
    currentThemeText = document.getElementById('currentTheme');
    options = dropdown.querySelectorAll('.theme-option');
    
    // 加载保存的主题
    const savedTheme = localStorage.getItem(STORAGE_KEY) || DEFAULT_THEME;
    setTheme(savedTheme);
    
    // 绑定事件
    bindEvents();
  }
  
  /**
   * 绑定事件监听器
   */
  function bindEvents() {
    // 切换按钮点击事件
    button.addEventListener('click', function(e) {
      e.stopPropagation();
      switcher.classList.toggle('active');
    });
    
    // 主题选项点击事件
    options.forEach(function(option) {
      option.addEventListener('click', function() {
        const theme = this.getAttribute('data-theme');
        setTheme(theme);
        switcher.classList.remove('active');
      });
    });
    
    // 点击其他区域关闭下拉菜单
    document.addEventListener('click', function() {
      switcher.classList.remove('active');
    });
  }
  
  /**
   * 设置主题
   * @param {string} theme - 主题名称
   */
  function setTheme(theme) {
    // 更新显示的主题名称
    currentThemeText.textContent = theme;
    
    // 更新选项激活状态
    options.forEach(function(opt) {
      opt.classList.toggle('active', opt.getAttribute('data-theme') === theme);
    });
    
    // 保存到本地存储
    localStorage.setItem(STORAGE_KEY, theme);
    
    // 应用主题
    applyTheme(theme);
  }
  
  /**
   * 应用主题样式
   * @param {string} theme - 主题名称
   */
  function applyTheme(theme) {
    console.log('主题切换为:', theme);
    
    // 获取或创建主题样式链接
    let themeLink = document.getElementById('docsify-theme-link');
    if (!themeLink) {
      themeLink = document.createElement('link');
      themeLink.id = 'docsify-theme-link';
      themeLink.rel = 'stylesheet';
      document.head.appendChild(themeLink);
    }
    
    // 设置主题 CSS 文件路径
    themeLink.href = THEME_CONFIG[theme];
    
    // 触发主题切换事件
    document.dispatchEvent(new CustomEvent('themeChanged', { 
      detail: { theme: theme } 
    }));
  }
  
  // 页面加载完成后初始化
  init();
})();

