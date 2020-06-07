import { modifier } from 'ember-modifier';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

export default modifier(function bodyScrollLock(element, _, options) {
  disableBodyScroll(element, options);
  return () => enableBodyScroll(element);
});
