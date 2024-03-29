## Getting Started

```bash
git clone https://github.com/DevCamp-TeamSparta/formflet-fe.git
cd formflet-fe
npm install
```

## Environment

```
## main
"dependencies": {
    "@amplitude/analytics-browser": "^2.3.8",
    "@hookform/resolvers": "^3.3.2",
    "axios": "^1.6.2",
    "clsx": "^2.0.0",
    "nanoid": "^5.0.4",
    "next": "14.0.2",
    "notion-client": "^6.16.0",
    "prismjs": "^1.29.0",
    "react": "^18",
    "react-cookie": "^6.1.1",
    "react-dom": "^18",
    "react-hook-form": "^7.48.2",
    "react-notion-x": "^6.16.0",
    "xlsx": "^0.18.5",
    "zod": "^3.22.4",
    "zustand": "^4.4.7"
  }

## dev
"dependencies": {
        "@amplitude/analytics-browser": "^2.3.8",
        "@hookform/resolvers": "^3.3.2",
        "axios": "^1.6.2",
        "clsx": "^2.0.0",
        "next": "14.0.2",
        "prismjs": "^1.29.0",
        "react": "^18",
        "react-cookie": "^6.1.1",
        "react-dom": "^18",
        "react-hook-form": "^7.48.2",
        "xlsx": "^0.18.5",
        "zod": "^3.22.4",
        "zustand": "^4.4.7"
      }

```

> `main` react-notion-x 라이브러리를 사용하여 노션 페이지에 대한 데이터를 불러와 DB에 저장하고 불러오는 방식 사용

> `develop` puppeteer를 사용해서 백엔드에서 크롤링하여 DB에 저장하고, 불러오는 방식 사용.
