document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".yt-lazy-container").forEach(function (videoContainer) {
        const videoId = videoContainer.getAttribute("data-video-id");
        const playButton = videoContainer.querySelector(".yt-custom-play-button");

        // ✅ Lista filmów, które mogą mieć rekomendacje
        const allowRecommendations = [
            "xAKqXcG3b7k", "wF2eobbOGrs", "VnyozbCzU6s", "7gv8e54TxdU"
        ];

        // ✅ Ograniczenie rekomendacji do tego samego kanału (rel=0)
        const isAllowed = allowRecommendations.includes(videoId);
        const relValue = "0";
        const extraParams = isAllowed ? "" : "&controls=1&modestbranding=1&iv_load_policy=3";

        function loadVideo() {
            // ✅ Ukryj custom play button, ale nie usuwaj go z DOM
            playButton.style.display = "none";

            // ✅ Stwórz nowy iframe
            const iframe = document.createElement("iframe");
            iframe.className = "yt-lazy-iframe";
            iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=${relValue}${extraParams}&playsinline=1`;
            iframe.title = "YouTube video player";
            iframe.frameBorder = "0";
            iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen";
            iframe.referrerPolicy = "strict-origin-when-cross-origin";
            iframe.allowFullscreen = true;

            // ✅ Zapewnij brak skoku poprzez ustawienie wysokości na 100%
            iframe.style.width = "100%";
            iframe.style.height = "100%"; 
            iframe.style.position = "absolute";
            iframe.style.top = "0";
            iframe.style.left = "0";

            // ✅ Upewnij się, że rodzic nie ma marginesów i nie zmienia rozmiaru
            videoContainer.style.position = "relative";
            videoContainer.style.overflow = "hidden";
            videoContainer.style.paddingTop = "56.25%"; // Proporcja 16:9 dla responsywności

            // ✅ Usuń wszystko z videoContainer, ale nie zmieniaj jego rozmiaru
            videoContainer.innerHTML = "";
            videoContainer.appendChild(iframe);

            // ❌ Blokowanie pop-upów (dla filmów spoza whitelisty)
            if (!isAllowed) {
                setTimeout(() => {
                    iframe.contentWindow.postMessage('{"event":"command","func":"hidePopups","args":""}', '*');
                }, 2000);
            }
        }

        // Obsługa kliknięcia
        playButton.addEventListener("click", loadVideo);
    });
});