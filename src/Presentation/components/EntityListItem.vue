<template>
    <li class="list-item">
        <a class="is-success" :href="this.url">{{this.url}}</a>
        <span
                class="tag is-success"
                v-if="isConformant"
        >{{this.status}}</span>
        <ul class="list" v-if="hasErrors">
            <li class="list-item has-text-danger" v-for="error in this.errors">
                <span class="tag is-danger is-medium">{{error.type}}</span>:
                {{error.message}}
            </li>
        </ul>
    </li>
</template>

<script>
    import { ValidationStatus } from '../../Store/ValidationStatus';

    export default {
        name: 'EntityListItem',
        props: ['url', 'status', 'errors'],
        computed: {
            hasErrors() {
                return this.status === ValidationStatus.Nonconformant;
            },
            isConformant() {
                return this.status === ValidationStatus.Conformant;
            },
        },
    };
</script>

<style scoped>

</style>
