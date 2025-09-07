angular.module('bodaApp', [])
  .controller('MainCtrl', function($scope, $interval, $sce, $http) {
    var vm = this;

    // ======== CONFIGURA AQUÍ ========
    vm.data = {
      novios: 'Mari Virtu y Ricardo',
      fecha: '2026-05-16T12:00:00+02:00',
      historia: 'Nos conocimos en 2013 en un autobús rumbo a Murcia para acudir al salón del manga. Desde entonces, hemos compartido innumerables aventuras, risas y momentos inolvidables juntos. Ahora, queremos celebrar nuestro amor rodeados de nuestros seres queridos.',
      itinerario: [
        { hora: '17:00', titulo: 'Ceremonia', descripcion: 'Llegada y ceremonia en el jardín principal.' },
        { hora: '18:30', titulo: 'Cóctel', descripcion: 'Brindis y canapés al atardecer.' },
        { hora: '20:00', titulo: 'Banquete', descripcion: 'Cena y palabras de los amigos.' },
        { hora: '22:30', titulo: 'Baile', descripcion: '¡A la pista con el DJ!'}
      ],
      lugares: [
        {
          nombre: "El castillo de Villena",
          direccion: "Plaza de las Embajadas",
          ciudad: "Villena",
          coords: { lat: 38.631765164502, lng: -0.8610266150958523 },
          tipo : "ceremonia"
        },
        {
          nombre: "Eskapa",
          direccion: "Paraje Casas de Cabanes y las Fuentes, 127",
          ciudad: "Villena",
          coords: { lat: 38.6550289, lng: -0.8842534 },
          web: "https://alojamientoeskapa.com/",
          parking: "Al aire libre, al lado del recinto.",
          tipo : "banquete"
        }
      ],
      galeria: [
        { src: 'assets/photo1.jpg' },
        { src: 'assets/photo2.jpg' },
        { src: 'assets/photo3.jpg' },
        { src: 'assets/photo4.jpg' },
        { src: 'assets/photo5.jpg' },
        { src: 'assets/photo6.jpg' },
        { src: 'assets/photo7.jpg' },
        { src: 'assets/photo8.jpg' }
      ],
      detalles: {
        vestimenta: 'Formal (colores claros, evita blanco/nude).',
        regalos: 'https://example.com/regalos',
        contacto: 'Dudas: +34 600 000 000 — laura.diego@example.com'
      },
      formularioExterno: 'https://forms.gle/xxxxxxxxxxxxxxxx7'
    };
    // =================================

    var date = new Date(vm.data.fecha);
    var opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    vm.fechaLarga = date.toLocaleDateString('es-ES', opciones) + ' — ' + date.toLocaleTimeString('es-ES', {hour: '2-digit', minute: '2-digit'});

    // vm.mapSrc = $sce.trustAsResourceUrl('https://www.google.com/maps/embed/v1/place?key=AIzaSyD-FAKE-KEY-REEMPLAZA&zoom=14&q=' + vm.data.lugar.coords.lat + ',' + vm.data.lugar.coords.lng);

    vm.countdown = { days: '—', hours: '—', minutes: '—' };
    function actualizarCountdown() {
      var ahora = new Date().getTime();
      var objetivo = new Date(vm.data.fecha).getTime();
      var diff = objetivo - ahora;
      if (diff <= 0) {
        vm.countdown = { days: 0, hours: 0, minutes: 0 };
        return;
      }
      var d = Math.floor(diff / (1000 * 60 * 60 * 24));
      var h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      $scope.$applyAsync(function(){
        vm.countdown = { days: d, hours: h, minutes: m };
      });
    }
    actualizarCountdown();
    var timer = $interval(actualizarCountdown, 60000);

    // ================= RSVP a Google Sheets =================
    var endpoint = "https://corsproxy.io/?url=https://script.google.com/macros/s/AKfycbx5P5NYYJwDUhcwlx3LkIxjP0ToDlfreeAK-kDA_tLoth5Wdv_33dbg5BHdh0nGTThbog/exec";
    

    vm.rsvp = { nombre: '', email: '', asistencia: '', menu: '', alergias: '', mensaje: '' };
    vm.enviado = false;
    vm.enviando = false;

    vm.enviarRSVP = function(form) {
      if (!form.$valid) { return; }
      vm.enviando = true;
      $http.post(endpoint, vm.rsvp)
        .then(function(response) {
          vm.enviado = true;
          vm.enviando = false;
          vm.rsvp = { nombre: '', email: '', asistencia: '', menu: '', alergias: '', mensaje: '' };
          form.$setPristine();
          form.$setUntouched();
          setTimeout(function() {
            $scope.$apply(function() {
              vm.enviado = false;
            });
          }, 5000);
        }, function(error) {
          vm.enviando = false;
          alert("Hubo un problema al enviar tu confirmación. Intenta de nuevo.");
        });
    };
    // =========================================================

    vm.year = new Date().getFullYear();

    vm.getLugarPorTipo = function(tipo) {
      return vm.data.lugares.find(function(lugar) {
        return lugar.tipo === tipo;
      });
    };    

    // ================= Slider =================
    // Índice del lugar actual en el slider
    vm.lugarActual = 0;

    // Control de transición
    vm.transicionando = false;

    // Función para mostrar el lugar actual
    vm.lugarSlider = function() {
      return vm.data.lugares[vm.lugarActual];
    };

    // Funciones para navegar con transición
    vm.siguienteLugar = function() {
      vm.transicionando = true;
      setTimeout(function() {
        $scope.$apply(function() {
          vm.lugarActual = (vm.lugarActual + 1) % vm.data.lugares.length;
          vm.transicionando = false;
        });
      }, 1500); // Duración igual a la transición CSS
    };
    vm.anteriorLugar = function() {
      vm.transicionando = true;
      setTimeout(function() {
        $scope.$apply(function() {
          vm.lugarActual = (vm.lugarActual - 1 + vm.data.lugares.length) % vm.data.lugares.length;
          vm.transicionando = false;
        });
      }, 1500);
    };

    // Intervalo automático para el slider
    var sliderInterval = $interval(vm.siguienteLugar, 5000); // Cambia cada 5 segundos
    // ========================================

    $scope.$on('$destroy', function(){
      $interval.cancel(timer);
      $interval.cancel(sliderInterval); // Limpia el intervalo del slider
    });
  });
