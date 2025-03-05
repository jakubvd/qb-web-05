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

        // ✅ Ograniczenie rekomendacji do tego samego kanału (rel=0)
        const isAllowed = allowRecommendations.includes(videoId);
        const relValue = "0";
        const extraParams = isAllowed ? "" : "&controls=1&modestbranding=1&iv_load_policy=3"; 

        function loadVideo() {
            // ✅ Zapisz aktualną wysokość kontenera, aby uniknąć skoków
            const containerHeight = videoContainer.offsetHeight;

            // Ukryj custom play button, ale nie zmieniaj struktury DOM
            playButton.style.display = "none";

            // Tworzenie nowego iframe (z góry ustawiona wysokość!)
            const iframe = document.createElement("iframe");
            iframe.className = "yt-lazy-iframe";
            iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=${relValue}${extraParams}&playsinline=1`;
            iframe.title = "YouTube video player";
            iframe.frameBorder = "0";
            iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen";
            iframe.referrerPolicy = "strict-origin-when-cross-origin";
            iframe.allowFullscreen = true;

            // ✅ Ustaw wysokość iframe na dokładnie tę samą wysokość co kontener
            iframe.style.width = "100%";
            iframe.style.height = containerHeight + "px";

            // ✅ Zamiana buttona na iframe, bez usuwania całego kontenera
            videoContainer.replaceChild(iframe, playButton);
        }

        // Obsługa kliknięcia
        playButton.addEventListener("click", loadVideo);
    });
});