<template>
  <div id="app">
    <div class="button">
      <button @click="selectedCity(city)" v-for="(city, key) in cityList" :key="key">
        {{ city }}
      </button>
    </div>
    <div>
      <h1>{{ this.activeCity }}</h1>
      <router-link :to="{path: `/in/${this.activeCity}`}">Подробнее</router-link>

      <div class="item">
        <h3>Сейчас</h3>
        <img :src="getImage(prepareWeather.near.icon)">
        <p>Температура {{prepareWeather.near.temp}} C</p>
        <p>{{prepareWeather.near.description}}</p>
      </div>
      <div class="item">
        <h3>Завтра</h3>
        <h5>День</h5>
        <img :src="getImage(prepareWeather.tomorrow.day.icon)">
        <p>Температура {{prepareWeather.tomorrow.day.temp}} C</p>
        <p>{{prepareWeather.tomorrow.day.description}}</p>
        <h5>Ночь</h5>
        <img :src="getImage(prepareWeather.tomorrow.night.icon)">
        <p>Температура {{prepareWeather.tomorrow.night.temp}} C</p>
        <p>{{prepareWeather.tomorrow.night.description}}</p>

      </div>
      <div class="item">
        <h3>Послезавтра</h3>
        <h5>День</h5>
        <img :src="getImage(prepareWeather.dayAfterTomorrow.day.icon)">
        <p>Температура {{prepareWeather.dayAfterTomorrow.day.temp}} C</p>
        <p>{{prepareWeather.dayAfterTomorrow.day.description}}</p>
        <h5>Ночь</h5>
        <img :src="getImage(prepareWeather.tomorrow.night.icon)">
        <p>Температура {{prepareWeather.dayAfterTomorrow.day.temp}} C</p>
        <p>{{prepareWeather.dayAfterTomorrow.day.description}}</p>
      </div>

    </div>
    <router-view></router-view>
  </div>
</template>

<script>

import axios from "axios";
import config from "../config";

export default {
  name: 'Weather',
  components: {},
  mounted() {
    this.getForecast();
  },
  data() {
    return {
      activeCity: localStorage.city || 'Минск',
      cityList: ['Минск', 'Москва', 'Братислава'],
      weather: null,
      fullWeather: null,
      prepareWeather: null,
    }
  },
  computed: {

  },
  methods: {
    getImage(icon) {
      return `https://openweathermap.org/img/wn/${icon}@2x.png`
    },
    infoWeather() {
      const year = new Date().getFullYear();
      const month = new Date().getMonth() + 1;
      const day = new Date().getDate();

      const data = {
        near: this.weather[1],

        tomorrow: {
          day: this.weather.filter((item) => {
            return item.timestamp === new Date(`${year}-${month}-${day + 1} 03:00:00`).getTime() / 1000
          })[0],
          night: this.weather.filter((item) => {
            return item.timestamp === new Date(`${year}-${month}-${day + 1} 15:00:00`).getTime() / 1000
          })[0],
        },

        dayAfterTomorrow: {
          day: this.weather.filter((item) => {
            return item.timestamp === new Date(`${year}-${month}-${day + 2} 03:00:00`).getTime() / 1000
          })[0],
          night: this.weather.filter((item) => {
            return item.timestamp === new Date(`${year}-${month}-${day + 2} 15:00:00`).getTime() / 1000
          })[0],
        },


      }

      this.prepareWeather = data;

    },

    selectedCity(city) {
      localStorage.setItem('city', city);
      this.activeCity = city;
      this.getForecast();
    },
    getForecast() {
      console.log(this.activeCity);
      axios.get(`http://localhost:8080/data/2.5/forecast?q=${this.activeCity}&appid=${config.app_key}&lang=ru&units=metric`,)
          .then((response) => {
            this.fullWeather = response.data.list;
            this.weather = response.data.list.map((item) => {
              return {
                timestamp: item.dt,
                date: new Date(item.dt_txt),
                temp: item.main.temp,
                description: item.weather[0].description,
                icon: item.weather[0].icon,
              }
            })
            this.infoWeather();
          })
    }
  },
}
</script>

<style>
#app {
  background-color: #7AA899;
}
.button {
  display: flex;
  justify-content: center;
}

.item {
  border: 2px solid cadetblue;
  padding: 2px;
}

</style>
