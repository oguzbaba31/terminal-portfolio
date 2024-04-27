window.onload = function() {
    const terminal = document.getElementById('terminal') as HTMLDivElement;
    let input: HTMLInputElement | null = null;
    const languageKey = 'terminalLanguage';
    let currentLanguage = localStorage.getItem(languageKey) || 'en';
    const soundFilePath = 'static/effects/keyboard-sound.mp3';
    const keyboardSound = new Audio(soundFilePath);
    keyboardSound.volume = 0.15;
    let isPlaying = false;

    function appendText(text: string) {
        const p = document.createElement('p');
        if (currentLanguage === 'tr') {
            // Türkçe komutlar
            if (text === "Type 'reboot' to reboot system...") {
                text = "'reboot' yazarak sistemi yeniden başlatın...";
            } else if (text === "Booting the system...") {
                text = "Sistem başlatılıyor...";
            } else if (text === "Loading data...") {
                text = "Veriler yükleniyor...";
            } else if (text === "Preparing the environment...") {
                text = "Ortam hazırlanıyor...";
            } else if (text === "Ready.") {
                text = "Hazır.";
            } else if (text === "Type 'help' for a list of commands.") {
                text = "Komut listesini görmek için 'help' yazın.";
            }
        }
        p.textContent = text;
        terminal.insertBefore(p, input);
        scrollToBottom();
    }

    function scrollToBottom() {
        terminal.scrollTop = terminal.scrollHeight;
    }

    function simulateLoading() {
        const messages = [
            "Type 'reboot' to reboot system...", 
            "Booting the system...", 
            "Loading data...", 
            "Preparing the environment...", 
            "Ready.", 
            "Type 'help' for a list of commands."
        ];
        messages.forEach((msg, index) => {
            setTimeout(() => {
                appendText(msg);
                if (index === messages.length - 1) {
                    createInput();
                }
            }, 1000 * (index + 1));
        });
    }

    function handleCommand(command: string) {
        switch(command.toLowerCase()) {
            case 'help':
                if (currentLanguage === 'tr') {
                    appendText("Komutlar:");
                    appendText("- help: Bu yardım mesajını gösterir");
                    appendText("- about: Hakkımda bilgisini gösterir");
                    appendText("- contact: Benimle nasıl iletişime geçilir");
                    appendText("- projects: Projelerimi listeler");
                    appendText("- reboot: Terminali yeniden başlatır");
                    appendText("- language tr/en: Dil seçimini değiştirir");
                    appendText("- 8ball soru: 8ball yazısından sonra yazdığınız soruya olumlu ya da olumsuz cevap veririm.");
                } else {
                    appendText("Commands:");
                    appendText("- help: Display this help message");
                    appendText("- about: Display information about me");
                    appendText("- contact: How to contact me");
                    appendText("- projects: List my projects");
                    appendText("- reboot: Restart the terminal");
                    appendText("- language tr/en: Changes the language");
                    appendText("- 8ball question: After the 8ball, I answer your question positively or negatively.");
                }
                break;
            case 'about':
                if (currentLanguage === 'tr') {
                    appendText("Ben bir web geliştiriciyim ve benzersiz deneyimler oluşturma tutkusuyla çalışıyorum.");
                } else {
                    appendText("I'm a web developer with a passion for creating unique experiences.");
                }
                break;
            case 'projects':
                if (currentLanguage === 'tr') {
                    appendText("1. Proje Bir - Harika bir proje");
                    appendText("2. Proje İki - Başka bir harika proje");
                } else {
                    appendText("1. Project One - A cool project");
                    appendText("2. Project Two - Another cool project");
                }
                break;
            case 'contact':
                if (currentLanguage === 'tr') {
                    appendText("E-posta: example@example.com\nGitHub: github.com/example");
                } else {
                    appendText("Email: example@example.com\nGitHub: github.com/example");
                }
                break;
            case 'reboot':
                location.reload();
                break;
            case 'language tr':
                setLanguage('tr');
                location.reload();
                break;
            case 'language en':
                setLanguage('en');
                location.reload();
                break;
            case '8ball':
                if (currentLanguage === 'tr') {
                    appendText("8ball komutunu kullanabilmek için bir soru girin.");
                } else {
                    appendText("Enter a question to use the 8ball command.");
                }
                break;
            default:
                if (command.toLowerCase().startsWith('8ball ')) {
                    const responsesEn = ["Yes", "No", "Maybe", "Definitely", "Ask again later"];
                    const responsesTr = ["Evet", "Hayır", "Belki", "Kesinlikle", "Daha sonra tekrar sor"];
                    const responses = (currentLanguage === 'tr') ? responsesTr : responsesEn;
                    const randomIndex = Math.floor(Math.random() * responses.length);
                    appendText(responses[randomIndex]);
                } else {
                    if (currentLanguage === 'tr') {
                        appendText("Bilinmeyen komut. Yardım için 'help' yazın.");
                    } else {
                        appendText("Unknown command. Type 'help' for assistance.");
                    }
                }
        }
    }

    function createInput() {
        input = document.createElement('input');
        input.style.width = '100%';
        input.style.marginTop = '10px';
        input.style.color = '#0f0';
        input.style.backgroundColor = '#000';
        input.style.border = 'none';
        input.style.outline = 'none';
        if (currentLanguage === 'tr') {
            input.placeholder = 'Komut girin...';
        } else {
            input.placeholder = 'Enter command...';
        }
        terminal.appendChild(input);
        input.focus();

        input.addEventListener('input', () => {
            if (!isPlaying) {
                isPlaying = true;
                keyboardSound.play();
            } else {
                keyboardSound.currentTime = 0;
            }
        });

        keyboardSound.addEventListener('ended', () => {
            isPlaying = false;
        });

        input.onkeypress = (e) => {
            if (e.key === 'Enter' && input.value) {
                appendText('> ' + input.value);
                handleCommand(input.value);
                input.value = '';
            }
        };
    }

    function setLanguage(language: string) {
        currentLanguage = language;
        localStorage.setItem(languageKey, language);
        terminal.innerHTML = '';
        simulateLoading();
    }

    simulateLoading();
};

