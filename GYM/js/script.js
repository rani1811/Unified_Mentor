document.addEventListener("DOMContentLoaded", function () {
    const joinNowButton = document.getElementById("join-now-button");

    if (joinNowButton) {
        joinNowButton.addEventListener("click", function () {
            window.location.href = "form.html"; // Redirect to form page
        });
    }
});
