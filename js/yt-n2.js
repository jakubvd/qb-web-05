document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".yt-lazy-container").forEach(function (videoContainer) {
        const videoId = videoContainer.getAttribute("data-video-id");
        const playButton = videoContainer.querySelector(".yt-custom-play-button");

        // ✅ Sprawdzenie, czy wideo może mieć rekomendacje
        const allowRecommendations = [
            "i_wF9C47vWI", "wF2eobbOGrs", "VnyozbCzU6s", "7gv8e54TxdU"
        ];
        const isAllowed = allowRecommendations.includes(videoId);
        const relValue = "0"; // Ograniczenie rekomendacji do tego samego kanału
        const extraParams = isAllowed ? "" : "&controls=1&modestbranding=1&iv_load_policy=3";

        function loadVideo() {
            // ✅ Zapisz aktualną wysokość kontenera, aby uniknąć skoków
            const containerHeight = videoContainer.offsetHeight;

            // ✅ Ukryj przycisk, zamiast usuwać go z DOM
            playButton.style.display = "none";

            // ✅ Tworzenie nowego iframe
            const iframe = document.createElement("iframe");
            iframe.className = "yt-lazy-iframe";
            iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=${relValue}${extraParams}&playsinline=1`;
            iframe.title = "YouTube video player";
            iframe.frameBorder = "0";
            iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen";
            iframe.referrerPolicy = "strict-origin-when-cross-origin";
            iframe.allowFullscreen = true; // ✅ Pełny ekran działa
           
            // ✅ Zapewnij odpowiednią wysokość, aby uniknąć skoków
            iframe.style.width = "100%";
            iframe.style.height = containerHeight + "px";

            // ✅ Wstaw iframe na miejsce przycisku (poprawiony kod)
            videoContainer.appendChild(iframe);
        }

        // Obsługa kliknięcia
        playButton.addEventListener("click", loadVideo);
    });
});