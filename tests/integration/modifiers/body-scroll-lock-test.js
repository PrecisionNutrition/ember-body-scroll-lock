import { module, test, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Modifier | body-scroll-lock', function (hooks) {
  setupRenderingTest(hooks);

  test('locks body scroll', async function (assert) {
    await render(hbs`
      {{#if this.isRendered}}
        <div {{body-scroll-lock}}></div>
      {{/if}}
    `);

    const originalValue = 'scroll';
    document.body.style.overflow = originalValue;

    assert.dom(document.body).hasStyle({ overflow: originalValue });

    this.set('isRendered', true);
    await settled();

    assert.dom(document.body).hasStyle({ overflow: 'hidden' });

    this.set('isRendered', false);
    await settled();

    assert.dom(document.body).hasStyle({ overflow: originalValue });
  });

  test('locks body scroll with multiple elements', async function (assert) {
    await render(hbs`
      {{#if this.isFirstRendered}}
        <div {{body-scroll-lock}}></div>
      {{/if}}

      {{#if this.isSecondRendered}}
        <div {{body-scroll-lock}}></div>
      {{/if}}
    `);

    const originalValue = 'scroll';
    document.body.style.overflow = originalValue;

    assert.dom(document.body).hasStyle({ overflow: originalValue });

    this.set('isFirstRendered', true);
    await settled();

    assert.dom(document.body).hasStyle({ overflow: 'hidden' });

    this.set('isSecondRendered', true);
    await settled();

    assert.dom(document.body).hasStyle({ overflow: 'hidden' });

    this.set('isFirstRendered', false);
    await settled();

    assert.dom(document.body).hasStyle({ overflow: 'hidden' });

    this.set('isSecondRendered', false);
    await settled();

    assert.dom(document.body).hasStyle({ overflow: originalValue });
  });

  skip('reserveScrollBarGap option works', async function (assert) {
    await render(hbs`
      {{#if this.isRendered}}
        <div {{body-scroll-lock reserveScrollBarGap=true}}></div>
      {{/if}}
    `);

    const originalValue = '100px';
    document.body.style.paddingRight = originalValue;
    document.body.style.overflow = 'scroll';

    assert.dom(document.body).hasStyle({ 'padding-right': originalValue });

    this.set('isRendered', true);
    await settled();

    assert.dom(document.body).doesNotHaveStyle({ 'padding-right': originalValue });

    this.set('isRendered', false);
    await settled();

    assert.dom(document.body).hasStyle({ 'padding-right': originalValue });
  });

  skip('reserveScrollBarGap option works with two elements', async function (assert) {
    await render(hbs`
      {{#if this.isFirstRendered}}
        <div {{body-scroll-lock reserveScrollBarGap=true}}></div>
      {{/if}}

      {{#if this.isSecondRendered}}
        <div {{body-scroll-lock reserveScrollBarGap=true}}></div>
      {{/if}}
    `);

    const originalValue = '100px';
    document.body.style.paddingRight = originalValue;
    document.body.style.overflow = 'scroll';

    assert.dom(document.body).hasStyle({ 'padding-right': originalValue });

    this.set('isFirstRendered', true);
    await settled();

    assert.dom(document.body).doesNotHaveStyle({ 'padding-right': originalValue });

    this.set('isSecondRendered', true);
    await settled();

    assert.dom(document.body).doesNotHaveStyle({ 'padding-right': originalValue });

    this.set('isFirstRendered', false);
    await settled();

    assert.dom(document.body).doesNotHaveStyle({ 'padding-right': originalValue });

    this.set('isSecondRendered', false);
    await settled();

    assert.dom(document.body).hasStyle({ 'padding-right': originalValue });
  });
});
