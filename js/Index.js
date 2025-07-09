const audio = new Audio();
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volumeSlider = document.getElementById('volume');
const songInfo = document.getElementById('song-info');
const playlist = document.getElementById('playlist');

// Lista predefinida de canciones
const songs = [
    {
        title: "5- La La La",
        artist: "Al2 El Aldeano",
        path: "music/5- La La La - Al2 El Aldeano _ Dj Figu (Audio Oficial)(MP3_160K).mp3",
        cover: "music/imgSongs/5- La La La - Al2 El Aldeano _ Dj Figu (Audio Oficial)(MP3_160K).jpg"
    },
    {
        title: "Fue",
        artist: "Soda Stereo",
        path: "music/Soda Stereo - Fue (Official Audio)(MP3_160K).mp3",
        cover: "music/imgSongs/Soda Stereo - Fue (Official Audio)(MP3_160K).jpg"
    },
    {
        title: "8- A Mi ",
        artist: "Al2 El Aldeano",
        path: "music/8- A Mi - Al2 El Aldeano _ Dj Figu (Audio Oficial)(MP3_160K).mp3",
        cover: "music/imgSongs/5- La La La - Al2 El Aldeano _ Dj Figu (Audio Oficial)(MP3_160K).jpg"
    },
    {
        title: "Perranderos",
        artist: "Al2 El Aldeano",
        path: "music/13- Perranderos - Al2 El Aldeano _ Dj Figu (Audio Oficial)(MP3_160K).mp3",
        cover: "music/imgSongs/5- La La La - Al2 El Aldeano _ Dj Figu (Audio Oficial)(MP3_160K).jpg"
    },
    {
        title: "Clint Eastwood",
        artist: "Gorillaz",
        path: "music/Gorillaz - Clint Eastwood (Official Video)(MP3_160K).mp3",
        cover: "music/imgSongs/Gorillaz - Clint Eastwood (Official Video)(MP3_160K).jpg"
    },
    {
        title: "Délà vu",
        artist: "Gorillaz",
        path: "music/Gorillaz - Déjà Vu (ft. Alicaì Harley) Live from NW10 (Official Visualiser)(MP3_160K).mp3",
        cover: "music/imgSongs/Gorillaz - Déjà Vu (ft. Alicaì Harley) Live from NW10 (Official Visualiser)(MP3_160K).jpg"
    },
    {
        title: "Désolé",
        artist: "Gorillaz",
        path: "music/Gorillaz - Désolé ft. Fatoumata Diawara (Episode Two)(MP3_160K).mp3",
        cover: "music/imgSongs/Gorillaz - Désolé ft. Fatoumata Diawara (Episode Two)(MP3_160K).jpg"
    },
    {
        title: "Smokin Love",
        artist: "Taiwan",
        path: "music/Smokin_ Love(MP3_160K).mp3",
        cover: "music/imgSongs/Smokin_ Love(MP3_160K).jpg"
    },
    {
        title: "Smooth Criminal",
        artist: "Alien Ant Farm",
        path: "music/Smooth Criminal(MP3_160K).mp3",
        cover: "music/imgSongs/criminal.jpg"
    },
    {
        title: "Soda Stereo",
        artist: "Entre Caíbales",
        path: "music/Soda Stereo - Entre Caníbales (Official Visualizer)(MP3_160K).mp3",
        cover: "music/imgSongs/Soda Stereo - Entre Caníbales (Official Visualizer)(MP3_160K).jpg"
    },
    {
        title: "La Vuelta Al Mundo",
        artist: "Calle 13",
        path: "music/La Vuelta Al Mundo(MP3_160K).mp3",
        cover: "music/imgSongs/Lavuelta.jpg"
    },
    {
        title: "Sukuna VS Gojo Version salsa",
        artist: "liryc Español",
        path: "music/_ La Salsa de Gojo vs Sukuna_ Jujutsu Kaisen (IA) liryc Español(MP3_160K).mp3",
        cover: "music/imgSongs/salsa-sukuna-gojo.jpg"
    },
    {
        title: "Base De Rap Cumbia Rap Hip Hop Instrumental",
        artist: "Uso Libre",
        path: "music/_CUMBIA MALANDRA_ Base De Rap Cumbia Rap Hip Hop Instrumental _ Uso Libre _ Cumbia Rap Beat 2024(M4A_128K).m4a",
        cover: "music/imgSongs/base.jpg"
    },
    {
        title: "Valentines Day",
        artist: "Linkin Park ",
        path: "music/Valentine_s Day - Linkin Park (Minutes To Midnight)(MP3_160K).mp3",
        cover: "music/imgSongs/valents.jpg"
    },
    {
        title: "1.9.9.9",
        artist: "Los Orishas",
        path: "music/Orishas -  1.9.9.9 _ Album A Lo Cubano(MP3_160K).mp3",
        cover: "music/imgSongs/orishas.jpg"
    },
    {
        title: "When It`s All Gone",
        artist: "Terror Reid",
        path: "music/Terror Reid - When It_s All Gone_(MP3_160K).mp3",
        cover: "music/imgSongs/terror-blood.jpg"
    },
    {
        title: "SAY NO MO",
        artist: "Terror Reid",
        path: "music/TERROR REID - SAY NO MO_(MP3_160K).mp3",
        cover: "music/imgSongs/say-no-mo.jpg"
    },
    {
        title: "I.D.F.A",
        artist: "Terror Reid",
        path: "music/TERROR REID - I.D.F.A (Official Lyric Video)(MP3_160K).mp3",
        cover: "music/imgSongs/idfa.jpg"
    },
    {
        title: "First Blood",
        artist: "Terror Reid",
        path: "music/TERROR REID - First Blood (Official Lyric Video)(MP3_160K).mp3",
        cover: "music/imgSongs/fisrt.jpg"
    },
    {
        title: "Bouce Back",
        artist: "Terror Reid",
        path: "music/Terror Reid - Bounce Back(MP3_160K).mp3",
        cover: "music/imgSongs/Bourse.jpg"
    },
    {
        title: "Babe FT LU",
        artist: "Terror Reid",
        path: "music/TERROR REID - Babe Ruthless Ft LU (Official Lyric Video)(MP3_160K).mp3",
        cover: "music/imgSongs/BABE.jpg"
    },
    {
        title: "Temor a Dios",
        artist: "Mañas Rufino",
        path: "music/Temor A Dios - Mañas Ru-Fino (Prod. Ru-Fino _ DeeJohend) Vértigo 2024(MP3_160K).mp3",
        cover: "music/imgSongs/temoradios.jpg"
    },
    {
        title: "Ya Verás",
        artist: "Realidad Mental , Penyair",
        path: "music/Realidad Mental - Ya Verás ft. _PenyairOficial Prod _EddyMugre  _AlkaProduce (Visualizer)(MP3_160K).mp3",
        cover: "music/imgSongs/yaveras.jpg"
    },
    {
        title: "Ganado el Round",
        artist: "Realidad Mental , Penyair",
        path: "music/Realidad Mental - Ganando el round ft. _PenyairOficial x _LionFiah (video oficial)(MP3_160K).mp3",
        cover: "music/imgSongs/round.jpg"
    },
    {
        title: "Points Of Authority",
        artist: "Linkin Park",
        path: "music/Points Of Authority [Official HD Music Video] - Linkin Park(MP3_160K).mp3",
        cover: "music/imgSongs/poark.jpg"
    },
    {
        title: "Pesos, Dolares y Euros ",
        artist: "Pel roja , Mañas",
        path: "music/PIEL ROJA _ MAÑAS  RU - FINO - PESOS_ DÓLARES Y EUROS ( PROD KAS RULES)(MP3_160K).mp3",
        cover: "music/imgSongs/pesos.jpg"
    },
    {
        title: "Mientras Duermen ",
        artist: "Negro Gonzales",
        path: "music/_Mientras Duermen_ - Negro Gonzalez_ Warrior_ Samurai_ Norick_ B.man (VIDEO OFICIAL)(MP3_160K).mp3",
        cover: "music/imgSongs/mientras duermen.jpg"
    },
    {
        title: "Sádico",
        artist: "Rawayana",
        path: "music/_Sádico (Sunsplash _ Ferraz Remix)(MP3_160K).mp3",
        cover: "music/imgSongs/sadico.jpg"
    },
    {
        title: "¿Quien No?",
        artist: "AZ",
        path: "music/¿Quién No_(MP3_160K).mp3",
        cover: "music/imgSongs/Quien no.jpg"
    },
    {
        title: "¿Quienes Sois?",
        artist: "Ska-P",
        path: "music/¿Quienes Sois_(MP3_160K).mp3",
        cover: "music/imgSongs/quienesois.jpg"
    },
    {
        title: "Quieres ser mi amante",
        artist: "Camilo Sesto",
        path: "music/¿Quieres Ser Mi Amante_(MP3_160K).mp3",
        cover: "music/imgSongs/quieres ser mi amante.jpg"
    },
    {
        title: "I Can`t Get No",
        artist: "The rolling stones*",
        path: "music/[I Can_t Get No] Satisfaction (Mono Version)(MP3_160K) (1).mp3",
        cover: "music/imgSongs/rolling.jpg"
    },




];

