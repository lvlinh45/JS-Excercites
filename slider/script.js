const initSlider = () => {
    const imageList = document.querySelector(".image-list");
    const sliderButtons = document.querySelectorAll(".slide-button");
    const sliderScrollBar = document.querySelector(".slider-scrollbar");
    const scrollBarThumb = sliderScrollBar.querySelector(".scrollbar-thumb");
    // Tính giá trị tối đa có thể scroll, lấy tổng width - width client có thể thấy => ra được độ dài có thể scroll
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

    scrollBarThumb.addEventListener("mousedown", (e) => {
        // trả về tọa độ của nó so với bên trái, clienX hay dùng cho mouse
        const startX = e.clientX;
        /* offsetLeft: nó đại diện cho khoảng cách từ lề bên trái của phần tử hiện tại đến lề bên trái của phần tử cha gần nhất nó được định vị tương đối (position: relative). */
        const thumbPosition = scrollBarThumb.offsetLeft;

        // update thumb position on mouse move
        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const newThumPositon = thumbPosition + deltaX;
            const maxThumbPosition = sliderScrollBar.getBoundingClientRect().width - scrollBarThumb.offsetWidth;

            const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumPositon));

            const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft

            scrollBarThumb.style.left = `${boundedPosition}px`;
            imageList.scrollLeft = scrollPosition;
        }

        // remove event lisener on mouse up
        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        }

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    });



    [...sliderButtons].forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "prev-slide" ? -1 : 1;
            const scrollAmount = imageList.clientWidth * direction;
            imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
        })
    })
    const handleSlideButtons = () => {
        sliderButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "block"
        sliderButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "block"
    }
    // update scrollbar thumb position based on imagescrolls
    const updateThumbPosition = () => {
        // ScrollLeft: Từ trái tính qua vị trí hiện tại (tính bằng px)
        const scrollPosition = imageList.scrollLeft;

        // (Vị trí hiện tại so với Left / tổng số left còn lại có thể scroll được) * (tổng độ dài của thanh scrollbar - độ dài của nút kéo) 
        const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollBar.clientWidth - scrollBarThumb.offsetWidth)
        scrollBarThumb.style.left = `${thumbPosition}px`
    }

    imageList.addEventListener("scroll", () => {
        handleSlideButtons();
        updateThumbPosition();
    })
}
window.addEventListener("load", initSlider);