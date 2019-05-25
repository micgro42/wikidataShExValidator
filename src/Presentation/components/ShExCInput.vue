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
        <div v-if="parseStatus === 'INVALID'">
            <ShExCErrors/>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';
    import { ShExCParseStatus } from '../../Store/ShExCParseStatus';
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
                parseStatus: 'getShExCParseStatus',
            }),
            textareaClass() {
                let className = 'textarea';
                switch (this.$store.getters.getShExCParseStatus) {
                    case ShExCParseStatus.none:
                        break;
                    case ShExCParseStatus.invalid:
                        className += ' is-danger';
                        break;
                    case ShExCParseStatus.valid:
                        className += ' is-success';
                        break;
                    case ShExCParseStatus.inProgress:
                        className += 'is-warning';
                        break;
                    default:
                        throw new Error('Unknown parse status: ' + this.$store.getters.getShExCParseStatus);
                }

                return className;
            },

        },
    };
</script>

<style scoped>

</style>
