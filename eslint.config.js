import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { globalIgnores } from "eslint/config";
import prettier from "eslint-config-prettier";

export default [
  globalIgnores(["dist"]), // ① 검사 제외 디렉터리 설정
  js.configs.recommended, // ② JS 기본 추천 규칙
  ...tseslint.configs.recommended, // ③ TypeScript ESLint 추천 규칙
  reactHooks.configs["recommended-latest"], // ④ React Hooks 규칙
  reactRefresh.configs.vite, // ⑤ React Fast Refresh 관련 규칙 (Vite 용)
  prettier, // ⑥ Prettier와 충돌 방지용 설정
  {
    files: ["**/*.{ts,tsx}"], // ⑦ 타입스크립트 파일만을 위한 커스텀 설정
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: tseslint.parser, // TypeScript 전용 파서 지정
    },
    rules: {
      // 필요한 추가 규칙 커스터마이징 가능
    },
  },
];
