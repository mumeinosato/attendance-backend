@echo off

rem TypeScriptファイルをコンパイル
tsc -p tsconfig.json

rem Fastifyアプリケーションを起動
npm run start
