# VideoPlayer PWA — セットアップ手順

## ファイル構成
```
video-player/
├── index.html       メインアプリ
├── manifest.json    PWA設定
├── sw.js            Service Worker
├── icon-192.png     アイコン
└── icon-512.png     アイコン
```

## 公開手順（GitHub Pages）

1. GitHubに新しいリポジトリを作成（例: `video-player`）
2. このフォルダ内のファイルをすべてアップロード
3. Settings → Pages → Branch: main / /(root) → Save
4. `https://あなたのID.github.io/video-player/` でアクセス可能に

## iPadにインストール

1. Safari で上記URLを開く
2. 共有ボタン（□↑）→「ホーム画面に追加」
3. 「追加」をタップ
4. ホーム画面のアイコンから起動

## 使い方

1. 「フォルダ選択」ボタン → ファイルアプリの動画フォルダを選択
2. 「許可」をタップ
3. リストから動画をタップして再生
4. 次回起動時は「再読み込み」ボタンで同じフォルダを復元

## 対応動画形式
- MP4（H.264）★ 推奨
- MOV
- M4V

## iOS制限について
- フォルダのハンドルはIndexedDBに保存済み
- 次回起動時にアクセス許可が再度必要（iOSのセキュリティ仕様）
- 「再読み込み」ボタンで「許可」をタップすれば即座に復元
