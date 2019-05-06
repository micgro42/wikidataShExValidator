<template>
    <div>
        <QueryInput/>
        <QueryResult/>
    </div>
</template>

<script>
    import QueryInput from './QueryInput';
    import QueryResult from './QueryResult';

    export default {
        name: 'QueryWrapper',
        components: {QueryResult, QueryInput},
    };
</script>

<style scoped>

</style>
