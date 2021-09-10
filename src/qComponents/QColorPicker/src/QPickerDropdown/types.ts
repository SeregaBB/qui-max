import type { Ref, ComputedRef } from 'vue';

import type { Nullable } from '#/helpers';

import type { ColorFormat } from '../types';

export type QPickerDropdownPropColorFormat = ColorFormat;

export interface QPickerDropdownProps {
  isShown: Nullable<boolean>;
  isClearBtnShown: Nullable<boolean>;
  color: Nullable<string>;
  colorFormat: QPickerDropdownPropColorFormat;
  alphaShown: Nullable<boolean>;
}

export interface QPickerDropdownInstance {
  t: (key: string) => string;
  dropdown: Ref<Nullable<HTMLElement>>;
  saturation: Ref<number>;
  value: Ref<number>;
  hue: Ref<number>;
  alpha: Ref<number>;
  tempColor: Ref<string>;
  rgbString: ComputedRef<string>;
  updateHSVA: (newValue: string) => void;
  closeDropdown: (e: KeyboardEvent | MouseEvent) => void;
  handleClearBtnClick: () => void;
  handleConfirmBtnClick: () => void;
}