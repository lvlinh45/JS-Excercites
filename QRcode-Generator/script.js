const wrapper = document.querySelector(".wrapper");
const generateBtn = wrapper.querySelector(".form button");
const qrImg = wrapper.querySelector(".qr-code img");
const qrInput = wrapper.querySelector(".form input");



// https://goqr.me/api/
generateBtn.addEventListener("click", () => {
    let qrValue = qrInput.value;
    if (!qrInput) return;
    generateBtn.innerText = "Generating QR Code...";
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrValue}`;
    qrImg.addEventListener("load", () => {
        wrapper.classList.add("active");
        generateBtn.innerText = "Generating QR Code";
    })
})

qrInput.addEventListener("keyup", () => {
    if (!qrInput.value) {
        wrapper.classList.remove("active")
    }
});