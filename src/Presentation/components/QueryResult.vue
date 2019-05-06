<template>
<div>
    <ul>
        <li v-for="entity in entities">
            <a :href="entity">{{entity}}</a>
        </li>
    </ul>
</div>
</template>

<script>
    import {mapGetters} from 'vuex';
    export default {
        name: 'QueryResult',
        computed: {
            // mix the getters into computed with object spread operator
            ...mapGetters({
                entities: 'getQueryEntities',
            }),
        },
    };
</script>

<style scoped>

</style>
