import App from './App.vue';
import { createApp } from 'vue';

import 'vant/lib/index.css';
import { Loading, Lazyload, Grid, GridItem, Tabbar, TabbarItem } from 'vant';
import { Row, Col, Empty, Image, Button, Divider, ConfigProvider } from 'vant';

import 'element-plus/dist/index.css';
import { ElBacktop, ElScrollbar, ElInfiniteScroll } from 'element-plus';
import { ElRow, ElCol, ElCard, ElImage, ElButton, ElDivider } from 'element-plus';

import store from './store';
import router from './router';

const app = createApp(App);

app.use(store);
app.use(router);

app.use(Loading);
app.use(Lazyload);
app.use(Grid);
app.use(GridItem);
app.use(Tabbar);
app.use(TabbarItem);

app.use(Row);
app.use(Col);
app.use(Empty);
app.use(Image);
app.use(Button);
app.use(Divider);
app.use(ConfigProvider);

app.use(ElDivider);
app.use(ElBacktop);
app.use(ElScrollbar);
app.use(ElInfiniteScroll);

app.use(ElRow);
app.use(ElCol);
app.use(ElCard);
app.use(ElImage);
app.use(ElButton);

app.mount('#app');
