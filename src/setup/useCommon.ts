import INodeProps from "@/structure/INodeProps";
import _ from "lodash";
import { computed, Ref, ToRefs, toRefs, ref, HtmlHTMLAttributes } from 'vue';
import { state } from './store';
import IUseCommon from '../structure/IUseCommon';
import { INode } from "@/structure/INode";
import { defaultConfig } from '../misc/default';
import { inputEvents } from "@/misc/nodeEvents";

export default function useCommon(props: INodeProps, emit: (event: string, ...args: any[]) => void): IUseCommon {
    const { node } = toRefs(props);

    const config = state.config;

    const wrapper = ref<HTMLElement>(null);

    // ensure state exist
    if (_.isNil(node.value.state)) {
        node.value.state = {};
    }

    const hasNode = computed(() => {
        return !_.isNil(node);
    });

    const hasConfig = computed(() => {
        return !_.isNil(config.value);
    });

    const hasState = computed(() => {
        return hasNode.value && !_.isNil(node.value.state);
    });

    const disabled = computed(() => {
        return config.value.disabled || node.value.state.disabled;
    });

    const editable = computed(() => {
        return config.value.editable && 
        (node.value.state.editable ? node.value.state.editable : true) || defaultConfig.editable;
    });

    const editing = computed(() => {
        return editable.value && (config.value.editing === node.value.id);
    })

    const blur = ((e: MouseEvent) => {
        const current = e.currentTarget as HTMLElement;
        const related = e.relatedTarget as HTMLElement;

        if (!current.contains(related)) {
            config.value.editing = null;
            emit(inputEvents.blur, e, node.value);
        }
    });

    return {
        node, 
        config,
        hasNode,
        hasState,
        hasConfig,
        disabled,
        wrapper,
        editable,
        editing,
        blur
    };
}