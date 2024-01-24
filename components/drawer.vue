<script setup>
const links = [{
    label: 'Home',
    icon: 'i-ph-house-duotone',
    to: '/'
}, {
    label: 'Password Generator',
    icon: 'i-ph-magic-wand-duotone',
    to: '/passwordGenerator'
}, {
    label: 'Settings',
    icon: 'i-ph-gear-duotone',
    to: '/settings'
}]
</script>

<template>
    <UVerticalNavigation :links="links" />
</template>

