FROM node:12

RUN apt update & apt install git
WORKDIR /downloads

RUN wget http://security.ubuntu.com/ubuntu/pool/main/g/gcc-5/libstdc++6_5.4.0-6ubuntu1~16.04.12_amd64.deb && \
    dpkg --force-all -i libstdc++6_5.4.0-6ubuntu1~16.04.12_amd64.deb && \
    wget https://github.com/gohugoio/hugo/releases/download/v0.68.1/hugo_extended_0.68.1_Linux-64bit.deb && \
    dpkg -i hugo_extended_0.68.1_Linux-64bit.deb && \
    cd ../ && rm -Rf /downloads

WORKDIR /hugo