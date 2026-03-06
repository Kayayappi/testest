# Artli — 作家主体の条件付き正規取得プラットフォーム

## デプロイ先

本プロジェクトはVercelに静的デプロイされています: [https://testest-gilt.vercel.app](https://testest-gilt.vercel.app)

Artli は作家が設定した許諾条件のもとで作品を正規取得できるプラットフォームのプロトタイプです。

## 起動方法

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000) をブラウザで開いてください。

## このプロンプト（Prompt 1）でできること

- **トップページ** (`/`): サイト紹介、Featured Works (6件)、Featured Artists (4件)、CTA
- **作品一覧** (`/works`): 12作品をグリッド表示、フィルタ（商用/成人/学習タイプ）・検索・並び替えUI
- **作品詳細** (`/works/[id]`): 画像・説明・タグ・許諾条件バッジ＆詳細・価格・同作家の他作品
- **作家一覧** (`/artists`): 6作家をグリッド表示、スタイルタグフィルタ・検索UI
- **作家詳細** (`/artists/[id]`): プロフィール・ポリシー要約・代表作品・全作品一覧
- **404ページ**: Not Found 簡易ページ

### 許諾バッジ

各作品カードに以下のバッジを表示:
- 商用 (OK / NG / 要相談)
- 成人 (OK / NG / 要相談)
- 学習 (Light / Standard / Strong)
- 再配布 (OK / NG / 要相談)

### データ

ダミーデータは `src/lib/mock.ts` にまとめてあり、将来の DB 置き換えを想定した構造です。

## フォルダ構造

```
src/
├── app/
│   ├── layout.tsx          # 共通レイアウト (Header/Footer)
│   ├── page.tsx            # トップページ
│   ├── not-found.tsx       # 404ページ
│   ├── globals.css         # Tailwind CSS
│   ├── works/
│   │   ├── page.tsx        # 作品一覧
│   │   └── [id]/
│   │       └── page.tsx    # 作品詳細
│   └── artists/
│       ├── page.tsx        # 作家一覧
│       └── [id]/
│           └── page.tsx    # 作家詳細
├── components/
│   ├── Header.tsx          # ナビゲーションヘッダー
│   ├── Footer.tsx          # フッター
│   ├── ArtworkCard.tsx     # 作品カード（許諾バッジ付き）
│   ├── ArtistCard.tsx      # 作家カード
│   ├── LicenseBadges.tsx   # 許諾バッジコンポーネント
│   └── TagPills.tsx        # タグ表示コンポーネント
└── lib/
    └── mock.ts             # 型定義 + ダミーデータ (12作品 / 6作家)
```

## 技術スタック

- Next.js (App Router) + TypeScript
- Tailwind CSS
- ESLint

## 次のステップ (Prompt 2)

- 認証（ログイン/登録）
- ロール管理（作家/購入者/管理者）
- ダッシュボード（作家向け・管理者向け）
- DB 接続（Supabase 等）
- 画像アップロード
- 作品投稿・編集フロー
- 購入（Acquire）機能
