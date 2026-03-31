{
    // Aogiri Promo Generation Script for After Effects (V2: 日本語版対応・安全強化版)
    // 縦長のショート動画用(9:16)の立体空間を自動生成するスクリプト

    app.beginUndoGroup("Create Aogiri Promo 3D V2");

    try {
        var proj = app.project;
        if (!proj) {
            proj = app.newProject();
        }

        // デフォルトの画像フォルダ設定 (C:\Users\rpgmi\Videos\aogiri)
        var defaultFolder = new Folder("C:/Users/rpgmi/Videos/aogiri");
        if (defaultFolder.exists) {
            Folder.current = defaultFolder; // ダイアログの開始位置をセット
        }

        // 画像選択画面を開く（WindowsとMacで安全な方法）
        var isWin = ($.os.indexOf("Windows") !== -1);
        var msg = "あおぎり高校の画像を選択（最後の集合絵は含めないでください）";
        var imgFiles = isWin ? File.openDialog(msg, "*.png;*.jpg;*.psd", true) : File.openDialog(msg, "", true);

        // キャンセル時のnullエラーを防止
        if (imgFiles != null) {
            // 単一選択の場合に配列化する安全処理
            var targetFiles = [];
            if (imgFiles instanceof Array) {
                targetFiles = imgFiles;
            } else if (imgFiles instanceof File) {
                targetFiles.push(imgFiles);
            }

            for (var f = 0; f < targetFiles.length; f++) {
                var imgFile = targetFiles[f];
                if (!imgFile || !imgFile.exists) continue;

                var io = new ImportOptions(imgFile);
                var imgItem = proj.importFile(io);
                if (!imgItem) continue;
                
                // === 1. コンポジション設定 ===
                var compW = 1080;
                var compH = 1920;
                var compDuration = 15.0;
                var compFps = 60;
                
                var compName = imgItem.name.replace(/\.[^\.]+$/, "") + "_Promo";
                var comp = proj.items.addComp(compName, compW, compH, 1.0, compDuration, compFps);
                
                // === 2. 背景の構築 (奥に配置) ===
                var bgLayer = comp.layers.addSolid([0.05, 0.05, 0.08], "Cyber Background", compW, compH, 1.0);
                bgLayer.threeDLayer = true;
                bgLayer.transform.position.setValue([compW/2, compH/2, 3000]);
                bgLayer.transform.scale.setValue([600, 600, 100]);
                
                // グラデーション(CC Ramp) - 日本語名でのエラーを防ぐためインデックス指定
                // 1:Start Point, 2:Start Color, 3:End Point, 4:End Color
                var ramp = bgLayer.Effects.addProperty("ADBE Ramp");
                if (ramp != null) {
                    ramp.property(1).setValue([compW/2, 0]);
                    ramp.property(2).setValue([0.02, 0.08, 0.15]); // スタイリッシュな青緑色
                    ramp.property(3).setValue([compW/2, compH]);
                    ramp.property(4).setValue([0.01, 0.01, 0.03]); // ダークネイビー
                }
                
                // 薄い背景テキスト
                var textLayerBg = comp.layers.addText("PROJECT\nAOGIRI");
                textLayerBg.threeDLayer = true;
                var textDocBg = textLayerBg.property("Source Text").value;
                textDocBg.fontSize = 400;
                textDocBg.fillColor = [0.4, 0.7, 0.9];
                textDocBg.justification = ParagraphJustification.CENTER_JUSTIFY;
                textLayerBg.property("Source Text").setValue(textDocBg);
                textLayerBg.transform.position.setValue([compW/2, compH/2 - 200, 1500]);
                textLayerBg.transform.opacity.setValue(15);
                
                // === 3. 立ち絵の配置 (中央 Z=0) ===
                var charLayer = comp.layers.add(imgItem);
                charLayer.threeDLayer = true;
                
                // 自動スケーリング
                var minScaleX = (compW * 0.9) / charLayer.width * 100;
                var minScaleY = (compH * 0.75) / charLayer.height * 100;
                var scaleVal = Math.min(minScaleX, minScaleY);
                if (scaleVal > 150) scaleVal = 100;
                charLayer.transform.scale.setValue([scaleVal, scaleVal, 100]);
                
                // 位置と不透明度のアニメーション（transformを使った安全な書き方）
                charLayer.transform.position.setValueAtTime(0, [compW/2, compH/2 + 400, 0]);
                charLayer.transform.position.setValueAtTime(3, [compW/2, compH/2 + 100, 0]);
                charLayer.transform.opacity.setValueAtTime(0, 0);
                charLayer.transform.opacity.setValueAtTime(2, 100);
                
                // === 4. タイポグラフィ・テキスト (手前 Z=-800) ===
                var textLayerFg = comp.layers.addText("AOGIRI HIGH SCHOOL\nARCHIVE DATABASE");
                textLayerFg.threeDLayer = true;
                var textDocFg = textLayerFg.property("Source Text").value;
                textDocFg.fontSize = 55;
                textDocFg.fillColor = [0.95, 0.95, 1.0];
                textDocFg.font = "Arial"; 
                textDocFg.justification = ParagraphJustification.CENTER_JUSTIFY;
                textLayerFg.property("Source Text").setValue(textDocFg);
                
                textLayerFg.transform.position.setValue([compW/2, 350, -800]);
                textLayerFg.transform.opacity.setValueAtTime(1.5, 0);
                textLayerFg.transform.opacity.setValueAtTime(4.0, 100);

                // === 5. 3Dカメラとカメラワーク ===
                var camera = comp.layers.addCamera("Main Camera", [compW/2, compH/2]);
                var initZ = -2666;
                
                // カメラのアニメーション（ドリーイン）
                camera.transform.position.setValueAtTime(0, [compW/2, compH/2 - 100, initZ - 1200]);
                camera.transform.position.setValueAtTime(compDuration, [compW/2, compH/2 + 300, initZ + 600]);
                
                // 日本語名によるエラーを防ぐためのCameraOptionへの直接アクセス
                var camOpt = camera.cameraOption;
                if (camOpt != null) {
                    camOpt.depthOfField.setValue(1); // オン
                    camOpt.aperture.setValue(130);   // ボケ量
                    camOpt.blurLevel.setValue(150);
                    // エクスプレッションでカメラから立ち絵(Z=0)への正確な距離を常に算出する
                    camOpt.focusDistance.expression = "var p = transform.position; length(p, [thisComp.width/2, thisComp.height/2, 0])";
                }
                
                // コンポジションを開く
                comp.openInViewer();
            }
            if (targetFiles.length > 0) {
                alert("✨ 立体感ショート動画のベース（V2）が完成しました！\n\nスペースキー等でプレビュー（RAM再生）してご確認ください！");
            }
        }
    } catch (e) {
        alert("エラーが発生しました: " + e.line + "行目\n" + e.message + "\n\n(おそらく素材やAEのバージョンによるものです)");
    }

    app.endUndoGroup();
}
