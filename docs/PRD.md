# [PRD] 마이링크 (MyLink) — 링크트리 클론 서비스 제품 기능 정의서

---

## 1. 프로젝트 개요 (Overview)

### 1.1 서비스 소개
- **서비스명**: 마이링크 (MyLink)
- **개념**: 여러 개의 웹 링크, SNS 채널, 포트폴리오를 하나의 프로필 링크로 통합하여 공유할 수 있는 **링크트리(Linktree) 클론 서비스**
- **디자인 철학 & 구축 원칙 (Design System Architecture)**: 
  - **shadcn/ui 구조적 기반 & 재사용 컴포넌트 아키텍처**: 모든 UI 컴포넌트는 접근성과 안정성이 검증된 [shadcn/ui](https://ui.shadcn.com/)의 프리미티브(`@/components/ui/*`), `cva`, `cn` 유틸리티를 기반으로 제작하며, 단일 페이지 인라인 작성을 지양하고 **재사용 가능한 컴포넌트(`ProfileHeader`, `SocialLinks`, `LinkList`, `LinkCard`, `CategoryFilter`)로 분리 모듈화**하여 지속 가능한 설계를 준수합니다.
  - **스타일링 통일 원칙 (No CSS Modules / Pure Tailwind CSS)**: CSS 모듈(`*.module.css`) 사용을 전면 배제하고, 모든 스타일링을 **Tailwind CSS v4 유틸리티 클래스와 `@theme` CSS 변수로 100% 일원화**하여 컴포넌트 간 스타일 충돌 방지 및 일관된 디자인 토큰을 강제합니다.
  - **토스 디자인 시스템(TDS, `design.md`) 시각적 규격 100% 반영**: shadcn/ui의 기본 neutral 테마 대신, 프로젝트의 [`design.md`](file:///c:/Users/minhyeok/OneDrive/바탕%20화면/SMU/projects/my-link-hyeok/design.md)에 정의된 **토스(Toss) 디자인 시스템의 정식 컬러 토큰, 타이포그래피, 16px 곡률, 모션 커브를 shadcn/ui 컴포넌트에 주입**하여 완벽한 토스 감성의 UI를 완성합니다.
- **시연 목적 및 접근 방식**:
  - 현재 프로젝트는 단계별(Phased) 라이브 시연을 목표로 합니다.
  - **1단계(Phase 1)**에서는 대시보드나 통계 기능 등 복잡한 관리자 영역을 제외하고, **브라우저 로컬 스토리지(LocalStorage)를 활용한 프로필 페이지 렌더링에만 집중**하여 빌드합니다.

### 1.2 핵심 기술 스택
| 구분 | 기술 스택 | 버전 및 비고 |
| :--- | :--- | :--- |
| **프레임워크** | Next.js (App Router, Turbopack) | `16.3.6` (React 19) |
| **디자인 시스템** | **shadcn/ui + TDS (design.md)** | `@latest` (v4 Nova / Base-UI 아키텍처, 재사용 컴포넌트 모듈화) |
| **스타일링** | **Tailwind CSS v4 (100% 통일)** | `@tailwindcss/postcss ^4` (CSS 모듈 일체 배제, Pure Tailwind 유틸리티 및 `@theme` 일원화) |
| **상태 관리** | **Zustand** | `^5.0.16` (`persist` 미들웨어 기반 LocalStorage 영구화) |
| **아이콘 라이브러리** | **Lucide React** | `^1.70.0` |

---

## 2. 단계별 시연 로드맵 (Demonstration & Phased Roadmap)

> **현재 진행 단계: Phase 1 (데모 프로필 페이지 완성)**
> 대시보드 및 통계 기능은 Phase 1 시연 완료 후 순차적으로 진행합니다.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Phase 1 (★ 현 단계 - 프로필 페이지 시연)                                    │
│  - 로컬 스토리지(LocalStorage) 연동 및 기본 프로필/링크 데이터 영구화         │
│  - shadcn/ui 기반 컴포넌트를 TDS(토스 디자인 시스템) 스타일로 커스텀 구축    │
│  - Toss Blue(#3182F6) 포인트 및 grey-100 배경, 16px 라운드 카드 렌더링       │
│  ※ [제외] 대시보드(/admin), 통계 집계, 링크 편집 UI는 아직 구현하지 않음    │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ Phase 2 (차기 단계 - 대시보드 & 실시간 프리뷰)                              │
│  - shadcn/ui + TDS 기반 관리자 대시보드(/admin) 구현                         │
│  - 링크 추가/수정/삭제/순서변경(CRUD) 기능 (shadcn Dialog, Form, Switch 등) │
│  - 좌측 편집기 ↔ 우측 모바일 폰 목업 실시간 무지연 연동                     │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ Phase 3 (완성 단계 - 통계 및 멀티 테마 확장)                                │
│  - 링크별 클릭수 및 전체 페이지 조회수 집계 기능                            │
│  - shadcn 테마 토큰 기반 4대 프리셋 테마(토스 블루, 다크, 파스텔, 네오브루탈)│
└─────────────────────────────────────────────────────────────────────────────┘
```

### 단계별 상세 스코프

| 구분 | Phase 1 (현 시연 목표) | Phase 2 (예정) | Phase 3 (예정) |
| :--- | :--- | :--- | :--- |
| **핵심 목표** | **LocalStorage 기반 프로필 페이지** | **관리자 대시보드 & 프리뷰** | **분석 통계 & 테마 확장** |
| **디자인 컴포넌트** | **shadcn/ui + TDS 커스텀** (Card, Avatar, Button) | **shadcn/ui + TDS 커스텀** (Dialog, Input, Switch) | **shadcn 테마 토큰** 멀티 테마 연동 |
| **구현 범위** | • 프로필 뷰 페이지<br>• LocalStorage 데이터 로드<br>• TDS 비주얼 가이드라인 적용 | • `/admin` 편집 대시보드<br>• 링크 CRUD UI<br>• 실시간 2열 모바일 프리뷰 | • 페이지뷰/클릭수 카운터<br>• 통계 대시보드 탭<br>• 4대 테마 프리셋 전환 |
| **제외 항목** | **대시보드, 통계, 링크 편집 기능** | 백엔드 DB, 소셜 로그인 | 클라우드 동기화 |
| **상태 관리** | Zustand (`persist` 로컬스토리지) | Zustand (CRUD 액션 확장) | Zustand (통계 액션 확장) |

---

## 3. 사용자 시나리오 (User Scenarios)

### 3.1 주요 페르소나 (Key Personas)

1. **페르소나 A: 크리에이터 / 개발자 '이민혁' (프로필 개설자 / 관리자)**
   - **배경**: GitHub, 기술 블로그, 포트폴리오, SNS 등 다양한 활동 채널을 가지고 있음.
   - **목표**: 복잡한 웹 호스팅 설정 없이 단 1개의 주소로 자신의 디지털 프로필을 깔끔하게 공유하고 싶어 함.
   - **선호 스타일**: 군더더기 없는 토스 디자인 시스템(TDS) 특유의 신뢰감과 세련된 모던 인터페이스를 선호함.

2. **페르소나 B: SNS 팔로워 / 채용 담당자 '김지은' (프로필 방문자 / End-User)**
   - **배경**: 인스타그램 바이오 또는 이력서에 첨부된 링크(`mylink`)를 모바일 스마트폰으로 클릭하여 접속함.
   - **목표**: 로딩 지연이나 어색한 레이아웃 없이 원하는 정보(포트폴리오, SNS, 최신 글)를 빠르게 확인하고 이동하고자 함.

3. **페르소나 C: 라이브 시연자 (Presenter / Demonstrator)**
   - **배경**: 라이브 코딩 및 데모 시연 자리에서 청중에게 프로덕트의 발전 과정을 단계별로 시연함.
   - **목표**: 복잡한 백엔드 설정이나 로그인 과정 없이, 브라우저 로컬 스토리지만으로 완성도 높은 프로필 화면과 데이터 영구성이 동작함을 직관적으로 보여주고자 함.

---

### 3.2 단계별 사용자 여정 (End-to-End User Journeys)

#### [시나리오 1] 방문자의 모바일 프로필 탐색 및 링크 이동 (★ Phase 1 핵심)
```
[방문자 링크 클릭] ➔ [프로필 페이지 로드] ➔ [소개 & 소셜 확인] ➔ [링크 카드 탭] ➔ [외부 사이트 새 탭 이동]
```
1. **페이지 진입**: 방문자(김지은)가 모바일 기기에서 마이링크 프로필 주소로 접속합니다.
2. **첫인상 및 정체성 확인**: 
   - 화면 상단의 shadcn Avatar 컴포넌트(TDS 원형 보더 스타일), 표시 이름(`이민혁`), 그리고 한 줄 소개글을 통해 개설자의 정체성을 1초 만에 인지합니다.
   - 상단에 배치된 소셜 아이콘 바(GitHub, Instagram, Email)를 확인합니다.
3. **링크 탐색 및 터치 인터랙션**:
   - shadcn Card 기반에 TDS 16px 곡률과 1px 헤어라인 보더가 적용된 정갈한 링크 카드 목록을 탐색합니다.
   - 카드를 손가락으로 누르는 순간 TDS 고유 모션 곡선(`cubic-bezier(0.22, 0.61, 0.36, 1)`)에 따른 섬세한 탭 피드백(미세한 눌림 및 그림자 효과)을 경험합니다.
4. **목적지 이동**: 카드를 탭하면 외부 웹사이트가 안전하게 새 창(`target="_blank"`)으로 열려 콘텐츠를 소비합니다.

---

#### [시나리오 2] 라이브 시연자의 로컬 스토리지 데이터 영구성 시연 (★ Phase 1 핵심)
```
[데모 페이지 접속] ➔ [TDS 프로필 렌더링 확인] ➔ [개발자도구 LocalStorage 검증] ➔ [새로고침 후 데이터 유지 증명]
```
1. **초기 로드 및 데모 데이터 검증**:
   - 시연자가 브라우저를 열면 별도의 백엔드 API 호출 없이도 로컬 스토리지에 저장된 기본 데모 프로필과 링크 카드들이 0.1초 만에 TDS 스타일로 깔끔하게 렌더링됩니다.
2. **로컬 스토리지 영구화 확인**:
   - 브라우저 개발자 도구(F12)의 Application > Local Storage 탭을 열어 `mylink-storage` 키 안에 사용자의 프로필과 링크 데이터가 정형화된 JSON 형태로 보관되어 있음을 청중에게 보여줍니다.
3. **새로고침 및 무결성 증명**:
   - 페이지를 강력 새로고침(Ctrl+F5)하거나 탭을 닫았다 다시 열어도 하이드레이션 오류(Hydration Mismatch) 없이 기존 데이터가 온전히 복원되는 안정성을 시연합니다.

---

#### [시나리오 3] 크리에이터의 링크 관리 및 실시간 프리뷰 (Phase 2 예정)
```
[대시보드(/admin) 접속] ➔ [shadcn 다이얼로그로 링크 추가] ➔ [우측 모바일 폰 실시간 확인] ➔ [내 링크 복사]
```
1. **관리자 진입**: 개설자(이민혁)가 `/admin` 대시보드에 접속합니다.
2. **콘텐츠 수정 및 실시간 피드백**:
   - 좌측 편집 패널에서 shadcn/ui 기반 TDS 스타일 버튼을 눌러 모달(Dialog)을 띄우고 새 링크 제목과 URL을 입력합니다.
   - 우측 가상 모바일 기기 목업 화면에 타이핑 즉시 새 링크 카드가 렌더링되는 실시간 동기화를 체감합니다.
3. **링크 재배치 및 노출 토글**:
   - shadcn Switch 토글로 특정 링크를 임시 비활성화하고 순서를 재배치합니다.
4. **링크 공유**: 상단의 "내 링크 복사" 버튼을 탭하여 토스트 알림과 함께 클립보드에 복사합니다.

---

#### [시나리오 4] 성과 분석 및 테마 브랜딩 커스터마이징 (Phase 3 예정)
```
[통계 탭 진입] ➔ [조회수 및 클릭수 분석] ➔ [테마 탭 진입] ➔ [1클릭 테마 전환]
```
1. **유입 통계 확인**:
   - 대시보드 `[통계]` 탭에서 총 페이지뷰와 각 링크별 클릭수를 카드 형태로 확인합니다.
2. **원클릭 테마 변경**:
   - shadcn CSS 변수를 활용해 토스 블루, 클린 다크, 파스텔, 네오브루탈 테마를 1클릭 전환합니다.

---

## 4. Phase 1 상세 요구사항 (Current Scope)

### 4.1 프로필 페이지 화면 구성 (shadcn/ui + TDS 컴포넌트 기준)
1. **프로필 영역 (Profile Header)**:
   - 프로필 아바타: `Avatar` 컴포넌트 (80×80px 원형, 흰색 2px 보더, TDS 서브 섀도우)
   - 표시 이름: Title-1 (20px Bold, TDS `grey-900` `#191F28`)
   - 핸들 텍스트: `@username` (TDS `grey-500` `#8B95A1`)
   - 한 줄 소개글: Bio (TDS `grey-700` `#4E5968`, 최대 2줄 중앙 정렬)
2. **소셜 링크 바 (Social Icons)**:
   - 등록된 SNS 링크를 shadcn `Button variant="ghost"` 기반 원형 아이콘 버튼(40×40px)으로 배치
3. **링크 카드 목록 (Link Cards)**:
   - shadcn/ui의 `Card` 컴포넌트를 TDS 스타일로 커스텀하여 세로 1열 스택 배치
   - 배경: 순백색 (`#FFFFFF`), 보더: TDS `grey-200` (`#E5E8EB`) 1px 헤어라인, 모서리: 16px R
   - 인터랙션: TDS 감속 곡선(`cubic-bezier(0.22, 0.61, 0.36, 1)`) 기반 부유 및 섀도우 전환
   - 카드 클릭 시 외부 새 탭(`target="_blank" rel="noopener noreferrer"`)으로 이동
4. **푸터 (Footer)**:
   - TDS 서브 텍스트 스타일 브랜딩 (`마이링크로 나만의 프로필을 만들어보세요`)

### 4.2 로컬 스토리지(LocalStorage) 연동 규칙
- 브라우저의 `localStorage`에 `mylink-storage` 키로 프로필 및 링크 데이터를 영구 저장
- Next.js SSR과의 하이드레이션 불일치(Hydration Mismatch)를 방지하기 위해 클라이언트 마운트 플래그(`hasHydrated`) 보장

---

## 5. Phase 1 데이터 모델 및 상태 관리 명세

### 5.1 Zustand 스토어 명세 (`useLinkStore`)

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 1. 프로필 정보 모델
export interface UserProfile {
  username: string;       // 핸들 (예: 'minhijk')
  displayName: string;    // 표시 이름 (예: '이민혁')
  bio: string;            // 소개 문구
  avatarUrl?: string;     // 프로필 이미지 URL
  socials: {
    github?: string;
    instagram?: string;
    twitter?: string;
    email?: string;
  };
}

// 2. 링크 아이템 모델
export interface LinkItem {
  id: string;             // 고유 ID
  title: string;          // 링크 제목 (예: '🚀 포트폴리오 웹사이트 (2026)')
  url: string;            // 목적지 URL (예: 'https://...')
  isActive: boolean;      // 활성화 여부
  order: number;          // 노출 순서
  description?: string;   // 카드 내 부가 설명 (선택)
  badge?: string;         // 강조 뱃지 (선택, 예: '대표 링크', 'NEW')
  icon?: string;          // 아이콘 식별자 (선택)
  category?: string;      // 카테고리 태그 (선택)
}

// 3. Phase 1 스토어 상태 구조
export interface LinkStoreState {
  profile: UserProfile;
  links: LinkItem[];

  // 초기화 및 데이터 복원 액션
  resetToDefault: () => void;
  setProfile: (profile: Partial<UserProfile>) => void;
  setLinks: (links: LinkItem[]) => void;
}
```

### 5.2 기본 시연용 더미 데이터 파일 체계 (Mock Data Architecture)

본 프로젝트는 Phase 1 프로필 뷰 시연 및 향후 백엔드 API 연동을 위해 **프로젝트 내 표준 더미 데이터 파일 2종**을 공식 데이터 소스로 채택하여 사용합니다:

1. **클라이언트 / LocalStorage 기본 주입용 파일**: [`src/data/links.json`](file:///c:/Users/minhyeok/OneDrive/바탕%20화면/SMU/projects/my-link-hyeok/src/data/links.json)
   - Zustand 스토어 및 브라우저 LocalStorage에 최초 주입되는 표준 데이터셋입니다.
2. **백엔드 Mock REST API 응답 규격 파일**: [`src/data/mockApiResponse.json`](file:///c:/Users/minhyeok/OneDrive/바탕%20화면/SMU/projects/my-link-hyeok/src/data/mockApiResponse.json)
   - 백엔드 RESTful API(`GET /api/v1/users/:username/links`)의 표준 Envelope 응답 명세입니다.

#### 공식 기본 더미 데이터셋 (`src/data/links.json` 내용)

```json
{
  "profile": {
    "username": "minhijk",
    "displayName": "이민혁",
    "bio": "사용자 경험을 고민하는 프론트엔드 개발자입니다.",
    "avatarUrl": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces",
    "socials": {
      "github": "https://github.com/minhijk",
      "instagram": "https://instagram.com",
      "email": "mailto:minhijk@example.com"
    }
  },
  "links": [
    {
      "id": "link-1",
      "title": "🚀 포트폴리오 웹사이트 (2026)",
      "url": "https://github.com/minhijk",
      "isActive": true,
      "order": 1,
      "description": "Next.js 16과 TypeScript로 제작한 개인 인터랙티브 포트폴리오",
      "badge": "대표 링크",
      "icon": "globe",
      "category": "portfolio"
    },
    {
      "id": "link-2",
      "title": "📝 최근 기술 블로그 포스팅",
      "url": "https://velog.io",
      "isActive": true,
      "order": 2,
      "description": "토스 디자인 시스템(TDS)과 shadcn/ui 결합기: 모던 웹 컴포넌트 설계",
      "badge": "NEW",
      "icon": "book-open",
      "category": "blog"
    },
    {
      "id": "link-3",
      "title": "💼 이력서 및 경력기술서 (PDF)",
      "url": "https://notion.so",
      "isActive": true,
      "order": 3,
      "description": "사용자 중심의 가치를 만드는 프론트엔드 엔지니어링 경험 정리",
      "badge": null,
      "icon": "file-text",
      "category": "career"
    },
    {
      "id": "link-4",
      "title": "📦 오픈소스 마이링크 (MyLink) 저장소",
      "url": "https://github.com/minhijk/my-link",
      "isActive": true,
      "order": 4,
      "description": "누구나 1분 만에 만드는 링크트리 클론 오픈소스 프로젝트",
      "badge": "오픈소스",
      "icon": "github",
      "category": "project"
    },
    {
      "id": "link-5",
      "title": "☕ 1:1 커피챗 & 멘토링 신청하기",
      "url": "https://calendly.com",
      "isActive": true,
      "order": 5,
      "description": "프론트엔드 커리어, 기술 고민 등 편하게 이야기 나눠요",
      "badge": null,
      "icon": "coffee",
      "category": "networking"
    },
    {
      "id": "link-6",
      "title": "🎨 토스 디자인 시스템(TDS) 리서치",
      "url": "https://toss.tech",
      "isActive": true,
      "order": 6,
      "description": "토스의 미니멀한 인터페이스와 큐빅 베지어 모션 인터랙션 분석",
      "badge": null,
      "icon": "sparkles",
      "category": "design"
    }
  ]
}
```

---

## 6. shadcn/ui 기반 토스 디자인 시스템(TDS) 구축 명세 (`design.md` 연계)

본 프로젝트는 shadcn/ui의 컴포넌트 아키텍처 위에 [`design.md`](file:///c:/Users/minhyeok/OneDrive/바탕%20화면/SMU/projects/my-link-hyeok/design.md)에 기술된 **TDS 공식 토큰을 100% 결합**하여 구축합니다.

### 6.1 토스 디자인 시스템(TDS) 컬러 토큰 매핑
| TDS 역할 (design.md) | TDS 토스 발행값 | shadcn/ui CSS 변수 매핑 | 용도 및 규칙 |
| :--- | :--- | :--- | :--- |
| **Primary (Brand)** | `oklch(0.620 0.191 258)` / `#3182F6` | `--primary` | 카노니컬 Toss Blue, 화면당 주요 강조 CTA에 집중 사용 |
| **Primary Foreground**| `oklch(1.000 0.000 0)` / `#FFFFFF` | `--primary-foreground` | Toss Blue 배경 위의 흰색 텍스트 |
| **Grey Background** | `oklch(0.966 0.003 248)` / `#F2F4F6` | `--background` | TDS `grey-100`, 라이트 테마 전체 캔버스 배경색 |
| **Card / Surface** | `oklch(1.000 0.000 0)` / `#FFFFFF` | `--card` | 링크 카드 및 패널의 순백색 표면 |
| **Primary Text** | `oklch(0.237 0.020 258)` / `#191F28` | `--foreground`, `--card-foreground` | TDS `grey-900`, 절대 순수 블랙(#000)을 사용하지 않음 |
| **Secondary Text** | `oklch(0.460 0.028 256)` / `#4E5968` | `--muted-foreground` | TDS `grey-700`, 본문 보조 및 소개 문구 |
| **Disabled / Hint** | `oklch(0.779 0.016 251)` / `#B0B8C1` | `--muted` | TDS `grey-400`, 비활성 텍스트 및 안내 요소 |
| **Hairline Border** | `oklch(0.930 0.005 248)` / `#E5E8EB` | `--border`, `--input` | TDS `grey-200`, 카드 및 구분선 1px 헤어라인 보더 |
| **Focus Ring** | `oklch(0.620 0.191 258)` / `#3182F6` | `--ring` | 키보드 네비게이션 포커스 링 (Toss Blue) |

### 6.2 타이포그래피 계층 (Typography)
- **기본 폰트 패밀리**: `"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif`
- **제목 (Title-1)**: `fontSize: 20px`, `fontWeight: 700`, `lineHeight: 1.35`, `letterSpacing: -0.015em`
- **카드 타이틀 (Title-2)**: `fontSize: 17px`, `fontWeight: 600`, `lineHeight: 1.45`, `letterSpacing: -0.010em`
- **소개글 (Body-1)**: `fontSize: 15px`, `fontWeight: 400`, `lineHeight: 1.50`, `letterSpacing: -0.010em`
- **캡션 / 힌트 (Body-2)**: `fontSize: 13px`, `fontWeight: 400`, `lineHeight: 1.40`, `letterSpacing: -0.005em`

### 6.3 곡률 및 인터랙션 모션 (Radius & Motion)
- **시그니처 라운드**: `--radius: 1rem` (16px)을 기본으로 적용하여 토스 앱 특유의 둥글고 부드러운 인상 제공
- **TDS 감속 모션 커브**: `cubic-bezier(0.22, 0.61, 0.36, 1)`
  - 카드 호버 / 탭 시: `transform: translateY(-2px)`, 그림자 `shadow-sm` ➔ `shadow-md`로 자연스럽게 전환
  - 버튼 누름(Pressed) 상태: `scale(0.98)` 또는 `translateY(1px)`의 즉각적인 촉각적 터치 피드백 제공

### 6.4 스타일링 통일 규격 및 재사용 컴포넌트 아키텍처 (Styling & Reusable Components)
- **CSS 모듈 사용 전면 배제 (No CSS Modules)**:
  - `*.module.css` 또는 별도 컴포넌트 분리형 CSS 파일을 생성하지 않습니다.
  - 모든 컴포넌트와 페이지의 레이아웃, 간격, 반응형, 다크모드, 상태별(hover, active, focus) 스타일은 순수 **Tailwind CSS v4** 유틸리티 클래스로만 통일하여 일관성과 유지보수성을 극대화합니다.
- **shadcn/ui 기반 재사용 컴포넌트 계층도**:
  - `components/ui/*`: shadcn/ui 기본 프리미티브 컴포넌트 (`Card`, `Avatar`, `Button`, `Badge` 등)
  - `components/ProfileHeader.tsx`: 아바타, 이름, 핸들, 바이오, 소셜 아이콘을 결합한 재사용 가능한 프로필 헤더 컴포넌트
  - `components/SocialLinks.tsx`: shadcn `Button`과 아이콘을 패키징한 소셜 채널 링크 바 컴포넌트
  - `components/LinkCard.tsx`: shadcn `Card` + `Badge` 기반의 16px 곡률 탭 인터랙티브 링크 카드 컴포넌트
  - `components/LinkList.tsx`: 카드 목록 반복 렌더링, 정렬, 빈 상태(Empty State)를 일관되게 캡슐화한 재사용 컴포넌트
  - `components/CategoryFilter.tsx`: 카테고리 태그 칩 필터링 컴포넌트
- **재사용 가이드라인**:
  - 페이지(`app/page.tsx`, `app/links/page.tsx` 등)는 비즈니스 로직 및 컴포넌트 조합에만 집중하며, UI 요소는 반드시 위 재사용 컴포넌트를 호출하여 렌더링합니다.

---

## 7. 향후 구현 예정 스펙 (Phase 2 & Phase 3 참조용)

- **Phase 2 (대시보드 & 실시간 프리뷰)**:
  - 경로: `/admin`
  - shadcn 컴포넌트 활용: `Dialog`, `Input`, `Switch`, `DropdownMenu`, `Tabs`
  - 좌우 2열 분할 레이아웃 및 60fps 무지연 모바일 폰 목업 프리뷰 동기화
- **Phase 3 (통계 및 멀티 테마)**:
  - `recordPageview`, `recordClick` 액션 및 총 조회수 / 링크별 클릭수 카운트
  - shadcn CSS 변수를 전환하는 4대 프리셋 테마(TDS 토스 블루, 다크, 파스텔, 네오브루탈)
- **Phase 4 (장기 계획)**:
  - Supabase Auth(소셜 로그인) 및 DB 클라우드 동기화
  - 커스텀 도메인 매핑 기능
