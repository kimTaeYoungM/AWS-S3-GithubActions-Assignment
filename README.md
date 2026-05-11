# 재고 관리 시스템 CI/CD 및 호스팅 과제

## 프로젝트 개요

본 프로젝트는 React를 활용하여 구현한 간단한 재고 관리 시스템입니다.

사용자는 상품명과 수량을 입력하여 새로운 상품을 재고 목록에 추가할 수 있으며, 등록된 상품의 수량을 증가 또는 감소시킬 수 있습니다. 또한 필요하지 않은 상품은 삭제할 수 있도록 구현했습니다.

본 프로젝트는 과제 요구사항에 따라 두 가지 방식으로 배포를 진행했습니다.

1. GitHub Actions를 활용한 AWS S3 자동 배포
2. AWS Amplify 서비스를 활용한 GitHub Repository 기반 호스팅

---

# 과제 1. GitHub Actions를 활용한 CI/CD 환경 구축

## 1. 과제 1 개요

과제 1에서는 React로 구현한 재고 관리 시스템을 GitHub Repository에 업로드하고, GitHub Actions를 활용하여 AWS S3에 자동 배포되는 CI/CD 환경을 구축했습니다.

main 브랜치에 코드가 push되면 GitHub Actions가 자동으로 실행되며, React 프로젝트를 빌드한 뒤 AWS S3 버킷에 배포합니다.

배포된 결과물은 S3 정적 웹 사이트 호스팅 기능을 통해 웹 브라우저에서 접속할 수 있습니다.

---

## 2. 구현한 시스템 소개

본 시스템은 간단한 재고 관리 기능을 제공하는 React 기반 웹 시스템입니다.

시스템 이름은 `재고 관리 시스템`이며, 상품명과 수량을 관리할 수 있는 기본적인 재고 관리 기능을 제공합니다.

별도의 백엔드 서버나 데이터베이스 없이 프론트엔드에서 동작하는 정적 웹 애플리케이션으로 구현했습니다.

---

## 3. 주요 기능

### 3.1 상품 추가 기능

사용자는 상품명과 수량을 입력한 뒤 `상품 추가` 버튼을 눌러 새로운 상품을 재고 목록에 추가할 수 있습니다.

예시 입력값은 다음과 같습니다.

- 상품명: 노트북
- 수량: 10

상품을 추가하면 입력한 상품이 목록에 표시됩니다.

---

### 3.2 재고 목록 조회 기능

등록된 상품은 표 형태로 출력됩니다.

표에는 다음 항목이 표시됩니다.

| 항목 | 설명 |
|---|---|
| 상품명 | 등록된 상품의 이름 |
| 수량 | 현재 재고 수량 |
| 관리 | 수량 증가, 수량 감소, 삭제 버튼 |

---

### 3.3 수량 증가 기능

각 상품의 `+` 버튼을 누르면 해당 상품의 재고 수량이 1개 증가합니다.

---

### 3.4 수량 감소 기능

각 상품의 `-` 버튼을 누르면 해당 상품의 재고 수량이 1개 감소합니다.

---

### 3.5 상품 삭제 기능

각 상품의 `삭제` 버튼을 누르면 해당 상품이 재고 목록에서 제거됩니다.

---

## 4. 사용 기술

| 구분 | 사용 기술 |
|---|---|
| Frontend | React |
| Language | JavaScript |
| Styling | CSS |
| Build Tool | npm |
| Version Control | Git, GitHub |
| CI/CD | GitHub Actions |
| Hosting | AWS S3 Static Website Hosting |
| Cloud Environment | AWS Academy |

---

## 5. GitHub Repository 구성

본 프로젝트는 GitHub Repository에 업로드하여 관리했습니다.

주요 구성은 다음과 같습니다.

```text
project-root
├── src
│   ├── App.jsx
│   └── App.css
├── public
├── .github
│   └── workflows
│       └── deploy.yml
├── package.json
└── README.md
```

`.github/workflows/deploy.yml` 파일을 통해 GitHub Actions 자동 배포 환경을 구성했습니다.

---

## 6. GitHub Actions CI/CD 구성

GitHub Actions는 GitHub Repository의 main 브랜치에 push가 발생했을 때 자동으로 실행되도록 설정했습니다.

자동 배포 흐름은 다음과 같습니다.

```text
코드 수정
  ↓
GitHub main 브랜치에 push
  ↓
GitHub Actions workflow 실행
  ↓
Node.js 환경 설정
  ↓
npm install
  ↓
npm run build
  ↓
AWS 자격 증명 설정
  ↓
AWS S3 버킷으로 빌드 결과물 업로드
  ↓
S3 정적 웹 사이트 URL에서 결과 확인
```

