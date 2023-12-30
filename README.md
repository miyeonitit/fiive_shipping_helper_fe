<div width="100%" height="100%" align="center">

<h1>📦 fiive Shipping Helper 📦</h1>
<img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=Next.js&logoColor=white">
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white">
<img src="https://img.shields.io/badge/styled components-DB7093?style=flat-square&amp;logo=styled-components&amp;logoColor=white">
<img src="https://img.shields.io/badge/Recoil-3578E5?style=flat-square&amp;logo=recoil&amp;logoColor=white">

</div>

<br />

<br /><br />

# 1. Install Application

`.env` 와 `node 버전`을 확인 후, `npm install` 합니다. <br /><br />

# 2. Running Application

```bash
$ npm run dev
```

<br />
 
# 3. env

### development mode

- `.env.development`

### production mode

- `.env.production`

<br />

# 4. Frontend Environment

## nvm

```bash
$ nvm install v{version}     # node 버전을 설치합니다.
$ nvm ls                     # 설치된 node 버전 목록을 확인합니다.
$ nvm use {version}          # node 버전을 사용합니다.
```

<br />

# 5. Commit Rule

1. `git add -p` 로 commit 단위를 고려해 주세요.

2. commit 을 남깁니다. 이때 작업한 내역에 해당되는 gitmoji를 선택할 수 있습니다.

```bash
$ npm run commit
```

| gitmoji | 의미        | 예시                            |
| ------- | ----------- | ------------------------------- |
| ✨      | 기능 추가   | ✨ ADD : Auth Guard             |
| 🐛      | 버그 수정   | 🐛 BUG : Role Guard             |
| 📝      | 문서 작업   | 📝 DOCS : README on root        |
| 🚑️     | 긴급 수정   | 🚑️ HOTFIX : Login access token |
| ♻️      | 리팩토링    | ♻️ REFACTOR : jwt.strategy      |
| ✅      | 테스트 코드 | ✅ TEST : Auth Guard            |
| 🚚      | 기타        | 🚚 ETC : package.json           |

<br />
