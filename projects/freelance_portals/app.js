document.addEventListener("DOMContentLoaded", () => {
    const ctaBtn = document.getElementById("cta-btn");
    const alertBox = document.getElementById("alert-box");

    ctaBtn.addEventListener("click", () => {
        // Mock interactive animation and notice trigger
        alertBox.className = "success";
        alertBox.innerText = "🎉 Lifetime Action Active: Integration successfully resolved!";
        alertBox.style.display = "block";

        // Button press micro-interaction
        ctaBtn.style.transform = "scale(0.95)";
        setTimeout(() => {
            ctaBtn.style.transform = "none";
        }, 100);
    });
});