---

## 7. GitHub Actions Workflow 설명

본 프로젝트의 GitHub Actions 설정 파일은 다음 경로에 위치합니다.

```text
.github/workflows/deploy.yml
```

Workflow의 주요 역할은 다음과 같습니다.

### 7.1 main 브랜치 push 감지

```yaml
on:
  push:
    branches:
      - main
```

main 브랜치에 코드가 push되면 workflow가 자동으로 실행됩니다.

---

### 7.2 Node.js 환경 설정

```yaml
- name: Set up Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '20'
```

React 프로젝트를 빌드하기 위해 Node.js 20 버전을 사용했습니다.

---

### 7.3 패키지 설치 및 빌드

```yaml
- name: Install and Build
  run: |
    npm install
    npm run build
```

`npm install` 명령어로 필요한 패키지를 설치하고, `npm run build` 명령어로 배포용 정적 파일을 생성합니다.

---

### 7.4 AWS 자격 증명 설정

AWS Academy에서 발급받은 임시 자격 증명을 GitHub Repository Secrets에 저장한 뒤, GitHub Actions에서 사용했습니다.

사용한 GitHub Secrets는 다음과 같습니다.

| Secret 이름 | 설명 |
|---|---|
| AWS_ACCESS_KEY_ID | AWS Academy Access Key ID |
| AWS_SECRET_ACCESS_KEY | AWS Academy Secret Access Key |
| AWS_SESSION_TOKEN | AWS Academy Session Token |

AWS Academy의 자격 증명은 임시 토큰 방식이므로 `AWS_SESSION_TOKEN`도 함께 설정해야 합니다.

---

### 7.5 S3 배포

React 빌드 결과물을 AWS S3 버킷에 업로드했습니다.

배포 대상 버킷은 다음과 같습니다.

```text
mybucket-20263607
```

배포 리전은 다음과 같습니다.

```text
us-east-1
```

---

## 8. AWS S3 정적 웹 사이트 호스팅

AWS S3 버킷에서 정적 웹 사이트 호스팅을 활성화했습니다.

설정 내용은 다음과 같습니다.

| 항목 | 설정 |
|---|---|
| 버킷 이름 | mybucket-20263607 |
| AWS 리전 | us-east-1 |
| 호스팅 방식 | 정적 웹 사이트 호스팅 |
| 인덱스 문서 | index.html |
| 배포 방식 | GitHub Actions 자동 배포 |

---

## 9. 과제 1 배포 결과

GitHub Actions workflow가 정상적으로 실행되었고, React 빌드 결과물이 AWS S3 버킷에 업로드되었습니다.

S3 정적 웹 사이트 호스팅 주소로 접속한 결과, 재고 관리 시스템 화면이 정상적으로 출력되는 것을 확인했습니다.

과제 1 배포 URL은 다음과 같습니다.

```text
http://mybucket-20263607.s3-website-us-east-1.amazonaws.com/
```

---

## 10. 과제 1 시연 영상

GitHub Actions를 활용한 CI/CD 구축 과정과 AWS S3 배포 결과를 시연한 영상입니다.

YouTube 링크:

```text
추후 추가 예정
```

---

# 과제 2. AWS Amplify 서비스를 활용한 호스팅

## 1. 과제 2 개요

과제 2에서는 과제 1에서 사용한 GitHub Repository를 AWS Amplify 서비스와 연결하여 React 웹 시스템을 호스팅했습니다.

과제 1에서는 GitHub Actions workflow 파일을 직접 작성하고 AWS S3 버킷에 배포하는 방식을 사용했습니다.

반면 과제 2에서는 AWS Amplify가 GitHub Repository를 직접 가져와 빌드와 배포를 자동으로 수행하도록 구성했습니다.

---

## 2. 과제 2 배포 방식

AWS Amplify는 GitHub Repository와 연결하여 자동 호스팅을 제공하는 서비스입니다.

본 프로젝트에서는 과제 1에서 사용한 동일한 GitHub Repository를 Amplify에 연결했습니다.

배포 흐름은 다음과 같습니다.

```text
과제 1 GitHub Repository
  ↓
AWS Amplify에서 GitHub 연결
  ↓
Repository 선택
  ↓
main 브랜치 선택
  ↓
Amplify 빌드 설정 확인
  ↓
npm install
  ↓
npm run build
  ↓
Amplify Hosting 배포
  ↓
Amplify URL로 웹사이트 접속
```

---

## 3. AWS Amplify 설정 내용

AWS Amplify에서 설정한 주요 내용은 다음과 같습니다.

