import os
import sys


project = 'gros-client-js'
copyright = '2023, Jax'
author = 'Jax'
release = '1.0.0'

sys.path.insert(0, os.path.abspath('../../'))

extensions = [
    'sphinx.ext.autodoc',       # 包括来自docstrings的文档
    'sphinx.ext.napoleon',      # 启用NumPy或Google样式的文档风格
    'sphinx.ext.intersphinx',   # 链接到其他文档
    'sphinx.ext.todo',          # 支持todo项
    'sphinx.ext.coverage',      # 收集文档覆盖率统计
    'sphinx_js',
]

js_language = 'typescript'
primary_domain = 'js'
exclude_patterns = []

language = 'zh_CN'
templates_path = ['_templates']

html_static_path = ['_static']
html_theme = 'furo'
