import { Component, ComputedRef, Ref } from 'vue';

import type { Nullable } from '#/helpers';

import type { QDialogEvent, QDialogOptions } from '../types';

export interface QDialogComponent {
  component: Component;
  props?: { [propName: string]: unknown };
  listeners?: { [listenerEvent: string]: (...args: unknown[]) => void };
}

export type QDialogContainerPropContent = Component | QDialogComponent;

export interface QDialogContainerProps extends QDialogOptions {
  content: QDialogContainerPropContent;
}

export interface QDialogContainerInstance {
  dialog: Ref<Nullable<HTMLElement>>;
  zIndex: Ref<number>;
  isShown: Ref<boolean>;
  dialogStyle: ComputedRef<Record<string, Nullable<string | number>>>;
  containerStyle: ComputedRef<Record<string, Nullable<string | number>>>;
  afterEnter: () => void;
  afterLeave: () => void;
  closeDialog: (event: QDialogEvent) => Promise<void>;
  handleCloseClick: () => void;
  handleWrapperClick: () => void;
  preparedContent: ComputedRef<QDialogComponent>;
}

export type QDialogContainerPropBeforeClose = Nullable<
  (hide: () => void) => void
>;
export type QDialogContainerPropTeleportTo = Nullable<string | HTMLElement>;