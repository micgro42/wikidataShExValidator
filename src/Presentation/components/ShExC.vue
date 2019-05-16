<template>
    <div class="ShExCWrapper">
        <ShExCInput/>
    </div>
</template>

<script>
    import bulma from 'bulma/css/bulma.css';
    import ShExCInput from './ShExCInput';
    import ShExCErrors from './ShExCErrors';

    export default {
        name: 'ShExC',
        components: {ShExCErrors, ShExCInput},
    };
</script>

<style scoped>
</style>
