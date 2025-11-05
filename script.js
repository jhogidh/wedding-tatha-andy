document.addEventListener("DOMContentLoaded", function () {
  const cover = document.getElementById("cover");
  const openButton = document.getElementById("open-invitation");
  const mainContent = document.getElementById("main-content");
  const audio = document.getElementById("background-music");
  const musicToggle = document.getElementById("music-toggle");
  const bottomNav = document.getElementById("bottom-nav");

  // --- LOGIKA 1: BUKA UNDANGAN & MUSIK ---
  openButton.addEventListener("click", function () {
    // 1. Tambahkan kelas 'is-opened' ke cover (untuk transisi zoom-out)
    cover.classList.add("is-opened");

    // 2. Tambahkan kelas 'is-visible' ke main-content (untuk transisi fade-in)
    mainContent.classList.add("is-visible");

    // 3. Tampilkan Navigasi Bawah
    bottomNav.style.transform = "translateY(0)";

    // 4. Mulai Audio
    audio.play();
    musicToggle.classList.add("is-playing"); // (Kita asumsikan ada kelas ini untuk ikon)
  });

  // --- LOGIKA 2: TOMBOL MUSIK ---
  musicToggle.addEventListener("click", function () {
    if (audio.paused) {
      audio.play();
      musicToggle.classList.add("is-playing");
      musicToggle.innerHTML = '<i class="fas fa-music"></i>'; // Ikon play
    } else {
      audio.pause();
      musicToggle.classList.remove("is-playing");
      musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>'; // Ikon mute
    }
  });

  // --- LOGIKA 3: ANIMASI SCROLL (.reveal) ---
  const revealElements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Tambahkan kelas .visible saat elemen masuk layar
          entry.target.classList.add("visible");
          // Opsional: Hentikan pengamatan setelah animasi terjadi
          // observer.unobserve(entry.target);
        }
        // Opsional: Hapus kelas jika ingin animasi berulang saat scroll ke atas
        // else {
        //   entry.target.classList.remove("visible");
        // }
      });
    },
    {
      threshold: 0.1, // Picu animasi saat 10% elemen terlihat
    }
  );

  revealElements.forEach((el) => {
    observer.observe(el);
  });

  // --- LOGIKA 4: SALIN NOMOR REKENING ---
  const copyButtons = document.querySelectorAll(".copy-btn");
  const notification = document.getElementById("notification-modal");

  copyButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const targetId = this.getAttribute("data-target");
      const targetElement = document.getElementById(targetId);
      const textToCopy = targetElement.innerText;

      navigator.clipboard.writeText(textToCopy).then(
        function () {
          // Sukses
          showNotification("Nomor berhasil disalin!");
        },
        function (err) {
          // Gagal
          showNotification("Gagal menyalin.", true);
        }
      );
    });
  });

  function showNotification(message, isError = false) {
    const notification = document.getElementById("notification-modal");
    const notificationMessage = document.getElementById("notification-message");

    notificationMessage.innerText = message;
    notification.style.backgroundColor = isError ? "#ef4444" : "#22c55e"; // Merah atau Hijau

    notification.style.opacity = "1";
    setTimeout(() => {
      notification.style.opacity = "0";
    }, 2000); // Tampilkan selama 2 detik
  }

  // --- LOGIKA 5: MODAL GALERI ---
  const galleryItems = document.querySelectorAll(".gallery-item");
  const modal = document.getElementById("gallery-modal");
  const modalImage = document.getElementById("modal-image");
  const closeModal = document.getElementById("close-modal");

  galleryItems.forEach((item) => {
    item.addEventListener("click", function () {
      const imgSrc = this.getAttribute("src");
      modalImage.setAttribute("src", imgSrc);
      modal.classList.remove("hidden");
      modal.classList.add("flex");
    });
  });

  closeModal.addEventListener("click", function () {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  });

  // Klik di luar gambar untuk menutup
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
    }
  });
});
