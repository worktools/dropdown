export let checkIfDomTreeContains = (a: HTMLElement, b: HTMLElement): boolean => {
  if (a === b) {
    return true;
  }
  if (b == null) {
    return false;
  }
  return checkIfDomTreeContains(a, b.parentElement);
};
