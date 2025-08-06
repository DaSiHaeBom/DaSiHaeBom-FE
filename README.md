# 🚀 GIT BRANCH NAMING & COMMIT CONVENTION

## 📌 BRANCH NAMING RULES

브랜치 이름은 **카멜케이스(CamelCase)** 스타일을 따릅니다.

| BRANCH TYPE | DESCRIPTION | EXAMPLES |
| :--: | :-- | :-- |
| `main` | 배포 가능한 안정적인 코드가 존재하는 메인 브랜치 | `main` |
| `develop` | 기능 브랜치들을 병합하여 통합하는 개발 브랜치 | `develop` |
| `feat/` | 새로운 기능 개발 시 사용하는 브랜치 | `feat/loginPage`, `feat/mainPage` |
| `fix/` | 버그 수정 시 사용하는 브랜치 | `fix/loginError` |
| `hotfix/` | 긴급한 버그 수정 시 사용하는 브랜치<br>(`main`에서 분기 후 `main`과 `develop`에 병합) | `hotfix/loginError` |

> ✅ 브랜치 이름은 소문자 접두어 + 카멜케이스를 사용합니다.  
> ✅ 단어는 의미에 맞게 간결하고 명확하게 작성합니다.

---

## 📝 COMMIT MESSAGE TYPES

커밋 메시지는 아래 타입 중 하나를 선택하여 작성합니다:

| TYPE | DESCRIPTION |
| :--: | :-- |
| `feat` | ✨ 새로운 기능 추가 |
| `fix` | 🐛 버그 수정 |
| `docs` | 📝 문서 수정 (예: README 등) |
| `design` | 💄 UI 및 스타일 수정 (코드 로직에 영향 없음) |
| `refactor` | ♻️ 코드 리팩토링 (기능 변화 없음) |
| `test` | ✅ 테스트 코드 추가 또는 수정 |
| `chore` | 🔧 빌드 설정, 패키지 매니저 설정 등 기타 작업 |
| `perf` | ⚡️ 성능 개선 |
| `ci` | 👷 CI 설정 및 스크립트 수정 |
| `revert` | ⏪ 이전 커밋 되돌리기 |


