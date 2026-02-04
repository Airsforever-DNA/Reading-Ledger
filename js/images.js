/**
 * 静心书斋 - 背景图片列表
 * 
 * 此文件由 tools/generate-images.py 自动生成
 * 请勿手动编辑，如需更新请运行脚本
 * 
 * 使用方法：
 * 1. 将风景照片放入 images/backgrounds/ 文件夹
 * 2. 运行 python tools/generate-images.py
 * 3. 刷新页面即可看到新图片
 */

const BACKGROUND_IMAGES = [
    // 示例图片（请替换为你的实际图片）
    // 运行 generate-images.py 后会自动填充此数组
    
    // 如果没有图片，可以临时使用在线占位图
    "https://picsum.photos/1920/1080?random=1",
    "https://picsum.photos/1920/1080?random=2",
    "https://picsum.photos/1920/1080?random=3",
    "https://picsum.photos/1920/1080?random=4",
    "https://picsum.photos/1920/1080?random=5"
];

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BACKGROUND_IMAGES;
}
