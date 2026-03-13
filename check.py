import os

def get_folder_names(path='.'):
    """
    指定したパス内のフォルダ名のみを抽出して表示する
    """
    try:
        # 指定パス内の項目を取得し、ディレクトリ（フォルダ）のみを抽出
        items = os.listdir(path)
        folders = [item for item in items if os.path.isdir(os.path.join(path, item))]
        
        if not folders:
            print("フォルダは見つかりませんでした。")
            return
        
        print(f"--- フォルダ一覧 ({os.path.abspath(path)}) ---")
        for folder in folders:
            print(f"📂 {folder}")
            
    except FileNotFoundError:
        print("指定されたパスが見つかりません。")
    except PermissionError:
        print("アクセス権限がありません。")

if __name__ == "__main__":
    # 実行するパスを指定（デフォルトは現在のディレクトリ）
    target_path = "." 
    get_folder_names(target_path)