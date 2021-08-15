# ts-nodejs-docker

## Goal

1. 練習使用 docker multi-stage build 搭建 hot-reload docker 開發環境 + 上線環境
1. 使用技術
    - docker
        - dockerfile
        - docker-compose
    - typescript
    - nodejs
        - nodemon
    - make

> 參考: [Setting up Docker + TypeScript + Node (Hot reloading code changes in a running container)](https://dev.to/dariansampare/setting-up-docker-typescript-node-hot-reloading-code-changes-in-a-running-container-2b2f)

## Steps

1. Install packages
   `npm i express`
1. Install dependency packages
   `npm i -D typescript nodemon ts-node dotenv @types/express`
1. Init typescript project and modify `tsconfig.json`
   `npx tsc -init`
1. Write `nodemon.json`
    - specify rules for `.ts` files
1. Write index.ts (start a simple express server)
1. Write `Dockerfile`
    - multi-stage build
        - two stage: `base` and `production`
    - no commands to start server
        - use `docker-compose.yml` to start server
1. Write `docker-compose.yml`
    - specify command to start server with nodemon
    - mount `src/` and `nodemon.json`
    - expose express running port
1. Write `docker-compose.prod.yml`
    - overwrite `build.target` and `build.command` in `docker-compose.yml`
1. Build image with docker-compose command
   `docker-compose build`
1. Start services with docker-compose command
1. Create `Makefile` to simplify commands
    - e.g., run `make up` to start dev

## Notes

-   Windows 使用者執行 `nodemon` 時要加上 `-L` (--legacy-watch) 選項才可正常運作
    -   [issue](https://github.com/remy/nodemon/issues/1447)
-   docker multi-stage
    -   當 `docker-compose.yml` 中 `build.target` 為 `base` 時, 表示運作時只執行到 `FROM base as production` 前一行
    -   當 `docker-compose.prod.yml` 中 `build.target` 為 `production` 時, 表示 dockerfile 全部內容都有執行
