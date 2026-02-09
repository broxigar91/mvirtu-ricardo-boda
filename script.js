// Define el módulo de la aplicación AngularJS
var app = angular.module('weddingApp', ['ngSanitize']);

// Define el controlador principal
app.controller('WeddingController', function($timeout, $interval, $http, $sce) {
    var vm = this;
    // Datos de la boda
    // Fecha objetivo para el contador (formato: YYYY-MM-DDTHH:MM:SS)
    var targetDate = new Date('2026-05-16T12:00:00');
    vm.countdown = {};

    function updateCountdown() {
        var now = new Date();
        var diff = targetDate - now;
        if (diff < 0) diff = 0;
        var days = Math.floor(diff / (1000 * 60 * 60 * 24));
        var hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        var minutes = Math.floor((diff / (1000 * 60)) % 60);
        var seconds = Math.floor((diff / 1000) % 60);
        vm.countdown = {
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        };
    }

    updateCountdown();
    $interval(updateCountdown, 1000);
    vm.groomName = 'Ricardo';
    vm.brideName = 'Mari Virtu';
    vm.descriptionText = 'Estamos listos para hacer de este día la mejor fiesta de nuestras vidas. ¡Gracias por ser parte de nuestra historia!';
    vm.story = 'Todo empezó en 2013 en un autobús rumbo a Murcia para acudir al salón del manga. Desde entonces, hemos compartido innumerables aventuras, risas y momentos inolvidables juntos donde de una amistad nació el amor. Ahora, queremos celebrar nuestro amor rodeados de nuestros seres queridos en un evento inolvidable lleno de alegría, ritmo y emociones.';
    vm.ceremonyDate = '16/05/2026';
    vm.ceremonyTime = '12:00 PM';
    // Lugar unificado para ceremonia y banquete
    vm.venue = {
        name: 'Eskapa',
        address: 'Villena',
        coords: { lat: 38.6550289, lng: -0.8842534 },
        howToGo: '',
        website: 'https://alojamientoeskapa.com/',
        parkingInfo: 'En las inmediaciones del recinto, al aire libre'
    };
    vm.venue.howToGo = `https://www.google.com/maps/dir/?api=1&destination=${vm.venue.coords.lat},${vm.venue.coords.lng}`;

    // Derivados para compatibilidad con bindings existentes
    vm.ceremonyPlace = vm.venue.name;
    vm.ceremonyCoords = vm.venue.coords;
    vm.ceremonyAddress = vm.venue.address;
    vm.ceremonyHowToGo = vm.venue.howToGo;
    // vm.ceremonyPlace = 'El patio de la Tercia';
    // vm.ceremonyCoords = { lat: 38.630091, lng: -0.8626815 };
    // vm.ceremonyAddress = 'C. Tercia, 12, 03400 Villena, Alicante';
    // vm.ceremonyHowToGo = `https://www.google.com/maps/dir/?api=1&destination=${vm.ceremonyCoords.lat},${vm.ceremonyCoords.lng}`;
    vm.partyTime = '2:00 PM';
    vm.partyPlace = vm.venue.name;
    vm.partyCoords = vm.venue.coords;
    vm.partyHowToGo = vm.venue.howToGo;
    vm.partyPlaceWebsite = vm.venue.website;
    vm.rsvpDeadline = '1/04/2026';
    vm.dressCode = 'Formal con un toque festivo. ¡Siéntete libre de añadir accesorios divertidos y coloridos para celebrar con nosotros!';
    vm.childrenPolicy = 'Sí, los niños pueden venir con sus padres, su presencia en el evento es importantísima.';
    vm.transportInfo = 'Lamentablemente, no contamos con transporte organizado, por lo que cada asistente deberá gestionar su propio transporte hasta los lugares del evento. Te recomendamos coordinar con otros invitados para compartir vehículos y así facilitar el traslado. ¡Gracias por tu comprensión!';
    vm.giftsInfo = 'Ya tenéis vuestras entradas VIP para el festival. ¡No hace falta merchandising extra! Pero si insistís en apoyarnos, sabéis que el staff (los novios) estará disponible para sugerencias.';
    vm.companionPolicy = 'Aunque nos encantaría tener a todos juntos, las invitaciones están limitadas a aquellas personas que la hayan recibido. ¡Gracias por tu comprensión!';
    vm.groomPhone = '691 606 292';
    vm.bridePhone = '633 780 623';
    // Datos del FAQ
    function buildContactAnswerHtml() {
        var parts = [];
        if (vm.bridePhone) {
            parts.push(vm.brideName + ' (<strong>' + vm.bridePhone + '</strong>)');
        }
        if (vm.groomPhone) {
            parts.push(vm.groomName + ' (<strong>' + vm.groomPhone + '</strong>)');
        }
        var text = 'Sí, puedes llamarnos directamente: ' + parts.join(' y ') + '. O escribiendonos a <a href="mailto:mvyr160526@gmail.com">mvyr160526@gmail.com</a>.';
        return $sce.trustAsHtml(text);
    }

    vm.faqs = [
        {
            question: '¿Cuál es el código de vestimenta?',
            answer: vm.dressCode,
            isOpen: false
        },
        {
            question: '¿Puedo llevar acompañante?',
            answer: vm.companionPolicy,
            isOpen: false
        },
        {
            question: '¿Pueden venir niños al evento?',
            answer: vm.childrenPolicy,
            isOpen: false
        },
        {
            question: '¿Cómo puedo llegar al evento?',
            answer: vm.transportInfo,
            isOpen: false
        },
        {
            question: '¿Puedo contactar con vosotros de alguna forma más directa?',
            answer: buildContactAnswerHtml(),
            isOpen: false
        }
    ];
    
    // Función para expandir/contraer FAQ
    vm.toggleFaq = function(index) {
        vm.faqs[index].isOpen = !vm.faqs[index].isOpen;
    };
    
    // Funcionalidad del tema oscuro
    vm.isDarkMode = false;
    
    // Cargar preferencia del tema desde localStorage
    var savedTheme = localStorage.getItem('weddingTheme');
    if (savedTheme === 'dark') {
        vm.isDarkMode = true;
        document.body.classList.add('dark-theme');
    }
    
    vm.toggleTheme = function() {
        vm.isDarkMode = !vm.isDarkMode;
        if (vm.isDarkMode) {
            document.body.classList.add('dark-theme');
            localStorage.setItem('weddingTheme', 'dark');
        } else {
            document.body.classList.remove('dark-theme');
            localStorage.setItem('weddingTheme', 'light');
        }
    };
    
    vm.galeria = [
        { src: 'assets/images/photo1.jpg' },
        { src: 'assets/images/photo2.jpg' },
        { src: 'assets/images/photo3.jpg' },
        { src: 'assets/images/photo4.jpg' },
        { src: 'assets/images/photo5.jpg' },
        { src: 'assets/images/photo6.jpg' },
        { src: 'assets/images/photo7.jpg' },
        { src: 'assets/images/photo8.jpg' }
      ],
    vm.photoAlbumLink = 'https://photos.app.goo.gl/xwhofVyYZ4EXPY6C8';

    // Playlists de Spotify (configurables)
    vm.playlists = [
        {
            title: 'MVYR Playlist',
            url: 'https://open.spotify.com/playlist/1LrgdUccSKv6sD6l6Wbkud?si=5f2399d782ba4a0a',
            text: 'Conoce las canciones favoritas de los novios, no te quedes sin escucharlas!',
            icon: '🎧'
        },
        {
            title: 'Zona VIP After Party',
            url: 'https://open.spotify.com/playlist/4USwojo0yDJA9hj7ZYTYgW?si=3d6de45191d24b0e&pt=0ecec86d429f00c1e8fe0797c53e14e1',
            text: 'Ayudanos a completar la playlist del evento con tus canciones favoritas',
            icon: '⭐'
        }
    ];

    // Objeto para el formulario
    // Llamamos directamente al script de Google sin usar un proxy público
    vm.endpoint = "https://script.google.com/macros/s/AKfycbx5P5NYYJwDUhcwlx3LkIxjP0ToDlfreeAK-kDA_tLoth5Wdv_33dbg5BHdh0nGTThbog/exec";

    vm.rsvp = {};
    vm.enviado = false;
    vm.enviando = false;
    vm.message = '';
    vm.messageClass = '';

    // Función para manejar el envío del formulario
    vm.submitRSVP = function() {
      // Guardar los datos del formulario antes de enviar para tracking consistente
      var formData = {
        attendance: vm.rsvp.asistencia,
        has_name: !!vm.rsvp.nombre,
        has_email: !!vm.rsvp.email,
        has_allergies: !!vm.rsvp.alergias,
        has_message: !!vm.rsvp.mensaje,
        menu: vm.rsvp.menu
      };
      
      // Track form submission attempt
      if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submission_attempt', formData);
      }
      
      vm.enviando = true;
      vm.message = '';
      vm.messageClass = '';

      // Usamos fetch en modo "no-cors" para evitar problemas CORS de navegadores
      // En este modo no podemos leer la respuesta, así que asumimos éxito si no hay error de red.
      fetch(vm.endpoint, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify(vm.rsvp)
      })
      .then(function() {
        // Track successful form submission (éxito optimista)
        if (typeof gtag !== 'undefined') {
          gtag('event', 'form_submission_success', formData);
        }

        $timeout(function() {
          vm.enviado = true;
          vm.enviando = false;
          vm.rsvp = {}; // Solo vaciar después del "éxito"
          vm.message = '¡Gracias! Hemos recibido tu confirmación.';
          vm.messageClass = 'success';

          $timeout(function() {
            vm.enviado = false;
            vm.message = '';
            vm.messageClass = '';
          }, 5000);
        });
      })
      .catch(function(error) {
        // Track form submission error
        if (typeof gtag !== 'undefined') {
          gtag('event', 'form_submission_error', {
            'attendance': formData.attendance,
            'has_allergies': formData.has_allergies,
            'has_message': formData.has_message,
            'error_code': (error && error.message) || 'network_error',
            'menu': formData.menu
          });
        }

        $timeout(function() {
          vm.enviando = false;
          vm.message = 'Hubo un problema al enviar tu confirmación. Intenta de nuevo.';
          vm.messageClass = 'error';
          // NO vaciar vm.rsvp aquí - mantener los datos para reintento
        });
      });
    };

    // Scroll suave al line-up
    vm.scrollToLineUp = function() {
        // Track section view
        if (typeof gtag !== 'undefined') {
            gtag('event', 'section_view', {
                'section_name': 'lineup'
            });
        }
        
        var el = document.getElementById('info');
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Abre Google Maps con la dirección proporcionada
    vm.openLink = function(address) {
        window.open(address, '_blank');
    };
});