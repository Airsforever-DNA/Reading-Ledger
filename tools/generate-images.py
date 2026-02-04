#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
静心书斋 - 背景图片列表生成脚本

使用方法：
1. 将风景照片放入 images/backgrounds/ 文件夹
2. 在项目根目录运行：python tools/generate-images.py
3. 脚本会自动更新 js/images.js 文件

支持的图片格式：jpg, jpeg, png, gif, webp
"""

import os
import json
from pathlib import Path

# 配置
CONFIG = {
    # 图片文件夹相对于项目根目录的路径
    'images_dir': 'images/backgrounds',
    # 输出的JS文件路径
    'output_file': 'js/images.js',
    # 支持的图片格式
    'supported_formats': {'.jpg', '.jpeg', '.png', '.gif', '.webp'},
    # 是否使用相对路径（相对于HTML文件）
    'use_relative_path': True,
}

def get_project_root():
    """获取项目根目录"""
    # 脚本位于 tools/ 文件夹中
    script_dir = Path(__file__).parent
    return script_dir.parent

def scan_images(images_dir):
    """扫描图片文件夹"""
    images = []
    
    if not images_dir.exists():
        print(f"⚠️  图片文件夹不存在: {images_dir}")
        print(f"   请创建文件夹并放入图片后重新运行脚本")
        return images
    
    for file_path in sorted(images_dir.iterdir()):
        if file_path.is_file() and file_path.suffix.lower() in CONFIG['supported_formats']:
            # 使用相对于项目根目录的路径
            relative_path = file_path.relative_to(get_project_root())
            # 转换为URL格式（使用正斜杠）
            url_path = str(relative_path).replace('\\', '/')
            images.append(url_path)
    
    return images

def generate_js_file(images, output_path):
    """生成JS文件"""
    
    # 如果没有图片，使用占位图
    if not images:
        images = [
            "https://picsum.photos/1920/1080?random=1",
            "https://picsum.photos/1920/1080?random=2",
            "https://picsum.photos/1920/1080?random=3",
            "https://picsum.photos/1920/1080?random=4",
            "https://picsum.photos/1920/1080?random=5"
        ]
        is_placeholder = True
    else:
        is_placeholder = False
    
    # 生成JS内容
    js_content = f'''/**
 * 静心书斋 - 背景图片列表
 * 
 * 此文件由 tools/generate-images.py 自动生成
 * 生成时间: {get_timestamp()}
 * 图片数量: {len(images)}
 * 
 * {'⚠️  当前使用占位图，请添加真实图片后重新运行脚本' if is_placeholder else '✅ 已加载本地图片'}
 */

const BACKGROUND_IMAGES = {json.dumps(images, indent=4, ensure_ascii=False)};

// 导出
if (typeof module !== 'undefined' && module.exports) {{
    module.exports = BACKGROUND_IMAGES;
}}
'''
    
    # 确保输出目录存在
    output_path.parent.mkdir(parents=True, exist_ok=True)
    
    # 写入文件
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(js_content)
    
    return is_placeholder

def get_timestamp():
    """获取当前时间戳"""
    from datetime import datetime
    return datetime.now().strftime('%Y-%m-%d %H:%M:%S')

def main():
    print("=" * 50)
    print("静心书斋 - 背景图片列表生成脚本")
    print("=" * 50)
    
    # 获取路径
    project_root = get_project_root()
    images_dir = project_root / CONFIG['images_dir']
    output_file = project_root / CONFIG['output_file']
    
    print(f"\n📁 项目根目录: {project_root}")
    print(f"📁 图片文件夹: {images_dir}")
    print(f"📄 输出文件: {output_file}")
    
    # 扫描图片
    print(f"\n🔍 扫描图片中...")
    images = scan_images(images_dir)
    
    if images:
        print(f"✅ 找到 {len(images)} 张图片:")
        for img in images[:10]:  # 只显示前10个
            print(f"   - {img}")
        if len(images) > 10:
            print(f"   ... 还有 {len(images) - 10} 张")
    else:
        print("⚠️  未找到图片，将使用在线占位图")
    
    # 生成JS文件
    print(f"\n📝 生成JS文件...")
    is_placeholder = generate_js_file(images, output_file)
    
    print(f"\n{'⚠️' if is_placeholder else '✅'} 完成！")
    if is_placeholder:
        print(f"   请将图片放入 {images_dir} 后重新运行脚本")
    else:
        print(f"   已更新 {output_file}")
    
    print("\n" + "=" * 50)

if __name__ == '__main__':
    main()
