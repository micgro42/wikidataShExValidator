<template>
    <div>
        <label for="ShExC">ShExC</label>
        <textarea
                rows="50"
                cols="72"
                name="ShExC"
                id="ShExC"
                v-on:change="ShExChanged"
        ></textarea>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';

    export default {
        name: 'ShExCInput',
        methods: {
            ...mapActions({
                updateShExCInStore: 'setShExC',
            }),
            ShExChanged(event) {
                this.updateShExCInStore(event.target.value);
            },
        },
    };
</script>

<style scoped>

</style>
