# セットアップ手順

## 1. リポジトリをクローン
git clone https://github.com/KaungSetLinn/project-template.git

## 2. バックエンドセットアップ
cd backend

# 仮想環境を作成
python -m venv venv

# 仮想環境を有効化
# Mac/Linux
source venv/bin/activate
# Windows
venv\Scripts\activate

# 必要パッケージをインストール
pip install -r requirements.txt

# 環境変数ファイルをコピーして編集
cp .env.example .env

# マイグレーションを実行
python manage.py migrate

# 開発サーバーを起動
python manage.py runserver


## 3. フロントエンドセットアップ
cd ../frontend

# 依存パッケージをインストール
npm install

# 環境変数ファイルをコピーして編集
cp .env.example .env

# 開発サーバーを起動
npm run dev
