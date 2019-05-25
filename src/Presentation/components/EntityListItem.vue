<template>
    <li class="list-item">
        <a class="is-success" :href="this.url">{{this.url}}</a>
        <span
                class="is-warning"
                v-if="this.status"
        >{{this.status}}</span>
        <ul class="list" v-if="hasErrors">
            <li class="list-item has-text-danger" v-for="error in this.errors">
                {{error.type}}: {{error.property}}
            </li>
        </ul>
    </li>
</template>

<script>
    import {ValidationStatus} from '../../Store/ValidationStatus';

    export default {
        name: 'EntityListItem',
        props: ['url', 'status', 'errors'],
        computed: {
            hasErrors() {
                return this.status === ValidationStatus.Nonconformant;
            },
        },
    };
</script>

<style scoped>

</style>
