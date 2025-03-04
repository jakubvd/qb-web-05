document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".yt-lazy-container").forEach(function (videoContainer) {
        const videoId = videoContainer.getAttribute("data-video-id");
        const playButton = videoContainer.querySelector(".yt-custom-play-button");

        // ✅ List of video IDs that CAN show full recommendations (whitelist)
        const allowRecommendations = [
            "i_wF9C47vWI", // OSTATNI ODCINEK Z ŹYCIA BZIKA
            "wF2eobbOGrs", // jak wyjść z balachy ?
            "VnyozbCzU6s", // Oficjalne OŚWIADCZENIE (Q&A)
            "7gv8e54TxdU"  // PRZEGRAŁEM
        ];

        // ✅ Limit recommendations to the same channel if they can't be blocked
        const isAllowed = allowRecommendations.includes(videoId);
        const relValue = "0"; // `rel=0` ensures recommendations are from the same channel
        const extraParams = isAllowed ? "" : "&controls=1&modestbranding=1&iv_load_policy=3"; 

        function loadVideo() {
            // Hide custom button after clicking
            playButton.style.display = "none";

            // Remove existing iframe if present
            const existingIframe = videoContainer.querySelector(".yt-lazy-iframe");
            if (existingIframe) existingIframe.remove();

            // Create new YouTube iframe
            const iframe = document.createElement("iframe");
            iframe.className = "yt-lazy-iframe";
            iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=${relValue}${extraParams}&playsinline=1`;
            iframe.title = "YouTube video player";
            iframe.frameBorder = "0";
            iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"; // ✅ Fullscreen enabled
            iframe.referrerPolicy = "strict-origin-when-cross-origin";
            iframe.allowFullscreen = true;

            // Append iframe to the container
            videoContainer.appendChild(iframe);
        }

        // Attach event listener to play button
        playButton.addEventListener("click", loadVideo);
    });
});