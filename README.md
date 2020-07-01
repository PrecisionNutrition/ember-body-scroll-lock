# {{body-scroll-lock}} modifier

<p>
  <a href="https://github.com/PrecisionNutrition/ember-body-scroll-lock/actions?query=workflow%3ACI" target="_blank" rel="noopener noreferrer">
    <img src="https://github.com/PrecisionNutrition/ember-body-scroll-lock/workflows/CI/badge.svg" alt="CI status">
  </a>

  <a href="https://www.npmjs.com/package/ember-body-scroll-lock" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/npm/v/ember-body-scroll-lock?color=informational" alt="NPM version" />
  </a>
</p>

Disables body scroll when a target element is rendered and enables it back when the element is removed.

It keeps the target element scrollable, which is useful for components like modals that can have their own scrollbar. It can also prevent a distracting layout shift effect (caused by scrollbar width compensation), when the scrollbar appears and disappears.

**Features:**

- disables body scroll WITHOUT breaking scroll of a target element
- works with everything (iOS, Android, desktop Safari/Chrome/Firefox/...)
- can reserve scrollbar width to prevent layout shift effect

**Also:**

- it doesn't reset the body scroll position
- it doesn't break momentum-based scrolling on iOS

Example:

```handlebars
<div
  class="modal"
  tabindex="-1"
  ...attributes
  {{body-scroll-lock reserveScrollBarGap=true}}
  {{on "keydown" (handle-keys @onClose "Escape")}}
>
  {{yield}}
</div>
```

## Installation

```
ember install ember-body-scroll-lock
```

The modifier relies on a tiny ([1KB gzipped](https://bundlephobia.com/result?p=body-scroll-lock)) library - [body-scroll-lock](https://github.com/willmcpo/body-scroll-lock).

## Usage

Add the `{{body-scroll-lock}}` modifier to an element that should lock body scroll when rendered. It should be the element you want to persist scrolling for (NOT a parent of that element). It is also the element to apply the CSS `-webkit-overflow-scrolling: touch` for preserving momentum-based scrolling on iOS.

`reserveScrollBarGap` option (default: `false`) - When set, it prevents a distracting layout shift effect (caused by scrollbar width compensation), when the scrollbar appears and disappears. It works by adding `padding-right` with scrollbar width to the body element. When the target element is removed the `padding-right` is automatically reset to the original value.

Example of using `{{body-scroll-lock}}` for a modal:

```hbs
{{#in-element (query-selector "#modal-portal")}}
  <div
    class="modal"
    tabindex="-1"
    ...attributes
    {{focus-trap}}
    {{body-scroll-lock reserveScrollBarGap=true}}
    {{on "keydown" (handle-keys @onClose "Escape" stopPropagation=true)}}
  >
    {{yield}}
  </div>
{{/in-element}}
```

For more options, read [body-scroll-lock docs](https://github.com/willmcpo/body-scroll-lock/blob/master/README.md#options).

## Compatibility

- Ember.js v3.12 or above
- Ember CLI v2.13 or above
- Node.js v10 or above

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).
