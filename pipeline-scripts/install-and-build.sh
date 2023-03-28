# #!/usr/bin/env bash

# This workaround is required to avoid libstdc++ errors while running "extended" hugo with SASS support.
# wget http://security.ubuntu.com/ubuntu/pool/main/g/gcc-5/libstdc++6_5.4.0-6ubuntu1~16.04.12_amd64.deb
# sudo dpkg --force-all -i libstdc++6_5.4.0-6ubuntu1~16.04.12_amd64.deb

# wget https://github.com/gohugoio/hugo/releases/download/v0.68.1/hugo_extended_0.68.1_Linux-64bit.deb
# sudo dpkg -i hugo_extended_0.68.1_Linux-64bit.deb
# wget https://github.com/gohugoio/hugo/releases/download/v0.62.2/hugo_extended_0.53_Linux-64bit.deb
# sudo dpkg -i hugo_extended_0.53_Linux-64bit.deb
# hugo version
# echo installing n
# npm install -g n
# echo latest node version
# sudo n latest
npm install -P --save postcss-cli
npm install -P --save autoprefixer
# git submodule add git@git.zooz.co:documentation/paydocstheme.git
# cp -r paydocstheme/* themes
ls
hugo
env HUGO_ENV=production
# env HUGO_ENV="production"
ls
cp -r robots.txt public
curl --silent "http://www.google.com/ping?sitemap=https://jorger1986.github.io/DevelopersDoc_site/sitemap.xml" 
env