const musicPlayer = document.getElementById('musicPlayer') as HTMLDivElement;
const audioPlayer = document.getElementById('audioPlayer') as HTMLAudioElement;
const prevButton = document.getElementById('prevButton') as HTMLButtonElement;
const playButton = document.getElementById('playButton') as HTMLButtonElement;
const pauseButton = document.getElementById('pauseButton') as HTMLButtonElement;
const stopButton = document.getElementById('stopButton') as HTMLButtonElement;
const nextButton = document.getElementById('nextButton') as HTMLButtonElement;
const songTitle = document.getElementById('songTitle') as HTMLDivElement;

let currentTrackIndex: number = 0;

interface Track {
    title: string;
    artist: string;
    file: string;
  }
  
  const trackList: Track[] = [
    { title: "WIN98 Style - Uyan", artist: "Doğuş", file: "static/musics/song1.mp3" },
    { title: "WIN98 Style - Sebepsiz Ayrılık", artist: "Müslüm Gürses", file: "static/musics/song2.mp3" },
    { title: "WIN98 Style - Derin Duygular", artist: "Özcan Deniz", file: "static/musics/song3.mp3" }
  ];
  
  function setTrack(index: number): void {
    currentTrackIndex = index;
    const currentTrack = trackList[currentTrackIndex];
    audioPlayer.src = currentTrack.file;
    songTitle.textContent = `${currentTrack.title} - ${currentTrack.artist}`;
    audioPlayer.play();
  }

function playNextTrack(): void {
    setTrack((currentTrackIndex + 1) % trackList.length);
}

function playPrevTrack(): void {
    setTrack((currentTrackIndex - 1 + trackList.length) % trackList.length);
}

playButton.onclick = () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
    }
};

pauseButton.onclick = () => {
    if (!audioPlayer.paused) {
        audioPlayer.pause();
    }
};

stopButton.onclick = () => {
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
};

nextButton.onclick = playNextTrack;
prevButton.onclick = playPrevTrack;

const showPlayerButton = document.getElementById('showPlayerButton') as HTMLButtonElement;
const hidePlayerButton = document.getElementById('hidePlayerButton') as HTMLButtonElement;

function hideMusicPlayer() {
    musicPlayer.style.display = 'none';
    showPlayerButton.style.display = 'block';
}

function showMusicPlayer() {
    musicPlayer.style.display = 'block';
    showPlayerButton.style.display = 'none';
}

hidePlayerButton.addEventListener('click', hideMusicPlayer);
showPlayerButton.addEventListener('click', showMusicPlayer);

setTrack(0);

