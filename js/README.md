# Tags Wall 美化版本

## 功能特性

### 🎨 视觉美化
- **渐变背景**: 使用现代化的渐变背景色
- **毛玻璃效果**: 标签具有backdrop-filter模糊效果
- **阴影效果**: 多层次阴影，增强立体感
- **粒子动画**: 背景粒子飘动效果
- **悬停动画**: 鼠标悬停时的缩放和发光效果

### ✨ 交互体验
- **平滑过渡**: 使用cubic-bezier缓动函数
- **响应式设计**: 适配不同屏幕尺寸
- **深色模式**: 支持系统深色模式
- **动画效果**: 标签浮动和旋转动画

### 🎯 使用配置

```javascript
Tags({
  style: {
    fn: Style1,
    title: 'ionfeather',
    animation: 1, // 开启动画
    scale: 1.2, // 整体缩放
    randomScoreIfNoSetting: 0
  },
  text: `
    标签名/分数/类型/链接
    喜欢夏天/7/关于我/
    人工智能/8/在学习/
  `,
  rootDOM: document.getElementById('container')
})
```

### 📱 响应式支持
- 桌面端: 完整动画效果
- 平板端: 简化动画
- 手机端: 静态布局

### 🎨 自定义样式
可以通过修改 `static/css/tags-wall-enhanced.css` 来自定义：
- 颜色主题
- 动画效果
- 布局样式
- 响应式断点

## 文件结构
```
static/
├── js/
│   └── tags-wall.js          # 主要JavaScript文件
├── css/
│   └── tags-wall-enhanced.css # 美化样式文件
└── README.md                 # 说明文档
```

## 浏览器兼容性
- Chrome 60+
- Firefox 55+
- Safari 12+ (需要-webkit-前缀)
- Edge 79+ 