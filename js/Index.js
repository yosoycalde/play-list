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
                cover: "music/5- La La La - Al2 El Aldeano _ Dj Figu (Audio Oficial)(MP3_160K).jpg"
            },
            {
                title: "Fue",
                artist: "Soda Stereo",
                path: "music/Soda Stereo - Fue (Official Audio)(MP3_160K).mp3",
                cover: "music/cover2.jpg"
            },
            {
                title: "8- A Mi ",
                artist: "Al2 El Aldeano",
                path: "music/8- A Mi - Al2 El Aldeano _ Dj Figu (Audio Oficial)(MP3_160K).mp3",
                cover: "imgSongs/5- La La La - Al2 El Aldeano _ Dj Figu (Audio Oficial)(MP3_160K).jpg"
            },
            {
                title: "Perranderos",
                artist: "Al2 El Aldeano",
                path: "music/13- Perranderos - Al2 El Aldeano _ Dj Figu (Audio Oficial)(MP3_160K).mp3",
                cover: "music/5- La La La - Al2 El Aldeano _ Dj Figu (Audio Oficial)(MP3_160K).jpg"
            },
            {
                title: "Clint Eastwood",
                artist: "Gorillaz",
                path: "music/Gorillaz - Clint Eastwood (Official Video)(MP3_160K).mp3",
                cover: "music/cover5.jpg"
            },
            {
                title: "Délà vu",
                artist: "Gorillaz",
                path: "music/Gorillaz - Déjà Vu (ft. Alicaì Harley) Live from NW10 (Official Visualiser)(MP3_160K).mp3",
                cover: "music/cover1.jpg"
            },
            {
                title: "Désolé",
                artist: "Gorillaz",
                path: "music/Gorillaz - Désolé ft. Fatoumata Diawara (Episode Two)(MP3_160K).mp3",
                cover: "music/cover2.jpg"
            },
            {
                title: "Smokin Love",
                artist: "Taiwan",
                path: "music/Smokin_ Love(MP3_160K).mp3",
                cover: "music/cover3.jpg"
            },
            {
                title: "Smooth Criminal",
                artist: "Alien Ant Farm",
                path: "music/Smooth Criminal(MP3_160K).mp3",
                cover: "music/cover4.jpg"
            },
            {
                title: "Soda Stereo",
                artist: "Entre Caíbales",
                path: "music/Soda Stereo - Entre Caníbales (Official Visualizer)(MP3_160K).mp3",
                cover: "music/cover5.jpg"
            }
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