let currentSongIndex = 0;

function updatePlaylist() {
    playlist.innerHTML = '';
    songs.forEach((song, index) => {
        const div = document.createElement('div');
        div.classList.add('playlist-item');
        if (index === currentSongIndex) {
            div.classList.add('active');
        }
        div.innerHTML = `
                    <span class="song-number">${index + 1}</span>
                    <div class="song-info">
                        <div>${song.title}</div>
                        <small style="opacity: 0.7">${song.artist}</small>
                    </div>
                `;
        div.addEventListener('click', () => loadSong(index));
        playlist.appendChild(div);
    });
}

function loadSong(index) {
    if (index >= 0 && index < songs.length) {
        currentSongIndex = index;
        const song = songs[index];
        audio.src = song.path;
        songInfo.textContent = `${song.title} - ${song.artist}`;

        // Actualizar imagen del álbum
        const albumArt = document.getElementById('album-art');
        if (song.cover) {
            albumArt.innerHTML = `<img src="${song.cover}" alt="Album Art">`;
        } else {
            albumArt.innerHTML = '<div class="default-art">🎵</div>';
        }

        audio.play()
            .then(() => {
                playBtn.textContent = '⏸';
            })
            .catch(error => {
                console.error('Error playing audio:', error);
                songInfo.textContent = 'Error: No se pudo cargar el audio';
            });

        updatePlaylist();
    }
}

playBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playBtn.textContent = '⏸';
    } else {
        audio.pause();
        playBtn.textContent = '▶';
    }
});

prevBtn.addEventListener('click', () => {
    loadSong(currentSongIndex - 1);
});

nextBtn.addEventListener('click', () => {
    loadSong(currentSongIndex + 1);
});

audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', () => loadSong(currentSongIndex + 1));

function updateProgress() {
    const { duration, currentTime } = audio;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const currentMinutes = Math.floor(currentTime / 60);
    const currentSeconds = Math.floor(currentTime % 60);
    const durationMinutes = Math.floor(duration / 60);
    const durationSeconds = Math.floor(duration % 60);

    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds.toString().padStart(2, '0')}`;
    if (!isNaN(duration)) {
        durationEl.textContent = `${durationMinutes}:${durationSeconds.toString().padStart(2, '0')}`;
    }
}

progressContainer.addEventListener('click', setProgress);

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

volumeSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value / 100;
});

// Cargar la primera canción al iniciar
updatePlaylist();
loadSong(0);