export function bindCombobox(
  input: HTMLInputElement,
  list: HTMLElement,
  options?: { onSelect?: (value: string) => void; filter?: (query: string, option: HTMLElement) => boolean },
): () => void;
export function initComboboxes(root?: ParentNode): () => void;
