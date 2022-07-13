<script setup lang="ts">
    interface Props {
        dark_theme?: boolean
        width?: string
    }

    const { dark_theme = true, width = "24px" } = defineProps<Props>()
</script>

<template>
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="chevron-down" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
    </svg>
</template>

<style scoped lang="scss">
    .chevron-down {
        @if v-bind(dark_theme) {
            fill: $text-color-dark;
        } @else {
            fill: $text-color-light;
        }

        width: v-bind(width);
    }
</style>
