import { state } from './store';
import { computed, toRefs } from 'vue';
import { defaultConfig, defaultSize } from '../misc/default';
import isNil from 'lodash-es/isNil';

export default function useIcon(props: Record<string, unknown>): {} {
    const { isLeaf } = toRefs(props); 
        
    const config = state.config;

    const openedIcon = computed(() => {
        return config.value.openedIcon || defaultConfig.openedIcon;
    });

    const closedIcon = computed(() => {
        return config.value.closedIcon || defaultConfig.closedIcon;
    });

    const hasIcons = computed(() => {
        return !isNil(closedIcon.value) && !isNil(openedIcon.value);
    });

    const useIcons = computed(() => {
        return !isLeaf.value && hasIcons.value;
    });

    const fakeNodeStyle = computed(() => {
        return {
            width: `${defaultSize}px`,
            height: `${defaultSize}px`
        };
    });

    return {
        hasIcons,
        openedIcon,
        closedIcon,
        useIcons,
        fakeNodeStyle
    };
}