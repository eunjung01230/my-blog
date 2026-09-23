source "https://rubygems.org"

# GitHub Pages가 실제로 사용하는 gem 묶음 (jekyll, jekyll-remote-theme 등 포함)
gem "github-pages", group: :jekyll_plugins

# Ruby 3.0부터 표준 라이브러리에서 제외됨. jekyll serve 실행에 필요
gem "webrick", "~> 1.8"

# json 3.x 의 네이티브 확장(generator.so)이 Windows 애플리케이션 제어 정책에 막혀 로컬 빌드가 실패한다.
# GitHub Pages 배포에는 영향이 없고, 로컬에서 bundle exec jekyll serve 를 쓰기 위해 2.x 로 고정한다.
gem "json", "~> 2.7"
