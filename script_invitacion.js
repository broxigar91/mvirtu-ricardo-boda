// Con click en la carta
const contenedor = document.querySelector("#AbrirContenedor");
// Abrir carta al hacer click en el contenedor
contenedor.addEventListener("click", () => {
  const ElementoSuperior = document.querySelector(".superior");
  ElementoSuperior.classList.add("abrir-superior");

  const h1 = document.querySelector("h1");
  const p = document.querySelector("p");
  h1.style.transform = "translateY(-120px)";
  p.style.transform = "translateY(-120px)";
  h1.style.transition = "transform 0.65s ease-in-out";
  p.style.transition = "transform 0.65s ease-in-out";

  const IconoCorazon = document.querySelector(".bx");
  IconoCorazon.classList.add("bx-rotada");

  setTimeout(() => {
    ElementoSuperior.style.zIndex = -1;
    const ElementoMensaje = document.querySelector(".mensaje");
    // Fase 1: salir del sobre
    ElementoMensaje.classList.add("salir-sobre");

    const avanzarAFase2 = (e) => {
      if (e.propertyName !== "transform") return;
      if (e.target !== ElementoMensaje) return; // ignora bubbling desde hijos
      ElementoMensaje.removeEventListener("transitionend", avanzarAFase2, true);
      // Fase 2: centrar y escalar a tamaño final
      ElementoMensaje.classList.remove("salir-sobre");
      ElementoMensaje.classList.add("centrar-invitacion");
      
      // Mostrar los botones cuando termine la animación de centrado
      setTimeout(() => {
        const botones = document.querySelector(".botones");
        botones.style.visibility = "visible";
        botones.style.opacity = "0";
        botones.style.transition = "opacity 0.5s ease-in-out";
        // Pequeño delay para que la transición se vea suave
        setTimeout(() => {
          botones.style.opacity = "1";
        }, 50);
      }, 100);
    };
    ElementoMensaje.addEventListener("transitionend", avanzarAFase2, true);
  }, 650);
});