import type { App } from 'vue';

import QMessageBox from './src/QMessageBox.vue';

/* istanbul ignore next */
QMessageBox.install = (app: App): void => {
  app.component(QMessageBox.name, QMessageBox);
};

export type {
  QMessageBoxProps,
  QMessageBoxPropBeforeClose,
  QMessageBoxInstance
} from './src/types';
export default QMessageBox as SFCWithInstall<App, typeof QMessageBox>;
