import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import TheWelcome from '../TheWelcome.vue'

describe('TheWelcome', () => {
  it('renders properly', () => {
    const wrapper = mount(TheWelcome, { props: { msg: '127.0.0.1:8000' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
