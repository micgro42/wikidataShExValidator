<template>
    <div>
        <label
                for="ShExC"
                class="label"
        >ShExC</label>
        <textarea
                rows="10"
                :class="textareaClass"
                cols="72"
                name="ShExC"
                id="ShExC"
                v-on:change="ShExChanged"
        ></textarea>
        <div v-if="error.message">
            <ShExCErrors/>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';
    import ShExCErrors from './ShExCErrors';

    export default {
        name: 'ShExCInput',
        components: {ShExCErrors},
        methods: {
            ...mapActions({
                updateShExCInStore: 'setShExC',
            }),
            ShExChanged(event) {
                this.updateShExCInStore(event.target.value);
            },
        },
        computed: {
            // mix the getters into computed with object spread operator
            ...mapGetters({
                error: 'getShExCParseError',
            }),
            textareaClass() {
                let className = 'textarea';
                if (this.$store.getters.getShExCParseError) {
                    className += ' is-danger';
                }

                return className;
            },

        },
    };
</script>

<style scoped>

</style>
