// Define el módulo de la aplicación AngularJS
var app = angular.module('weddingApp', []);

// Define el controlador principal
app.controller('WeddingController', function($timeout, $interval, $http) {
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
    vm.ceremonyPlace = 'El patio de la Tercia';
    vm.ceremonyCoords = { lat: 38.630091, lng: -0.8626815 };
    vm.ceremonyAddress = 'C. Tercia, 12, 03400 Villena, Alicante';
    vm.ceremonyHowToGo = `https://www.google.com/maps/dir/?api=1&destination=${vm.ceremonyCoords.lat},${vm.ceremonyCoords.lng}`;
    vm.partyTime = '2:00 PM';
    vm.partyPlace = 'Eskapa';
    vm.partyCoords = { lat: 38.6550289, lng: -0.8842534 };
    vm.partyHowToGo = `https://www.google.com/maps/dir/?api=1&destination=${vm.partyCoords.lat},${vm.partyCoords.lng}`;
    vm.partyPlaceWebsite = 'https://alojamientoeskapa.com/';
    vm.rsvpDeadline = '[Fecha límite]';
    vm.dressCode = '[Describe el código, por ejemplo: "atuendo de festival chic".]';
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

    // Objeto para el formulario
    vm.endpoint = "https://corsproxy.io/?url=https://script.google.com/macros/s/AKfycbx5P5NYYJwDUhcwlx3LkIxjP0ToDlfreeAK-kDA_tLoth5Wdv_33dbg5BHdh0nGTThbog/exec";

    vm.rsvp = {};
    vm.enviado = false;
    vm.enviando = false;
    vm.message = '';
    vm.messageClass = '';

    // Función para manejar el envío del formulario
    vm.submitRSVP = function() {
      vm.enviando = true;
      vm.message = '';
      vm.messageClass = '';
      $http.post(vm.endpoint, vm.rsvp)
        .then(function(response) {
          vm.enviado = true;
          vm.enviando = false;
          vm.rsvp = {};
          vm.message = '¡Gracias! Hemos recibido tu confirmación.';
          vm.messageClass = 'success';
          $timeout(function() {
            vm.enviado = false;
            vm.message = '';
            vm.messageClass = '';
          }, 5000);
        }, function(error) {
          vm.enviando = false;
          vm.message = 'Hubo un problema al enviar tu confirmación. Intenta de nuevo.';
          vm.messageClass = 'error';
        });
    };

    // Scroll suave al line-up
    vm.scrollToLineUp = function() {
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