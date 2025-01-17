<template>
  <transition
    name="q-fade-up"
    @after-leave="handleAfterLeave"
  >
    <div
      v-show="isShown"
      ref="messageBox"
      class="q-message-box-container"
      :class="wrapClass"
      :style="[wrapStyle, { zIndex }]"
      tabindex="-1"
      @keyup.esc="emitCloseEvent"
    >
      <div class="q-message-box-container__shadow" />

      <q-scrollbar
        theme="secondary"
        class="q-message-box-container__scrollbar"
        view-class="q-message-box-container__view"
        visible
      >
        <div
          v-if="closeOnClickShadow"
          class="q-message-box-container__clickable-shadow"
          @click="emitCloseEvent"
        />

        <div class="q-message-box-container__container">
          <button
            type="button"
            class="q-message-box-container__close q-icon-close"
            @click="emitCloseEvent"
          />

          <component
            :is="preparedContent.component"
            v-bind="preparedContent.props"
            v-on="preparedContent.listeners"
            @done="closeBox"
          />
        </div>
      </q-scrollbar>
    </div>
  </transition>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  computed,
  onMounted,
  nextTick,
  onBeforeUnmount
} from 'vue';
import type { PropType } from 'vue';

import QScrollbar from '@/qComponents/QScrollbar';
import { getConfig } from '@/qComponents/config';
import type { Nullable } from '#/helpers';

import { QMessageBoxContent } from '../QMessageBoxContent';
import { QMessageBoxAction } from '../constants';
import type { QMessageBoxEvent } from '../types';

import { isExternalComponent, isInternalComponent } from './utils';
import type {
  QMessageBoxComponent,
  QMessageBoxContainerPropContent,
  QMessageBoxContainerPropWrapClass,
  QMessageBoxContainerPropWrapStyle,
  QMessageBoxContainerProps,
  QMessageBoxContainerInstance
} from './types';

const REMOVE_EVENT = 'remove';
const DONE_EVENT = 'done';

export default defineComponent({
  name: 'QMessageBoxContainer',
  componentName: 'QMessageBoxContainer',

  components: {
    QScrollbar
  },

  props: {
    content: {
      type: [Object, Function] as PropType<QMessageBoxContainerPropContent>,
      required: true
    },
    /**
     * whether QMessageBox can be closed by clicking the mask
     */
    closeOnClickShadow: {
      type: Boolean,
      default: true
    },
    /**
     * whether to distinguish canceling and closing the QMessageBox
     */
    distinguishCancelAndClose: {
      type: Boolean,
      default: false
    },
    /**
     * class list of the QMessageBox
     */
    wrapClass: {
      type: [
        String,
        Object,
        Array
      ] as PropType<QMessageBoxContainerPropWrapClass>,
      default: null
    },
    /**
     * style list of the QMessageBox
     */
    wrapStyle: {
      type: [
        String,
        Object,
        Array
      ] as PropType<QMessageBoxContainerPropWrapStyle>,
      default: null
    }
  },

  emits: [DONE_EVENT, REMOVE_EVENT],

  setup(props: QMessageBoxContainerProps, ctx): QMessageBoxContainerInstance {
    const instance = getCurrentInstance();

    const isShown = ref<boolean>(false);
    const messageBox = ref<Nullable<HTMLElement>>(null);
    const zIndex = getConfig('nextZIndex');

    const preparedContent = computed<QMessageBoxComponent>(() => {
      if (isExternalComponent(props.content)) {
        return {
          props: {},
          listeners: {},
          ...props.content
        };
      }

      if (isInternalComponent(props.content)) {
        return {
          component: QMessageBoxContent,
          props: props.content,
          listeners: {}
        };
      }

      return {
        component: props.content,
        props: {},
        listeners: {}
      };
    });

    const elementToFocusAfterClosing: Nullable<HTMLElement> =
      document.activeElement as Nullable<HTMLElement>;

    const handleAfterLeave = (): void => {
      ctx.emit(REMOVE_EVENT);
    };

    const handleDocumentFocus = (e: FocusEvent): void => {
      const messageBoxValue = messageBox.value;
      if (
        messageBoxValue &&
        !messageBoxValue.contains(e.target as HTMLElement)
      ) {
        messageBoxValue.focus();
      }
    };

    const closeBox = async ({
      action,
      payload = null
    }: QMessageBoxEvent): Promise<void> => {
      ctx.emit(DONE_EVENT, { action, payload });

      isShown.value = false;

      await nextTick();

      document.removeEventListener('focus', handleDocumentFocus, true);
      elementToFocusAfterClosing?.focus();
    };

    const emitCloseEvent = (): void => {
      closeBox({
        action: props.distinguishCancelAndClose
          ? QMessageBoxAction.close
          : QMessageBoxAction.cancel
      });
    };

    onMounted(async () => {
      document.body.appendChild(instance?.vnode.el as Node);
      document.documentElement.style.overflow = 'hidden';
      document.addEventListener('focus', handleDocumentFocus, true);

      await nextTick();
      isShown.value = true;
      await nextTick();
      messageBox.value?.focus();
    });

    onBeforeUnmount(() => {
      document.documentElement.style.overflow = '';
    });

    return {
      messageBox,
      zIndex,
      isShown,
      preparedContent,
      closeBox,
      emitCloseEvent,
      handleAfterLeave
    };
  }
});
</script>
