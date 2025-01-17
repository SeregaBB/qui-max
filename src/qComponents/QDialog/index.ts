import type { App } from 'vue';

import type { SFCWithInstall } from '#/helpers';

import QDialog from './src/QDialog.vue';

/* istanbul ignore next */
QDialog.install = (app: App): void => {
  app.component(QDialog.name, QDialog);
};

export type { QDialogProps, QDialogInstance } from './src/types';
export default QDialog as SFCWithInstall<App, typeof QDialog>;
