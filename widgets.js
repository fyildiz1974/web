/* =========================================================
   widgets.js
   - i18n (EN/TR/DE/FR/ES/RU)
   - DateTime widget
   - Location modal (IP + GPS + search + popular)
   - Open-Meteo weather + next 3 hours
   - Widgets are shown ONLY after weather is successfully loaded
   ========================================================= */

(function () {
    "use strict";

    // -----------------------------
    // Small safe helpers
    // -----------------------------
    function $(id) { return document.getElementById(id); }
    function pad2(n) { return String(n).padStart(2, "0"); }

    function safeToast(msg, type) {
        if (typeof window.showToast === "function") {
            window.showToast(msg, type);
        } else {
            // no-op (project may not have toast)
            console.warn("[Widgets]", msg);
        }
    }

    // -----------------------------
    // I18n
    // -----------------------------
    const I18n = {
        currentLang: "en",

        translations: {
            en: {
                dayPhaseNight: "Night",
                dayPhaseMorning: "Morning",
                dayPhaseAfternoon: "Afternoon",
                dayPhaseEvening: "Evening",

                weatherLoading: "Loading...",
                weatherError: "Unable to load weather",
                weatherRetry: "Retry",
                weatherUpdated: "Updated",
                weatherNow: "Now",
                weatherHumidity: "Humidity",
                weatherWind: "Wind",
                weatherFeelsLike: "Feels like",

                weatherClear: "Clear sky",
                weatherMainlyClear: "Mainly clear",
                weatherPartlyCloudy: "Partly cloudy",
                weatherOvercast: "Overcast",
                weatherFog: "Fog",
                weatherDrizzleLight: "Light drizzle",
                weatherDrizzle: "Drizzle",
                weatherDrizzleHeavy: "Heavy drizzle",
                weatherRainLight: "Light rain",
                weatherRain: "Rain",
                weatherRainHeavy: "Heavy rain",
                weatherSnowLight: "Light snow",
                weatherSnow: "Snow",
                weatherSnowHeavy: "Heavy snow",
                weatherSleet: "Sleet",
                weatherThunderstorm: "Thunderstorm",
                weatherThunderstormHail: "Thunderstorm with hail",

                locationTitle: "Select Location",
                locationAuto: "Automatic (IP Based)",
                locationAutoDesc: "Detect location automatically",
                locationGPS: "Use GPS",
                locationGPSDesc: "Precise location (requires permission)",
                locationSearch: "Search city...",
                locationPopular: "Popular Cities",
                locationSearching: "Searching...",
                locationNoResults: "No cities found",
                locationGPSPermDenied: "GPS permission denied",
                locationGPSUnavailable: "Location unavailable",
                locationGPSTimeout: "Location request timed out",
                locationDetecting: "Detecting location...",

                days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            },

            tr: {
                dayPhaseNight: "Gece",
                dayPhaseMorning: "Sabah",
                dayPhaseAfternoon: "Öğleden Sonra",
                dayPhaseEvening: "Akşam",

                weatherLoading: "Yükleniyor...",
                weatherError: "Hava durumu yüklenemedi",
                weatherRetry: "Tekrar Dene",
                weatherUpdated: "Güncellendi",
                weatherNow: "Şimdi",
                weatherHumidity: "Nem",
                weatherWind: "Rüzgar",
                weatherFeelsLike: "Hissedilen",

                weatherClear: "Açık",
                weatherMainlyClear: "Az bulutlu",
                weatherPartlyCloudy: "Parçalı bulutlu",
                weatherOvercast: "Bulutlu",
                weatherFog: "Sisli",
                weatherDrizzleLight: "Hafif çisenti",
                weatherDrizzle: "Çisenti",
                weatherDrizzleHeavy: "Yoğun çisenti",
                weatherRainLight: "Hafif yağmur",
                weatherRain: "Yağmurlu",
                weatherRainHeavy: "Şiddetli yağmur",
                weatherSnowLight: "Hafif kar",
                weatherSnow: "Karlı",
                weatherSnowHeavy: "Yoğun kar",
                weatherSleet: "Karla karışık yağmur",
                weatherThunderstorm: "Gök gürültülü fırtına",
                weatherThunderstormHail: "Dolu ile fırtına",

                locationTitle: "Konum Seç",
                locationAuto: "Otomatik (IP Tabanlı)",
                locationAutoDesc: "Konumu otomatik algıla",
                locationGPS: "GPS Kullan",
                locationGPSDesc: "Hassas konum (izin gerektirir)",
                locationSearch: "Şehir ara...",
                locationPopular: "Popüler Şehirler",
                locationSearching: "Aranıyor...",
                locationNoResults: "Şehir bulunamadı",
                locationGPSPermDenied: "GPS izni reddedildi",
                locationGPSUnavailable: "Konum alınamadı",
                locationGPSTimeout: "Konum isteği zaman aşımına uğradı",
                locationDetecting: "Konum algılanıyor...",

                days: ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"],
                daysShort: ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"],
                months: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"],
                monthsShort: ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"]
            },

            de: {
                dayPhaseNight: "Nacht",
                dayPhaseMorning: "Morgen",
                dayPhaseAfternoon: "Nachmittag",
                dayPhaseEvening: "Abend",

                weatherLoading: "Laden...",
                weatherError: "Wetter konnte nicht geladen werden",
                weatherRetry: "Wiederholen",
                weatherUpdated: "Aktualisiert",
                weatherNow: "Jetzt",
                weatherHumidity: "Feuchtigkeit",
                weatherWind: "Wind",
                weatherFeelsLike: "Gefühlt",

                weatherClear: "Klar",
                weatherMainlyClear: "Überwiegend klar",
                weatherPartlyCloudy: "Teilweise bewölkt",
                weatherOvercast: "Bewölkt",
                weatherFog: "Nebel",
                weatherDrizzleLight: "Leichter Niesel",
                weatherDrizzle: "Niesel",
                weatherDrizzleHeavy: "Starker Niesel",
                weatherRainLight: "Leichter Regen",
                weatherRain: "Regen",
                weatherRainHeavy: "Starker Regen",
                weatherSnowLight: "Leichter Schnee",
                weatherSnow: "Schnee",
                weatherSnowHeavy: "Starker Schnee",
                weatherSleet: "Schneeregen",
                weatherThunderstorm: "Gewitter",
                weatherThunderstormHail: "Gewitter mit Hagel",

                locationTitle: "Standort auswählen",
                locationAuto: "Automatisch (IP-basiert)",
                locationAutoDesc: "Standort automatisch erkennen",
                locationGPS: "GPS verwenden",
                locationGPSDesc: "Präziser Standort (Berechtigung erforderlich)",
                locationSearch: "Stadt suchen...",
                locationPopular: "Beliebte Städte",
                locationSearching: "Suche...",
                locationNoResults: "Keine Städte gefunden",
                locationGPSPermDenied: "GPS-Berechtigung verweigert",
                locationGPSUnavailable: "Standort nicht verfügbar",
                locationGPSTimeout: "Standortabfrage Zeitüberschreitung",
                locationDetecting: "Standort wird erkannt...",

                days: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
                daysShort: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
                months: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
                monthsShort: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"]
            },

            fr: {
                dayPhaseNight: "Nuit",
                dayPhaseMorning: "Matin",
                dayPhaseAfternoon: "Après-midi",
                dayPhaseEvening: "Soir",

                weatherLoading: "Chargement...",
                weatherError: "Impossible de charger la météo",
                weatherRetry: "Réessayer",
                weatherUpdated: "Mis à jour",
                weatherNow: "Maintenant",
                weatherHumidity: "Humidité",
                weatherWind: "Vent",
                weatherFeelsLike: "Ressenti",

                weatherClear: "Ciel dégagé",
                weatherMainlyClear: "Principalement dégagé",
                weatherPartlyCloudy: "Partiellement nuageux",
                weatherOvercast: "Couvert",
                weatherFog: "Brouillard",
                weatherDrizzleLight: "Bruine légère",
                weatherDrizzle: "Bruine",
                weatherDrizzleHeavy: "Forte bruine",
                weatherRainLight: "Pluie légère",
                weatherRain: "Pluie",
                weatherRainHeavy: "Forte pluie",
                weatherSnowLight: "Neige légère",
                weatherSnow: "Neige",
                weatherSnowHeavy: "Forte neige",
                weatherSleet: "Neige fondue",
                weatherThunderstorm: "Orage",
                weatherThunderstormHail: "Orage avec grêle",

                locationTitle: "Sélectionner un lieu",
                locationAuto: "Automatique (basé sur IP)",
                locationAutoDesc: "Détecter automatiquement",
                locationGPS: "Utiliser le GPS",
                locationGPSDesc: "Position précise (permission requise)",
                locationSearch: "Rechercher une ville...",
                locationPopular: "Villes populaires",
                locationSearching: "Recherche...",
                locationNoResults: "Aucune ville trouvée",
                locationGPSPermDenied: "Autorisation GPS refusée",
                locationGPSUnavailable: "Position indisponible",
                locationGPSTimeout: "Délai d'attente GPS dépassé",
                locationDetecting: "Détection de la position...",

                days: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
                daysShort: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
                months: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
                monthsShort: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"]
            },

            es: {
                dayPhaseNight: "Noche",
                dayPhaseMorning: "Mañana",
                dayPhaseAfternoon: "Tarde",
                dayPhaseEvening: "Noche",

                weatherLoading: "Cargando...",
                weatherError: "No se pudo cargar el clima",
                weatherRetry: "Reintentar",
                weatherUpdated: "Actualizado",
                weatherNow: "Ahora",
                weatherHumidity: "Humedad",
                weatherWind: "Viento",
                weatherFeelsLike: "Sensación",

                weatherClear: "Despejado",
                weatherMainlyClear: "Mayormente despejado",
                weatherPartlyCloudy: "Parcialmente nublado",
                weatherOvercast: "Nublado",
                weatherFog: "Niebla",
                weatherDrizzleLight: "Llovizna ligera",
                weatherDrizzle: "Llovizna",
                weatherDrizzleHeavy: "Llovizna fuerte",
                weatherRainLight: "Lluvia ligera",
                weatherRain: "Lluvia",
                weatherRainHeavy: "Lluvia fuerte",
                weatherSnowLight: "Nieve ligera",
                weatherSnow: "Nieve",
                weatherSnowHeavy: "Nieve fuerte",
                weatherSleet: "Aguanieve",
                weatherThunderstorm: "Tormenta",
                weatherThunderstormHail: "Tormenta con granizo",

                locationTitle: "Seleccionar ubicación",
                locationAuto: "Automático (basado en IP)",
                locationAutoDesc: "Detectar automáticamente",
                locationGPS: "Usar GPS",
                locationGPSDesc: "Ubicación precisa (requiere permiso)",
                locationSearch: "Buscar ciudad...",
                locationPopular: "Ciudades populares",
                locationSearching: "Buscando...",
                locationNoResults: "No se encontraron ciudades",
                locationGPSPermDenied: "Permiso GPS denegado",
                locationGPSUnavailable: "Ubicación no disponible",
                locationGPSTimeout: "Tiempo de espera agotado",
                locationDetecting: "Detectando ubicación...",

                days: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
                daysShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
                months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
                monthsShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
            },

            ru: {
                dayPhaseNight: "Ночь",
                dayPhaseMorning: "Утро",
                dayPhaseAfternoon: "День",
                dayPhaseEvening: "Вечер",

                weatherLoading: "Загрузка...",
                weatherError: "Не удалось загрузить погоду",
                weatherRetry: "Повторить",
                weatherUpdated: "Обновлено",
                weatherNow: "Сейчас",
                weatherHumidity: "Влажность",
                weatherWind: "Ветер",
                weatherFeelsLike: "Ощущается как",

                weatherClear: "Ясно",
                weatherMainlyClear: "Преимущественно ясно",
                weatherPartlyCloudy: "Переменная облачность",
                weatherOvercast: "Пасмурно",
                weatherFog: "Туман",
                weatherDrizzleLight: "Слабая морось",
                weatherDrizzle: "Морось",
                weatherDrizzleHeavy: "Сильная морось",
                weatherRainLight: "Небольшой дождь",
                weatherRain: "Дождь",
                weatherRainHeavy: "Сильный дождь",
                weatherSnowLight: "Небольшой снег",
                weatherSnow: "Снег",
                weatherSnowHeavy: "Сильный снег",
                weatherSleet: "Мокрый снег",
                weatherThunderstorm: "Гроза",
                weatherThunderstormHail: "Гроза с градом",

                locationTitle: "Выбор местоположения",
                locationAuto: "Автоматически (по IP)",
                locationAutoDesc: "Определить местоположение автоматически",
                locationGPS: "Использовать GPS",
                locationGPSDesc: "Точное местоположение (нужно разрешение)",
                locationSearch: "Поиск города...",
                locationPopular: "Популярные города",
                locationSearching: "Поиск...",
                locationNoResults: "Города не найдены",
                locationGPSPermDenied: "Доступ к GPS отклонён",
                locationGPSUnavailable: "Местоположение недоступно",
                locationGPSTimeout: "Время ожидания GPS истекло",
                locationDetecting: "Определение местоположения...",

                days: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
                daysShort: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
                months: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
                monthsShort: ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"]
            }
        },

        init: function () {
            const browserLang = navigator.language || navigator.userLanguage || "en";
            const langCode = browserLang.split("-")[0].toLowerCase();

            this.currentLang = this.translations[langCode] ? langCode : "en";
            document.documentElement.lang = this.currentLang;

            this.updateStaticTexts();
        },

        t: function (key, fallback) {
            const lang = this.translations[this.currentLang] || this.translations.en;
            const en = this.translations.en;
            const v = (lang && lang[key] !== undefined) ? lang[key] : (en[key] !== undefined ? en[key] : undefined);
            return v !== undefined ? v : (fallback !== undefined ? fallback : key);
        },

        updateStaticTexts: function () {
            const map = {
                "location-modal-title": "📍 " + this.t("locationTitle"),
                "location-auto-title": this.t("locationAuto"),
                "location-auto-desc": this.t("locationAutoDesc"),
                "location-gps-title": this.t("locationGPS"),
                "location-gps-desc": this.t("locationGPSDesc"),
                "location-popular-title": this.t("locationPopular"),
                "weather-error-text": this.t("weatherError"),
                "weather-retry-btn": this.t("weatherRetry")
            };

            for (const [id, text] of Object.entries(map)) {
                const el = $(id);
                if (el) el.textContent = text;
            }

            const searchInput = $("location-search-input");
            if (searchInput) searchInput.placeholder = this.t("locationSearch");
        }
    };

    // -----------------------------
    // DateTimeManager
    // -----------------------------
    const DateTimeManager = {
        intervalId: null,

        init: function () {
            this.update();
            this.intervalId = setInterval(() => this.update(), 1000);
        },

        update: function () {
            const now = new Date();

            const hours = pad2(now.getHours());
            const minutes = pad2(now.getMinutes());
            const seconds = pad2(now.getSeconds());

            const timeDisplay = $("time-display");
            const secDisplay = $("time-seconds");
            if (timeDisplay) timeDisplay.textContent = `${hours}:${minutes}`;
            if (secDisplay) secDisplay.textContent = seconds;

            const day = now.getDate();
            const monthNames = I18n.t("monthsShort", I18n.translations.en.monthsShort);
            const month = monthNames[now.getMonth()];
            const year = now.getFullYear();

            const dateDisplay = $("date-display");
            if (dateDisplay) dateDisplay.textContent = `${day} ${month} ${year}`;

            const dayNames = I18n.t("days", I18n.translations.en.days);
            const dayDisplay = $("day-display");
            if (dayDisplay) dayDisplay.textContent = dayNames[now.getDay()];

            const phase = this.getDayPhase(now.getHours());
            const phaseIcon = $("day-phase-icon");
            const phaseText = $("day-phase-text");
            if (phaseIcon) phaseIcon.textContent = phase.icon;
            if (phaseText) phaseText.textContent = phase.text;
        },

        getDayPhase: function (hour) {
            // (Şimdilik sadece gösterim; senaryo motoruna bağlamıyoruz)
            if (hour >= 20 || hour < 6) {
                return { icon: "🌙", text: I18n.t("dayPhaseNight"), isNight: true };
            } else if (hour >= 6 && hour < 12) {
                return { icon: "🌅", text: I18n.t("dayPhaseMorning"), isNight: false };
            } else if (hour >= 12 && hour < 18) {
                return { icon: "☀️", text: I18n.t("dayPhaseAfternoon"), isNight: false };
            } else {
                return { icon: "🌆", text: I18n.t("dayPhaseEvening"), isNight: false };
            }
        },

        destroy: function () {
            if (this.intervalId) clearInterval(this.intervalId);
            this.intervalId = null;
        }
    };

    // -----------------------------
    // Widgets UI control
    // -----------------------------
    const WidgetsUI = {
        container: null,

        init: function () {
            this.container = $("widgets-container");
        },

        show: function () {
            if (!this.container) return;
            this.container.classList.remove("widgets-hidden");
            this.container.classList.add("widgets-visible");
            this.container.setAttribute("aria-hidden", "false");
        },

        hide: function () {
            if (!this.container) return;
            this.container.classList.add("widgets-hidden");
            this.container.classList.remove("widgets-visible");
            this.container.setAttribute("aria-hidden", "true");
        }
    };

    // -----------------------------
    // LocationManager
    // -----------------------------
    const LocationManager = {
        currentLocation: null,
        locationType: "auto", // 'auto', 'gps', 'manual'

        popularCities: [
            { name: "Istanbul", country: "TR", lat: 41.0082, lon: 28.9784 },
            { name: "London", country: "GB", lat: 51.5074, lon: -0.1278 },
            { name: "New York", country: "US", lat: 40.7128, lon: -74.0060 },
            { name: "Tokyo", country: "JP", lat: 35.6762, lon: 139.6503 },
            { name: "Paris", country: "FR", lat: 48.8566, lon: 2.3522 },
            { name: "Berlin", country: "DE", lat: 52.5200, lon: 13.4050 },
            { name: "Dubai", country: "AE", lat: 25.2048, lon: 55.2708 },
            { name: "Sydney", country: "AU", lat: -33.8688, lon: 151.2093 }
        ],

        init: async function () {
            const saved = this.loadSavedLocation();
            if (saved) {
                this.currentLocation = saved.location;
                this.locationType = saved.type;
                return this.currentLocation;
            }
            return await this.detectByIP();
        },

        detectByIP: async function () {
            const apis = [
                {
                    url: "https://ipapi.co/json/",
                    parse: (data) => ({
                        lat: data.latitude,
                        lon: data.longitude,
                        city: data.city,
                        country: data.country_code,
                        label: `${data.city}, ${data.country_code}`
                    })
                },
                {
                    url: "https://ip-api.com/json/?fields=status,city,country,countryCode,lat,lon",
                    parse: (data) => {
                        if (data.status !== "success") throw new Error("IP API failed");
                        return {
                            lat: data.lat,
                            lon: data.lon,
                            city: data.city,
                            country: data.countryCode,
                            label: `${data.city}, ${data.countryCode}`
                        };
                    }
                },
                {
                    url: "https://ipwho.is/",
                    parse: (data) => {
                        if (!data.success) throw new Error("ipwho.is failed");
                        return {
                            lat: data.latitude,
                            lon: data.longitude,
                            city: data.city,
                            country: data.country_code,
                            label: `${data.city}, ${data.country_code}`
                        };
                    }
                }
            ];

            for (const api of apis) {
                try {
                    const controller = new AbortController();
                    const timeoutId = setTimeout(() => controller.abort(), 5000);

                    const res = await fetch(api.url, {
                        signal: controller.signal,
                        headers: { Accept: "application/json" }
                    });
                    clearTimeout(timeoutId);
                    if (!res.ok) continue;

                    const data = await res.json();
                    const loc = api.parse(data);

                    if (loc.lat && loc.lon) {
                        this.currentLocation = loc;
                        this.locationType = "auto";
                        this.saveLocation();
                        return loc;
                    }
                } catch (e) {
                    console.warn("[Widgets] IP location API failed:", api.url, e.message);
                }
            }

            // Fallback
            const fb = this.popularCities[0];
            this.currentLocation = { ...fb, label: `${fb.name}, ${fb.country}` };
            this.locationType = "auto";
            return this.currentLocation;
        },

        detectByGPS: function () {
            return new Promise((resolve, reject) => {
                if (!navigator.geolocation) {
                    reject(new Error(I18n.t("locationGPSUnavailable")));
                    return;
                }

                navigator.geolocation.getCurrentPosition(
                    async (pos) => {
                        const { latitude, longitude } = pos.coords;

                        try {
                            const r = await fetch(
                                `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${latitude}&longitude=${longitude}&language=${I18n.currentLang}`
                            );
                            const data = await r.json();

                            let cityName = "Unknown";
                            let countryCode = "";

                            if (data.results && data.results[0]) {
                                cityName = data.results[0].name || data.results[0].admin1 || "Unknown";
                                countryCode = data.results[0].country_code || "";
                            }

                            this.currentLocation = {
                                lat: latitude,
                                lon: longitude,
                                city: cityName,
                                country: countryCode,
                                label: countryCode ? `${cityName}, ${countryCode}` : cityName
                            };
                            this.locationType = "gps";
                            this.saveLocation();
                            resolve(this.currentLocation);
                        } catch (e) {
                            this.currentLocation = {
                                lat: latitude,
                                lon: longitude,
                                city: "GPS Location",
                                country: "",
                                label: `${latitude.toFixed(2)}°, ${longitude.toFixed(2)}°`
                            };
                            this.locationType = "gps";
                            this.saveLocation();
                            resolve(this.currentLocation);
                        }
                    },
                    (err) => {
                        let msg;
                        switch (err.code) {
                            case err.PERMISSION_DENIED: msg = I18n.t("locationGPSPermDenied"); break;
                            case err.POSITION_UNAVAILABLE: msg = I18n.t("locationGPSUnavailable"); break;
                            case err.TIMEOUT: msg = I18n.t("locationGPSTimeout"); break;
                            default: msg = I18n.t("locationGPSUnavailable");
                        }
                        reject(new Error(msg));
                    },
                    { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
                );
            });
        },

        searchCity: async function (query) {
            if (!query || query.length < 2) return [];

            try {
                const res = await fetch(
                    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=8&language=${I18n.currentLang}&format=json`
                );
                if (!res.ok) return [];
                const data = await res.json();
                if (!data.results) return [];

                return data.results.map((c) => ({
                    name: c.name,
                    country: c.country_code || "",
                    countryName: c.country || "",
                    admin: c.admin1 || "",
                    lat: c.latitude,
                    lon: c.longitude,
                    label: c.admin1 ? `${c.name}, ${c.admin1}, ${c.country_code}` : `${c.name}, ${c.country_code}`
                }));
            } catch (e) {
                console.warn("[Widgets] City search failed:", e.message);
                return [];
            }
        },

        setManualLocation: function (location) {
            this.currentLocation = {
                lat: location.lat,
                lon: location.lon,
                city: location.name || location.city,
                country: location.country,
                label: location.label || `${location.name || location.city}, ${location.country}`
            };
            this.locationType = "manual";
            this.saveLocation();
            return this.currentLocation;
        },

        saveLocation: function () {
            try {
                localStorage.setItem("weatherLocation", JSON.stringify({
                    location: this.currentLocation,
                    type: this.locationType,
                    savedAt: Date.now()
                }));
            } catch (e) { }
        },

        loadSavedLocation: function () {
            try {
                const saved = localStorage.getItem("weatherLocation");
                if (!saved) return null;
                const data = JSON.parse(saved);
                if (data.savedAt && (Date.now() - data.savedAt < 7 * 24 * 60 * 60 * 1000)) {
                    return data;
                }
            } catch (e) { }
            return null;
        },

        clearSavedLocation: function () {
            try { localStorage.removeItem("weatherLocation"); } catch (e) { }
        }
    };

    // -----------------------------
    // WeatherManager (Open-Meteo)
    // -----------------------------
    const WeatherManager = {
        currentWeather: null,
        hourlyForecast: [],
        lastUpdate: null,
        updateInterval: null,
        isLoading: false,

        weatherCodes: {
            0: { icon: "☀️", iconNight: "🌙", key: "weatherClear", rain: 0 },
            1: { icon: "🌤️", iconNight: "🌙", key: "weatherMainlyClear", rain: 0 },
            2: { icon: "⛅", iconNight: "☁️", key: "weatherPartlyCloudy", rain: 5 },
            3: { icon: "☁️", iconNight: "☁️", key: "weatherOvercast", rain: 10 },
            45: { icon: "🌫️", iconNight: "🌫️", key: "weatherFog", rain: 5 },
            48: { icon: "🌫️", iconNight: "🌫️", key: "weatherFog", rain: 5 },
            51: { icon: "🌦️", iconNight: "🌧️", key: "weatherDrizzleLight", rain: 30 },
            53: { icon: "🌦️", iconNight: "🌧️", key: "weatherDrizzle", rain: 40 },
            55: { icon: "🌧️", iconNight: "🌧️", key: "weatherDrizzleHeavy", rain: 50 },
            56: { icon: "🌧️", iconNight: "🌧️", key: "weatherDrizzleLight", rain: 35 },
            57: { icon: "🌧️", iconNight: "🌧️", key: "weatherDrizzleHeavy", rain: 55 },
            61: { icon: "🌧️", iconNight: "🌧️", key: "weatherRainLight", rain: 60 },
            63: { icon: "🌧️", iconNight: "🌧️", key: "weatherRain", rain: 75 },
            65: { icon: "🌧️", iconNight: "🌧️", key: "weatherRainHeavy", rain: 90 },
            66: { icon: "🌧️", iconNight: "🌧️", key: "weatherSleet", rain: 65 },
            67: { icon: "🌧️", iconNight: "🌧️", key: "weatherSleet", rain: 80 },
            71: { icon: "🌨️", iconNight: "🌨️", key: "weatherSnowLight", rain: 0, snow: true },
            73: { icon: "❄️", iconNight: "❄️", key: "weatherSnow", rain: 0, snow: true },
            75: { icon: "❄️", iconNight: "❄️", key: "weatherSnowHeavy", rain: 0, snow: true },
            77: { icon: "🌨️", iconNight: "🌨️", key: "weatherSnow", rain: 0, snow: true },
            80: { icon: "🌦️", iconNight: "🌧️", key: "weatherRainLight", rain: 65 },
            81: { icon: "🌧️", iconNight: "🌧️", key: "weatherRain", rain: 80 },
            82: { icon: "🌧️", iconNight: "🌧️", key: "weatherRainHeavy", rain: 100 },
            85: { icon: "🌨️", iconNight: "🌨️", key: "weatherSnowLight", rain: 0, snow: true },
            86: { icon: "❄️", iconNight: "❄️", key: "weatherSnowHeavy", rain: 0, snow: true },
            95: { icon: "⛈️", iconNight: "⛈️", key: "weatherThunderstorm", rain: 90, thunder: true },
            96: { icon: "⛈️", iconNight: "⛈️", key: "weatherThunderstormHail", rain: 95, thunder: true },
            99: { icon: "⛈️", iconNight: "⛈️", key: "weatherThunderstormHail", rain: 100, thunder: true }
        },

        init: function () {
            this.fetchWeather();
            this.updateInterval = setInterval(() => this.fetchWeather(), 15 * 60 * 1000);
        },

        fetchWeather: async function () {
            if (this.isLoading) return;

            const loc = LocationManager.currentLocation;
            if (!loc || !loc.lat || !loc.lon) return;

            this.isLoading = true;
            this.showLoading();

            try {
                const url =
                    `https://api.open-meteo.com/v1/forecast?latitude=${loc.lat}&longitude=${loc.lon}` +
                    `&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,is_day` +
                    `&hourly=temperature_2m,weather_code,is_day` +
                    `&timezone=auto&forecast_days=1`;

                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 10000);

                const res = await fetch(url, { signal: controller.signal });
                clearTimeout(timeoutId);

                if (!res.ok) throw new Error("Weather API error: " + res.status);

                const data = await res.json();
                if (!data.current) throw new Error("Invalid weather data");

                const current = data.current;
                const w = this.weatherCodes[current.weather_code] || this.weatherCodes[0];
                const isDay = current.is_day === 1;

                this.currentWeather = {
                    temp: Math.round(current.temperature_2m),
                    feelsLike: Math.round(current.apparent_temperature),
                    humidity: current.relative_humidity_2m,
                    windSpeed: Math.round(current.wind_speed_10m),
                    code: current.weather_code,
                    icon: isDay ? w.icon : w.iconNight,
                    description: I18n.t(w.key, w.key),
                    isDay,
                    rainIntensity: w.rain,
                    isSnow: !!w.snow,
                    isThunder: !!w.thunder
                };

                // Build next 3 hours forecast
                this.hourlyForecast = [];
                if (data.hourly && data.hourly.time && data.hourly.time.length) {
                    const now = new Date();
                    const nowMs = now.getTime();

                    for (let i = 0; i < data.hourly.time.length; i++) {
                        if (this.hourlyForecast.length >= 3) break;

                        const t = new Date(data.hourly.time[i]);
                        const tMs = t.getTime();

                        // take "now hour" and next hours
                        if (tMs + 60 * 60 * 1000 < nowMs) continue;

                        const hourCode = data.hourly.weather_code[i];
                        const hourWeather = this.weatherCodes[hourCode] || this.weatherCodes[0];
                        const hourIsDay = data.hourly.is_day ? (data.hourly.is_day[i] === 1) : true;

                        const isNowHour =
                            t.getHours() === now.getHours() &&
                            t.getDate() === now.getDate() &&
                            t.getMonth() === now.getMonth();

                        this.hourlyForecast.push({
                            time: t,
                            hour: t.getHours(),
                            temp: Math.round(data.hourly.temperature_2m[i]),
                            code: hourCode,
                            icon: hourIsDay ? hourWeather.icon : hourWeather.iconNight,
                            isNow: isNowHour
                        });
                    }
                }

                this.lastUpdate = new Date();
                this.updateUI();

                // Widgets become visible ONLY after success
                WidgetsUI.show();

                // Broadcast for future auto-scene usage
                window.dispatchEvent(new CustomEvent("weatherUpdated", { detail: this.currentWeather }));
            } catch (e) {
                console.warn("[Widgets] Weather fetch failed:", e.message);
                this.showError(I18n.t("weatherError"));

                // Requirement: do NOT show widgets until weather arrives.
                // Keep hidden on error, but allow silent retries.
            } finally {
                this.isLoading = false;
            }
        },

        updateUI: function () {
            const widget = $("weather-widget");
            const content = $("weather-content");
            if (!widget || !content || !this.currentWeather) return;

            widget.classList.remove("loading", "error");
            content.style.display = "block";

            const locLabel = LocationManager.currentLocation?.label || I18n.t("weatherLoading");
            const locEl = $("location-text");
            if (locEl) locEl.textContent = locLabel;

            // Hava ikonu + animasyon class'ı
            const weatherIcon = $("weather-icon");
            if (weatherIcon) {
                weatherIcon.textContent = this.currentWeather.icon;

                // İkon animasyon class'ı
                weatherIcon.classList.remove('rain', 'sun', 'moon', 'cloud', 'snow');

                const code = this.currentWeather.code;
                if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99].includes(code)) {
                    weatherIcon.classList.add('rain');
                } else if (code === 0 || code === 1) {
                    weatherIcon.classList.add(this.currentWeather.isDay ? 'sun' : 'moon');
                } else if ([2, 3, 45, 48].includes(code)) {
                    weatherIcon.classList.add('cloud');
                } else if ([71, 73, 75, 77, 85, 86].includes(code)) {
                    weatherIcon.classList.add('snow');
                }
            }

            $("weather-temp").textContent = String(this.currentWeather.temp);
            $("weather-desc").textContent = this.currentWeather.description;

            $("weather-humidity").textContent = this.currentWeather.humidity + "%";
            $("weather-wind").textContent = this.currentWeather.windSpeed + " km/h";
            $("weather-feels").textContent = this.currentWeather.feelsLike + "°";

            if (this.lastUpdate) {
                $("weather-update-time").textContent = `${pad2(this.lastUpdate.getHours())}:${pad2(this.lastUpdate.getMinutes())}`;
            }

            this.updateHourlyUI();
        },

        updateHourlyUI: function () {
            const c = $("weather-hourly");
            if (!c) return;
            c.innerHTML = "";

            for (const hour of this.hourlyForecast) {
                const el = document.createElement("div");
                el.className = "weather-hour" + (hour.isNow ? " is-now" : "");
                el.setAttribute("role", "listitem");

                const timeText = hour.isNow ? I18n.t("weatherNow") : (pad2(hour.hour) + ":00");

                el.innerHTML = `
          <span class="weather-hour-time">${timeText}</span>
          <span class="weather-hour-icon">${hour.icon}</span>
          <span class="weather-hour-temp">${hour.temp}°</span>
        `;

                c.appendChild(el);
            }
        },

        showLoading: function () {
            const widget = $("weather-widget");
            if (!widget) return;
            widget.classList.add("loading");
            widget.classList.remove("error");
        },

        showError: function (message) {
            const widget = $("weather-widget");
            const content = $("weather-content");
            if (!widget) return;

            widget.classList.add("error");
            widget.classList.remove("loading");
            if (content) content.style.display = "none";

            const errText = $("weather-error-text");
            if (errText) errText.textContent = message;
        },

        destroy: function () {
            if (this.updateInterval) clearInterval(this.updateInterval);
            this.updateInterval = null;
        }
    };

    // -----------------------------
    // LocationModalController
    // -----------------------------
    const LocationModalController = {
        modal: null,
        searchInput: null,
        searchResults: null,
        searchTimeout: null,

        init: function () {
            this.modal = $("location-modal");
            this.searchInput = $("location-search-input");
            this.searchResults = $("location-search-results");

            this.setupEventListeners();
            this.renderPopularCities();
            this.updateActiveOption();
        },

        setupEventListeners: function () {
            const weatherLocation = $("weather-location");
            const closeBtn = $("location-modal-close");
            const autoOpt = $("location-auto");
            const gpsOpt = $("location-gps");
            const retryBtn = $("weather-retry-btn");

            if (weatherLocation) {
                weatherLocation.addEventListener("click", () => this.open());
                weatherLocation.addEventListener("keydown", (e) => {
                    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); this.open(); }
                });
            }

            if (closeBtn) closeBtn.addEventListener("click", () => this.close());

            if (this.modal) {
                this.modal.addEventListener("click", (e) => {
                    if (e.target === this.modal) this.close();
                });
            }

            document.addEventListener("keydown", (e) => {
                if (e.key === "Escape" && this.modal && this.modal.classList.contains("open")) this.close();
            });

            if (autoOpt) {
                autoOpt.addEventListener("click", () => this.selectAuto());
                autoOpt.addEventListener("keydown", (e) => {
                    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); this.selectAuto(); }
                });
            }

            if (gpsOpt) {
                gpsOpt.addEventListener("click", () => this.selectGPS());
                gpsOpt.addEventListener("keydown", (e) => {
                    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); this.selectGPS(); }
                });
            }

            if (this.searchInput) {
                this.searchInput.addEventListener("input", (e) => {
                    clearTimeout(this.searchTimeout);
                    const q = e.target.value.trim();

                    if (q.length < 2) {
                        this.searchResults.innerHTML = "";
                        return;
                    }

                    this.searchResults.innerHTML = `<div class="location-search-loading">${I18n.t("locationSearching")}</div>`;
                    this.searchTimeout = setTimeout(() => this.performSearch(q), 300);
                });
            }

            if (retryBtn) {
                retryBtn.addEventListener("click", () => WeatherManager.fetchWeather());
            }
        },

        open: function () {
            if (!this.modal) return;
            this.modal.classList.add("open");
            this.modal.setAttribute("aria-hidden", "false");
            document.body.style.overflow = "hidden";
            this.updateActiveOption();
            if (this.searchInput) this.searchInput.focus();
        },

        close: function () {
            if (!this.modal) return;
            this.modal.classList.remove("open");
            this.modal.setAttribute("aria-hidden", "true");
            document.body.style.overflow = "";

            if (this.searchInput) this.searchInput.value = "";
            if (this.searchResults) this.searchResults.innerHTML = "";
        },

        updateActiveOption: function () {
            const autoOption = $("location-auto");
            const gpsOption = $("location-gps");
            if (!autoOption || !gpsOption) return;

            autoOption.classList.remove("active");
            gpsOption.classList.remove("active");

            if (LocationManager.locationType === "auto") autoOption.classList.add("active");
            if (LocationManager.locationType === "gps") gpsOption.classList.add("active");
        },

        selectAuto: async function () {
            const autoOpt = $("location-auto");
            const desc = $("location-auto-desc");
            if (desc) desc.textContent = I18n.t("locationDetecting");

            try {
                LocationManager.clearSavedLocation();
                await LocationManager.detectByIP();
                await WeatherManager.fetchWeather();
                this.updateActiveOption();
                this.close();
                safeToast("📍 " + (LocationManager.currentLocation?.label || ""), "success");
            } catch (e) {
                safeToast("❌ " + e.message, "error");
            } finally {
                if (desc) desc.textContent = I18n.t("locationAutoDesc");
            }
        },

        selectGPS: async function () {
            const desc = $("location-gps-desc");
            if (desc) desc.textContent = I18n.t("locationDetecting");

            try {
                await LocationManager.detectByGPS();
                await WeatherManager.fetchWeather();
                this.updateActiveOption();
                this.close();
                safeToast("📍 " + (LocationManager.currentLocation?.label || ""), "success");
            } catch (e) {
                safeToast("❌ " + e.message, "error");
            } finally {
                if (desc) desc.textContent = I18n.t("locationGPSDesc");
            }
        },

        performSearch: async function (query) {
            const results = await LocationManager.searchCity(query);
            if (!this.searchResults) return;

            if (results.length === 0) {
                this.searchResults.innerHTML = `<div class="location-search-empty">${I18n.t("locationNoResults")}</div>`;
                return;
            }

            this.searchResults.innerHTML = "";

            results.forEach((city) => {
                const item = document.createElement("div");
                item.className = "location-search-result";
                item.tabIndex = 0;
                item.innerHTML = `
          <div class="location-search-result-name">${city.name}</div>
          <div class="location-search-result-country">${city.admin ? city.admin + ", " : ""}${city.countryName || city.country}</div>
        `;

                const selectCity = () => {
                    LocationManager.setManualLocation(city);
                    WeatherManager.fetchWeather();
                    this.close();
                    safeToast("📍 " + city.label, "success");
                };

                item.addEventListener("click", selectCity);
                item.addEventListener("keydown", (e) => {
                    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); selectCity(); }
                });

                this.searchResults.appendChild(item);
            });
        },

        renderPopularCities: function () {
            const grid = $("location-popular-grid");
            if (!grid) return;
            grid.innerHTML = "";

            LocationManager.popularCities.forEach((city) => {
                const item = document.createElement("div");
                item.className = "location-popular-item";
                item.tabIndex = 0;
                item.textContent = city.name;

                const selectCity = () => {
                    LocationManager.setManualLocation({ ...city, label: `${city.name}, ${city.country}` });
                    WeatherManager.fetchWeather();
                    this.close();
                    safeToast("📍 " + `${city.name}, ${city.country}`, "success");
                };

                item.addEventListener("click", selectCity);
                item.addEventListener("keydown", (e) => {
                    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); selectCity(); }
                });

                grid.appendChild(item);
            });
        }
    };

    // -----------------------------
    // Public bootstrap (called by app.js)
    // -----------------------------
    async function initWidgetsAsync() {
        WidgetsUI.init();
        WidgetsUI.hide();

        I18n.init();
        DateTimeManager.init();

        try {
            await LocationManager.init();
            LocationModalController.init();
            WeatherManager.init(); // fetch begins; widgets shown on SUCCESS
        } catch (e) {
            console.warn("[Widgets] init error:", e.message);
            // keep hidden until weather success
        }
    }

    window.Widgets = {
        init: initWidgetsAsync,
        destroy: function () {
            DateTimeManager.destroy();
            WeatherManager.destroy();
        }
    };
})();