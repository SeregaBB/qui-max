import type { App } from 'vue';

import type { SFCWithInstall } from '#/helpers';

import QPopover from './src/QPopover.vue';

/* istanbul ignore next */
QPopover.install = (app: App): void => {
  app.component(QPopover.name, QPopover);
};

export type { QPopoverProps, QPopoveInstance } from './src/types';
export default QPopover as SFCWithInstall<App, typeof QPopover>;
