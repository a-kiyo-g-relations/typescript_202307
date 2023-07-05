FROM node:20-slim

ENV TZ Asia/Tokyo
ENV HOST 0.0.0.0

WORKDIR /usr/app

RUN npm install

# デフォルトシェルをbashに変更
SHELL ["/bin/bash", "-c"]

CMD ["/bin/bash"]