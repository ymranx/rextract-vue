import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Header from './Header.vue'

describe('Header.vue', () => {
  it('renders correctly with user name', async () => {
    const wrapper = await mountSuspended(Header)
    
    // Check if the user name 'Imran Personal' is rendered
    expect(wrapper.text()).toContain('Imran Personal')
    
    // Check if the 'Admin' role is rendered
    expect(wrapper.text()).toContain('Admin')
  })
})
