<template>
    <div>
        <ul class="list">
            <li class="list-item" v-for="entity in entities">
                <a class="is-success" :href="entity.url">{{entity.url}}</a> <span class="is-warning"
                                                                                  v-if="entity.status">{{entity.status}}</span>
                <ul class="list" v-if="entity.errors">
                    <li class="list-item has-text-danger" v-for="error in entity.errors">
                        {{error.type}}: {{error.property}}
                    </li>
                </ul>
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
