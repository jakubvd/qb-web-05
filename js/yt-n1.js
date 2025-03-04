document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".yt-lazy-container").forEach(function (videoContainer) {
        const videoId = videoContainer.getAttribute("data-video-id");
        const playButton = videoContainer.querySelector(".yt-custom-play-button");

        // ✅ Lista filmów, które mogą pokazywać rekomendacje (whitelist)
        const allowRecommendations = [
            "i_wF9C47vWI", // OSTATNI ODCINEK Z ŹYCIA BZIKA
            "wF2eobbOGrs", // jak wyjść z balachy ?
            "VnyozbCzU6s", // Oficjalne OŚWIADCZENIE (Q&A)
            "7gv8e54TxdU"  // PRZEGRAŁEM
        ];

        // Sprawdzenie, czy film ma mieć rekomendacje
        const isAllowed = allowRecommendations.includes(videoId);
        const relValue = isAllowed ? "1" : "0"; // Jeśli film jest na liście, pozwól na rekomendacje
        const extraParams = isAllowed ? "" : "&controls=1&modestbranding=1&iv_load_policy=3"; 

        function loadVideo() {
            // Usuń istniejący iframe, jeśli już istnieje
            const existingIframe = videoContainer.querySelector(".yt-lazy-iframe");
            if (existingIframe) existingIframe.remove();

            // Tworzenie nowego iframe
            const iframe = document.createElement("iframe");
            iframe.className = "yt-lazy-iframe";
            iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=${relValue}${extraParams}&playsinline=1`;
            iframe.title = "YouTube video player";
            iframe.frameBorder = "0";
            iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"; // ✅ Pełny ekran
            iframe.referrerPolicy = "strict-origin-when-cross-origin";
            iframe.allowFullscreen = true; // ✅ Pełny ekran

            // Dodaj iframe do kontenera
            videoContainer.appendChild(iframe);
        }

        // Obsługa kliknięcia
        playButton.addEventListener("click", loadVideo);
    });
});