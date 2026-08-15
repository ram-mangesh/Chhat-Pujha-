"use client";

import { useState, useRef, useEffect } from "react";

const PLAYLIST_ID = "PLQ3LTZfLESQk";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export default function MusicPlayer() {
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [thumbnail, setThumbnail] = useState("");
  const [volume, setVolume] = useState(100);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [songProgress, setSongProgress] = useState(0);
  const [videoData, setVideoData] = useState<any>(null);

  const playerRef = useRef<any>(null);
  const progressInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const dataInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        initPlayer();
      };
    } else {
      initPlayer();
    }

    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
      if (dataInterval.current) clearInterval(dataInterval.current);
    };
  }, []);

  const initPlayer = () => {
    if (playerRef.current) return;

    playerRef.current = new window.YT.Player("youtube-player", {
      height: "1",
      width: "1",
      playerVars: {
        autoplay: 1,
        controls: 0,
        enablejsapi: 1,
        modestbranding: 1,
        rel: 0,
        fs: 0,
        playsinline: 1,
        cc_load_policy: 0,
        iv_load_policy: 3,
        mute: 1,
      },
      events: {
        onReady: (event: any) => {
          setIsReady(true);
          event.target.loadPlaylist({
            list: PLAYLIST_ID,
            listType: "playlist",
            index: 0,
          });
          setTimeout(() => {
            event.target.setVolume(100);
            event.target.unMute();
            event.target.playVideo();
          }, 500);
        },
        onStateChange: (event: any) => {
          if (event.data === window.YT.PlayerState.PLAYING) {
            setIsPlaying(true);
            startProgress();
            startDataPolling();
          } else if (event.data === window.YT.PlayerState.PAUSED) {
            setIsPlaying(false);
            stopProgress();
          } else if (event.data === window.YT.PlayerState.ENDED) {
            setIsPlaying(false);
            stopProgress();
            handleNext();
          }
        },
      },
    });
  };

  const startDataPolling = () => {
    if (dataInterval.current) clearInterval(dataInterval.current);
    dataInterval.current = setInterval(() => {
      if (playerRef.current?.getVideoData) {
        const data = playerRef.current.getVideoData();
        if (data && data.video_id) {
          setVideoData(data);
          setThumbnail(`https://img.youtube.com/vi/${data.video_id}/hqdefault.jpg`);
        }
      }
    }, 1000);
  };

  const startProgress = () => {
    if (progressInterval.current) clearInterval(progressInterval.current);
    progressInterval.current = setInterval(() => {
      if (playerRef.current?.getCurrentTime && playerRef.current?.getDuration) {
        const current = playerRef.current.getCurrentTime() || 0;
        const dur = playerRef.current.getDuration() || 1;
        setSongProgress((current / dur) * 100);
      }
    }, 500);
  };

  const stopProgress = () => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
      progressInterval.current = null;
    }
  };

  const handlePlay = () => {
    if (playerRef.current?.playVideo) playerRef.current.playVideo();
    if (playerRef.current?.unMute) playerRef.current.unMute();
  };

  const handlePause = () => {
    if (playerRef.current?.pauseVideo) playerRef.current.pauseVideo();
  };

  const handleNext = () => {
    if (playerRef.current?.nextVideo) playerRef.current.nextVideo();
  };

  const handlePrevious = () => {
    if (playerRef.current?.previousVideo) playerRef.current.previousVideo();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseInt(e.target.value);
    setVolume(vol);
    if (playerRef.current?.setVolume) playerRef.current.setVolume(vol);
  };

  return (
    <>
      {/* Hidden YouTube Player */}
      <div id="youtube-player" className="fixed -top-9999 left-0"></div>

      {/* Playlist Modal */}
      {showPlaylist && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/50" onClick={() => setShowPlaylist(false)}>
          <div className="w-full max-w-2xl rounded-t-3xl bg-[#1a1a2e] p-6 max-h-[70vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Chhath Songs Playlist</h2>
              <button onClick={() => setShowPlaylist(false)} className="text-white/60 hover:text-white text-2xl">×</button>
            </div>
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-[#784837] text-white text-center">
                <p className="text-sm text-white/80">YouTube Playlist</p>
                <p className="font-bold">Chhath Puja Classics</p>
                <p className="text-xs text-white/60 mt-1">Songs load from YouTube automatically</p>
              </div>
              <div className="text-center text-white/60 py-8">
                <p>Playlist loaded from YouTube</p>
                <a
                  href={`https://www.youtube.com/playlist?list=${PLAYLIST_ID}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-blue-400 hover:text-blue-300 underline"
                >
                  View on YouTube ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Music Player Bar */}
      <div className="fixed bottom-5 left-1/2 z-50 w-[calc(100%-24px)] max-w-[600px] -translate-x-1/2">
        <div className="relative rounded-2xl border border-white/10 bg-gradient-to-r from-[#76513f]/95 via-[#784837]/95 to-[#642d2d]/95 shadow-[0_15px_45px_rgba(0,0,0,0.5)] backdrop-blur-xl overflow-hidden">
          {/* Progress bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-white/10">
            <div className="h-full bg-white/80 transition-all" style={{ width: `${songProgress}%` }}></div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4">
            {/* YouTube Thumbnail Image */}
            <div className="relative h-14 w-14 sm:h-16 sm:w-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-white/20 bg-black/50">
              {thumbnail ? (
                <img
                  src={thumbnail}
                  alt="Song thumbnail"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                </div>
              )}
              {/* Playing indicator overlay */}
              {isPlaying && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="flex gap-0.5 items-end h-4">
                    <div className="w-0.5 bg-white animate-pulse h-full rounded-full"></div>
                    <div className="w-0.5 bg-white animate-pulse h-3/4 rounded-full" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-0.5 bg-white animate-pulse h-full rounded-full" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                </div>
              )}
            </div>

            {/* Song info */}
            <div className="min-w-0 flex-1">
              <p className="text-white font-semibold truncate text-sm sm:text-base">
                {videoData?.title ? videoData.title : isReady ? "Chhath Puja Playlist" : "Loading..."}
              </p>
              <p className="text-white/60 text-xs sm:text-sm truncate">
                {isPlaying ? "▶ Now Playing" : isReady ? "Chhath Songs" : "Loading YouTube..."}
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              {/* Previous */}
              <button
                onClick={handlePrevious}
                className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
              >
                ⏮
              </button>

              {/* Play/Pause */}
              <button
                onClick={isPlaying ? handlePause : handlePlay}
                className="h-12 w-12 rounded-full bg-white flex items-center justify-center flex-shrink-0 hover:bg-white/90 transition-all shadow-lg"
              >
                {isPlaying ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </button>

              {/* Next */}
              <button
                onClick={handleNext}
                className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
              >
                ⏭
              </button>

              {/* Playlist */}
              <button
                onClick={() => setShowPlaylist(true)}
                className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </button>
            </div>
          </div>

          {/* Volume slider */}
          <div className="px-4 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-white/60 text-xs">🔊</span>
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={handleVolumeChange}
                className="flex-1 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-white/40 text-xs w-8">{volume}%</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
