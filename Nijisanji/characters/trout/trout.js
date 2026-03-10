document.addEventListener('DOMContentLoaded', () => {
    // Nagisa Trout JS

    // Egosurfer Mode
    const egoToggle = document.getElementById('ego-toggle');
    const overlay = document.getElementById('ego-overlay');
    const tweetContainer = document.getElementById('tweet-container');

    egoToggle.addEventListener('click', () => {
        const isActive = document.body.classList.toggle('ego-mode');
        egoToggle.classList.toggle('active');

        if (isActive) {
            spawnTweets();
        } else {
            tweetContainer.innerHTML = '';
        }
    });

    document.addEventListener('mousemove', (e) => {
        document.documentElement.style.setProperty('--mouse-x', e.clientX + 'px');
        document.documentElement.style.setProperty('--mouse-y', e.clientY + 'px');
    });

    const tweetTexts = [
        "トラウトくんのラップ、ガチで天才！",
        "エゴサの悪魔に見つかっちゃう…w",
        "Specialeのシェフ、今日も料理放棄してて草",
        "昨日の配信、10万いいねの大バズり記念！",
        "トラウトくんのツッコミ語彙力高すぎん？"
    ];

    function spawnTweets() {
        for (let i = 0; i < 10; i++) {
            const tweet = document.createElement('div');
            tweet.className = 'floating-tweet';
            tweet.textContent = tweetTexts[Math.floor(Math.random() * tweetTexts.length)];
            tweet.style.left = Math.random() * 80 + 10 + '%';
            tweet.style.top = Math.random() * 80 + 10 + '%';
            tweetContainer.appendChild(tweet);
        }
    }

    // Oji-san Koubun Generator
    const ojisanText = document.getElementById('ojisan-text');
    const genBtn = document.getElementById('gen-btn');

    const phrases = [
        "渚トラウトちゃん、お疲れ様(^_^)💦",
        "今日は、何、食べてるのかな？😃❤️",
        "おじさん、トラウトちゃんのラップ、大好きなんだよ？😅✋",
        "今度、一緒に、美味しい、ハイボール、飲みに行こうよ❤️（笑）",
        "トラウトちゃん、泣かないで？おじさんが、守ってあげるからネ❤️😘"
    ];

    genBtn.addEventListener('click', () => {
        ojisanText.style.opacity = 0;
        setTimeout(() => {
            ojisanText.textContent = phrases[Math.floor(Math.random() * phrases.length)];
            ojisanText.style.opacity = 1;
        }, 200);
    });

    // Rap Flow Animation
    const lyrics = document.querySelectorAll('.lyric-line');
    lyrics.forEach(lyric => {
        lyric.addEventListener('mouseenter', () => {
            const rhyme = lyric.getAttribute('data-rhyme');
            lyrics.forEach(l => {
                if (l.getAttribute('data-rhyme') === rhyme) {
                    l.style.color = 'var(--trout-blue)';
                    l.style.textShadow = '0 0 10px var(--trout-blue)';
                }
            });
        });
        lyric.addEventListener('mouseleave', () => {
            lyrics.forEach(l => {
                l.style.color = '';
                l.style.textShadow = '';
            });
        });
    });

    // Reveal animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.rap-lyrics-section, .chef-card, .ojisan-generator').forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });
});
