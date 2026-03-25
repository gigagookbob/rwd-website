# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`rwd` CLI 도구의 정적 랜딩 페이지. 순수 HTML/CSS/JS로 구성되며 빌드 도구 없이 Vercel에 배포된다.

## Development

빌드 스텝, 패키지 매니저, 린터 없음. 파일을 직접 수정하면 된다.

```bash
# 로컬 개발 서버 (Vercel CLI)
vercel dev

# 배포
vercel          # preview
vercel --prod   # production
```

## Architecture

단일 페이지 정적 사이트. 3개 파일이 전부다:

- `index.html` — 전체 마크업 (nav, hero, terminal demo, comparison, features, install, output example, FAQ, footer)
- `css/style.css` — CSS custom properties 기반 디자인 시스템, 반응형(640px breakpoint)
- `js/main.js` — 클립보드 복사, FAQ 아코디언, IntersectionObserver 스크롤 fade-in

## Design System

CSS custom properties가 `style.css` 상단 `:root`에 정의되어 있다. 다크 테마(zinc 계열) 단일 모드.

- `--bg-primary: #09090b`, `--bg-secondary: #18181b` — 배경
- `--text-primary/secondary/muted/dim` — 텍스트 계층
- `--border: #27272a` — 테두리
- `--max-width: 960px` — 컨테이너 최대 폭
- 폰트: system sans-serif + monospace (SF Mono, Fira Code 등)

## Deployment

Vercel 정적 배포. `vercel.json`에 `css/`, `js/`, `assets/` 경로에 대해 1년 immutable 캐시 헤더가 설정되어 있다.

## Conventions

- 커밋 메시지: conventional commits (`feat:`, `fix:`, `style:`, `refactor:`, `docs:`)
- i18n 시스템은 제거됨 — 현재 영어 전용
- `assets/terminal-output.png` — 터미널 데모 이미지 (Retina PNG)
