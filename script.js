window.addEventListener("load", function() {
    const header = document.querySelector(".header");
    const navbar = document.querySelector(".navbar");
    
    // Sayfa yüklendiğinde header'ı tam şeffaf yap
    header.style.background = "rgba(0, 0, 0, 0)"; // Tam şeffaf
    header.style.backdropFilter = "none"; // Bulanıklığı kaldır
    navbar.style.background = "rgba(0, 0, 0, 0)"; // Tam şeffaf
    navbar.style.backdropFilter = "none"; // Bulanıklığı kaldır

    // Sayfa kaydırıldığında stil değişimi
    window.addEventListener("scroll", function() {
        if (window.scrollY > 0) {
            // Sayfa kaydırıldığında header özelliklerini geri getir
            header.style.background = "rgba(0, 0, 0, 0.1)"; // Şeffaflık
            header.style.backdropFilter = "blur(15px)"; // Bulanıklık efekti
        } else {
            // Sayfa en tepeye geldiğinde tekrar tam şeffaf yap
            header.style.background = "rgba(0, 0, 0, 0)"; // Tam şeffaf
            header.style.backdropFilter = "none"; // Bulanıklığı kaldır
        }
    });
});
let slider = document.querySelector('.slider .list');
let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let dots = document.querySelectorAll('.slider .dots li');

let lengthItems = items.length - 1;
let active = 0;
next.onclick = function(){
    active = active + 1 <= lengthItems ? active + 1 : 0;
    reloadSlider();
}
prev.onclick = function(){
    active = active - 1 >= 0 ? active - 1 : lengthItems;
    reloadSlider();
}
let refreshInterval = setInterval(()=> {next.click()}, 10000);
function reloadSlider(){
    slider.style.left = -items[active].offsetLeft + 'px';
    // 
    let last_active_dot = document.querySelector('.slider .dots li.active');
    last_active_dot.classList.remove('active');
    dots[active].classList.add('active');

    clearInterval(refreshInterval);
    refreshInterval = setInterval(()=> {next.click()}, 10000);

    
}

dots.forEach((li, key) => {
    li.addEventListener('click', ()=>{
         active = key;
         reloadSlider();
    })
})
window.onresize = function(event) {
    reloadSlider();
};
// Navbar butonları ve içerik kutularını seçme
const navButtons = document.querySelectorAll('.nav-button');
const contentBoxes = document.querySelectorAll('.content-box');

// Sayfa yüklendiğinde 'Hakkımızda' butonuna 'active' sınıfını ekle ve ilgili içeriği göster
document.addEventListener('DOMContentLoaded', () => {
    // İlk butonu 'active' yap (Hakkımızda)
    navButtons[0].classList.add('active');
    // İlk içerik kutusunu göster
    contentBoxes[0].classList.add('active');
});

navButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Tüm içerik kutularını gizle
        contentBoxes.forEach(box => box.classList.remove('active'));

        // Tıklanan butona göre ilgili içerik kutusunu göster
        const contentId = button.getAttribute('data-content');
        document.getElementById(contentId).classList.add('active');
    });
});

navButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Tüm butonlardan 'active' sınıfını kaldır
        navButtons.forEach(btn => btn.classList.remove('active'));

        // Tıklanan butona 'active' sınıfını ekle
        button.classList.add('active');
    });
});


// geçiş efekti falan filan navbar aktivasyon
function smoothScroll(targetId) {
    const section = document.getElementById(targetId);
    const offset = -38;
    const targetPosition = section.getBoundingClientRect().top + window.pageYOffset + offset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1000; // 1000ms = 1 saniye, süreyi artırarak kaydırmayı yavaşlatabilirsiniz
    let start = null;

    function step(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const ease = easeInOutQuad(progress / duration);
        window.scrollTo(0, startPosition + distance * ease);
        if (progress < duration) {
            window.requestAnimationFrame(step);
        }
    }

    function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    window.requestAnimationFrame(step);
}

document.getElementById("hakkimizda-link").addEventListener("click", function(event) {
    event.preventDefault();
    smoothScroll("hakkimizda");
});

document.getElementById("hizmetler-link").addEventListener("click", function(event) {
    event.preventDefault();
    smoothScroll("hizmetler");
});

document.getElementById("iletisim-link").addEventListener("click", function(event) {
    event.preventDefault();
    smoothScroll("iletisim");
});


function openWhatsApp() {
    const phoneNumber = "+905325106046"; // İletişim numaranızı buraya yazın
    const message = "Merhaba, iletişime geçmek istiyorum."; // Mesaj ön metni
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}