| 항목 | 설정 |
|---|---|
| 호스팅 서비스 | AWS Amplify |
| 연결 Repository | 과제 1 GitHub Repository |
| 배포 브랜치 | main |
| Frontend Framework | React |
| Build Command | npm run build |
| Hosting URL | Amplify 제공 URL |

---

## 4. Amplify 빌드 과정

Amplify는 GitHub Repository의 코드를 가져온 뒤 자동으로 빌드와 배포를 수행합니다.

빌드 과정은 다음과 같습니다.

1. GitHub Repository 코드 가져오기
2. 의존성 설치
3. React 프로젝트 빌드
4. 빌드 결과물 배포
5. Amplify 도메인으로 접속 가능하도록 설정

---

## 5. Amplify 빌드 설정

본 프로젝트는 React 기반 프로젝트입니다.

빌드 명령어는 다음과 같습니다.

```text
npm run build
```

Vite 기반 React 프로젝트인 경우 빌드 결과물은 일반적으로 `dist` 폴더에 생성됩니다.

Amplify의 빌드 설정에서는 빌드 결과물 경로를 프로젝트에 맞게 설정해야 합니다.

예시 설정은 다음과 같습니다.

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm install
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: dist
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

---

## 6. 과제 2 배포 결과

AWS Amplify를 통해 배포를 진행한 결과, React 기반 재고 관리 시스템이 정상적으로 호스팅되었습니다.

Amplify에서 제공한 URL로 접속한 결과, 과제 1에서 구현한 재고 관리 시스템과 동일한 화면이 정상적으로 출력되는 것을 확인했습니다.

과제 2 배포 URL은 다음과 같습니다.

```text
https://main.d1dstmtfealnur.amplifyapp.com/
```

---

## 7. 과제 2 시연 영상

AWS Amplify 서비스를 활용하여 GitHub Repository를 연결하고 React 웹 시스템을 호스팅하는 과정을 시연한 영상입니다.

YouTube 링크:

```text
추후 추가 예정
```

---

# 과제 1과 과제 2 비교

| 구분 | 과제 1 | 과제 2 |
|---|---|---|
| 배포 방식 | GitHub Actions를 직접 구성하여 S3에 배포 | AWS Amplify에서 GitHub Repository를 연결하여 배포 |
| 사용 서비스 | GitHub Actions, AWS S3 | AWS Amplify |
| 설정 파일 | deploy.yml 직접 작성 | Amplify 빌드 설정 사용 |
| 호스팅 주소 | S3 정적 웹 사이트 엔드포인트 | Amplify 제공 도메인 |
| 배포 자동화 | main 브랜치 push 시 GitHub Actions 실행 | main 브랜치 push 시 Amplify 자동 빌드 및 배포 |
| 난이도 | AWS 자격 증명, S3 버킷, workflow 설정 필요 | GitHub 연결 후 비교적 간단하게 배포 가능 |
| 배포 URL | http://mybucket-20263607.s3-website-us-east-1.amazonaws.com/ | https://main.d1dstmtfealnur.amplifyapp.com/ |

---

# 전체 프로젝트 정리

본 프로젝트를 통해 React 기반 재고 관리 시스템을 구현하고, 두 가지 방식으로 웹 시스템을 배포했습니다.

첫 번째 방식은 GitHub Actions를 활용하여 AWS S3에 자동 배포하는 방식입니다. 이 방식에서는 workflow 파일을 직접 작성하고, AWS Academy 자격 증명을 GitHub Secrets에 등록하여 CI/CD 환경을 구성했습니다.

두 번째 방식은 AWS Amplify 서비스를 활용하여 GitHub Repository를 연결하고 자동 호스팅을 수행하는 방식입니다. Amplify는 GitHub Repository의 main 브랜치와 연결되어 코드 변경 시 자동으로 빌드와 배포를 수행합니다.

이를 통해 React 정적 웹 애플리케이션을 클라우드 환경에 배포하는 방법과, GitHub 기반의 자동화된 CI/CD 흐름을 이해할 수 있었습니다.

---

# 배포 URL 모음

## 과제 1: GitHub Actions + AWS S3

```text
http://mybucket-20263607.s3-website-us-east-1.amazonaws.com/
```

## 과제 2: AWS Amplify Hosting

```text
https://main.d1dstmtfealnur.amplifyapp.com/
```

---

# 참고 사항

AWS Academy 환경에서 생성한 자격 증명과 리소스는 제한 시간이 있을 수 있습니다.

따라서 AWS Academy 세션이 종료되거나 S3 버킷, Amplify 앱 등의 리소스가 삭제될 경우 배포 URL 접속이 불가능할 수 있습니다.
