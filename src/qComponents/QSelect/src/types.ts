import type { Ref, ComputedRef, ComponentPublicInstance, UnwrapRef } from 'vue';
import type { Instance as PopperInstance } from '@popperjs/core';
import type { Composer } from 'vue-i18n';

import type {
  QOptionModel,
  QOptionPropModelValue
} from '@/qComponents/QOption';
import type { QScrollbarInstance } from '@/qComponents/QScrollbar';
import type { QInputInstance } from '@/qComponents/QInput';

type QSelectPropModelValue = Nullable<
  | string
  | number
  | QOptionPropModelValue
  | (string | number | QOptionPropModelValue)[]
>;

type NewOption = {
  value: QSelectPropModelValue;
  key: QSelectPropModelValue;
  preparedLabel: string | number;
};

interface QSelectInstance {
  input: Ref<Nullable<ComponentPublicInstance<UnwrapRef<QInputInstance>>>>;
  tags: Ref<Nullable<ComponentPublicInstance<UnwrapRef<QSelectTagsInstance>>>>;
  dropdown: Ref<
    Nullable<ComponentPublicInstance<UnwrapRef<QSelectDropdownInstance>>>
  >;
  root: Ref<Nullable<HTMLElement>>;
  state: QSelectState;
  preparedPlaceholder: ComputedRef<Nullable<string>>;
  visibleOptionsCount: ComputedRef<number>;
  isCanLoadMoreShown: ComputedRef<Nullable<boolean>>;
  showEmptyContent: ComputedRef<boolean>;
  isReadonly: ComputedRef<Nullable<boolean>>;
  isDisabled: ComputedRef<boolean>;
  isClearBtnShown: ComputedRef<Nullable<boolean>>;
  iconClass: ComputedRef<string>;
  emptyText: ComputedRef<string>;
  isNewOptionShown: ComputedRef<Nullable<boolean>>;
  popperInit: () => void;
  showPopper: () => void;
  hidePopper: () => void;
  handleFocus: (event: MouseEvent) => void;
  handleBlur: (event: MouseEvent) => void;
  clearSelected: () => void;
  getValueIndex: (
    arr: (string | number | QOptionPropModelValue)[] | undefined,
    optionValue: string | number | QOptionPropModelValue
  ) => number;
  toggleOptionSelection: (option: QOptionModel) => void;
  emitValueUpdate: (value: QSelectPropModelValue) => void;
  toggleMenu: () => void;
  handleEnterKeyUp: () => void;
  onInputChange: () => void;
  deleteTag: (tag: QOptionModel) => void;
  t: Composer['t'];
}

interface QSelectProvider {
  toggleMenu: () => void;
  toggleOptionSelection: (option: QOptionModel) => void;
  setSelected: () => void;
  addOption: (optionInstance: QOptionModel) => void;
  removeOption: (optionInstance: QOptionModel) => void;
  updateHoverIndex: (index: number) => void;
  state: Partial<QSelectState>;
  multipleLimit: Ref<Nullable<number>>;
  filterable: Ref<Nullable<boolean>>;
  collapseTags: Ref<Nullable<boolean>>;
  isDisabled: ComputedRef<boolean>;
  autocomplete: Ref<Nullable<'on' | 'off'>>;
  valueKey: Ref<Nullable<string>>;
  remote: Ref<Nullable<boolean>>;
  multiple: Ref<Nullable<boolean>>;
  modelValue: Ref<QSelectPropModelValue>;
}

interface QSelectProps {
  selectAllShown: Nullable<boolean>;
  selectAllText: Nullable<string>;
  loadMoreText: Nullable<string>;
  filterable: Nullable<boolean>;
  collapseTags: Nullable<boolean>;
  autocomplete: Nullable<'on' | 'off'>;
  multiple: Nullable<boolean>;
  modelValue: Nullable<QSelectPropModelValue>;
  placeholder: Nullable<string>;
  disabled: Nullable<boolean>;
  canLoadMore: Nullable<boolean>;
  loading: Nullable<boolean>;
  loadingText: Nullable<string>;
  noMatchText: Nullable<string>;
  noDataText: Nullable<string>;
  allowCreate: Nullable<boolean>;
  clearable: Nullable<boolean>;
  remote: Nullable<boolean>;
  valueKey: Nullable<string>;
  multipleLimit: Nullable<number>;
}

interface QSelectState {
  options: QOptionModel[];
  selected: Nullable<QOptionModel | NewOption | (QOptionModel | NewOption)[]>;
  inputWidth: number;
  selectedLabel: string | number;
  hoverIndex: number;
  query: string;
  hover: boolean;
  menuVisibleOnFocus: boolean;
  popper: Nullable<PopperInstance>;
  isDropdownShown: boolean;
}

interface QSelectDropdownInstance {
  zIndex: Ref<number>;
  styles: ComputedRef<Record<string, Nullable<string | number>>>;
  isVisibleOptionExist: ComputedRef<boolean>;
  areAllSelected: ComputedRef<boolean>;
  isIndeterminate: ComputedRef<boolean>;
  navigateDropdown: (e: KeyboardEvent) => void;
  handleSelectAllClick: () => void;
  root: Ref<Nullable<HTMLDivElement>>;
  multiple: Ref<Nullable<boolean>> | boolean;
  scrollbar: Ref<
    Nullable<ComponentPublicInstance<UnwrapRef<QScrollbarInstance>>>
  >;
  qSelectState: Partial<Nullable<QSelectState>>;
}

interface QSelectDropdownProps {
  shown: Nullable<boolean>;
  selectAllShown: Nullable<boolean>;
  selectAllText: Nullable<string>;
  showEmptyContent: Nullable<boolean>;
  emptyText: Nullable<string>;
  isCanLoadMoreShown: Nullable<boolean>;
  loadMoreText: Nullable<string>;
  isNewOptionShown: Nullable<boolean>;
  width: Nullable<number>;
}

interface QSelectTagsInstance {
  filterable: Ref<Nullable<boolean> | boolean>;
  collapseTags: Ref<Nullable<boolean> | boolean>;
  isDisabled: Ref<Nullable<boolean> | boolean>;
  autocomplete: Ref<Nullable<string>>;
  selected: Ref<QSelectState['selected'] | undefined>;
  query: Ref<string | undefined>;
  handleBackspaceKeyDown: () => void;
  handleTagClose: (option: Nullable<QOptionModel[]>) => void;
  handleInput: (event: KeyboardEvent) => void;
  input: Ref<Nullable<HTMLInputElement>>;
}

export {
  QOptionPropModelValue,
  QSelectPropModelValue,
  NewOption,
  QSelectInstance,
  QSelectProps,
  QSelectProvider,
  QSelectState,
  QSelectDropdownInstance,
  QSelectDropdownProps,
  QSelectTagsInstance
};