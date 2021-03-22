import { App } from 'vue';
import QPagination from './src/QPagination.vue';

/* istanbul ignore next */
QPagination.install = (app: App): void => {
  app.component(QPagination.name, QPagination);
};

export default QPagination;