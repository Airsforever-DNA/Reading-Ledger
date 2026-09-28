#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
静心书斋 - 图片压缩脚本

把大图按网页上的显示尺寸缩小并转成 WebP，原图不会被修改。

依赖：
    pip install Pillow
    cwebp（libwebp 官方命令行工具，推荐）：
        macOS: brew install webp    Ubuntu: sudo apt install webp
        Windows: https://developers.google.com/speed/webp/download
    找不到 cwebp 时会改用 Pillow 编码，能用但颜色细节稍差（没有 -sharp_yuv）。

使用方法（在项目根目录运行）：
    python tools/optimize-images.py -w 1920 -o images/backgrounds _originals/backgrounds/*.jpg
    python tools/optimize-images.py -w 1400 -q 85 -o images _incoming/春望概念图.png

本站使用的参数：
    首页轮播背景（全屏）   -w 1920 -q 80
    诗词雅集卡片图          -w 1400 -q 85
    诗词详情页卡片背景      -w 2816 -q 80（保持原尺寸）
    首页入口圆形标签        -w 640  -q 80
"""

import argparse
import os
import shutil
import subprocess
import tempfile
from pathlib import Path

from PIL import Image, ImageOps

CWEBP = shutil.which('cwebp')


def load_resized(src, width):
    """读取图片并缩放到不超过 width 的宽度（不放大）"""
    with Image.open(src) as im:
        icc_profile = im.info.get('icc_profile')
        im = ImageOps.exif_transpose(im)
        # 只有真正用到透明度时才保留 alpha 通道
        if im.mode in ('RGBA', 'LA', 'PA') or 'transparency' in im.info:
            im = im.convert('RGBA')
            if im.getchannel('A').getextrema()[0] == 255:
                im = im.convert('RGB')
        else:
            im = im.convert('RGB')
        if im.width > width:
            height = round(im.height * width / im.width)
            im = im.resize((width, height), Image.LANCZOS)
        return im, icc_profile


def optimize(src, dst, width, quality):
    im, icc_profile = load_resized(src, width)
    if CWEBP:
        # 先存成无损 PNG，再交给 cwebp；-sharp_yuv 能更好地保留细小的彩色细节
        fd, tmp = tempfile.mkstemp(suffix='.png')
        os.close(fd)
        try:
            im.save(tmp, 'PNG', icc_profile=icc_profile)
            subprocess.run([CWEBP, '-quiet', '-q', str(quality), '-m', '6', '-sharp_yuv',
                            '-metadata', 'icc', tmp, '-o', str(dst)], check=True)
        finally:
            os.remove(tmp)
    else:
        im.save(dst, 'WEBP', quality=quality, method=6, icc_profile=icc_profile)
    return im.size


def main():
    parser = argparse.ArgumentParser(description='把图片按显示尺寸缩小并转为 WebP')
    parser.add_argument('sources', nargs='+', type=Path, help='原图路径')
    parser.add_argument('-w', '--width', type=int, required=True, help='最大宽度（像素）')
    parser.add_argument('-q', '--quality', type=int, default=80, help='WebP 质量 0-100，默认 80')
    parser.add_argument('-o', '--out-dir', type=Path, required=True, help='输出目录')
    args = parser.parse_args()

    if not CWEBP:
        print('⚠️  未找到 cwebp，改用 Pillow 编码（颜色细节会稍差）\n')
    args.out_dir.mkdir(parents=True, exist_ok=True)
    before = after = 0
    for src in args.sources:
        dst = args.out_dir / (src.stem + '.webp')
        w, h = optimize(src, dst, args.width, args.quality)
        before += src.stat().st_size
        after += dst.stat().st_size
        print(f'{src} -> {dst}  {w}x{h}  '
              f'{src.stat().st_size / 1024:.0f} KB -> {dst.stat().st_size / 1024:.0f} KB')
    print(f'\n共 {len(args.sources)} 张：{before / 1048576:.1f} MB -> {after / 1048576:.1f} MB')


if __name__ == '__main__':
    main()
