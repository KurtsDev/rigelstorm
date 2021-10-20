import Vue from 'vue';
import VueRouter from 'vue-router';
import FullWeather from '../components/FullWeather';
import Weather from '../components/Weather';
import NotFound from "../components/NotFound";

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'main',
            component: Weather
        },
        {
            path: '/in/:city',
            component: FullWeather,
        },
        {
            path: '/notfound',
            name: 'notfound',
            component: NotFound,
        }
    ],
});