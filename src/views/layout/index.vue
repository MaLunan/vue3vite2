<template>
    <div class="about">
        <v-header />
        <v-sidebar />
        <div class="content-box" :class="{ 'content-collapse': collapse }">
            <v-tags></v-tags>
            <div class="content">
                <router-view v-slot="{ Component }">
                    <transition name="move" mode="out-in">
                        <keep-alive :include="tagsList">
                            <component :is="Component" />
                        </keep-alive>
                    </transition>
                </router-view>
                <el-backtop target=".content"></el-backtop>
            </div>
        </div>
    </div>
</template>
<script>
import vHeader from "com/Header/index.vue";
import vSidebar from "com/Sidebar/index.vue";
import vTags from "com/tags/index.vue";
import { computed } from 'vue';
import { useStore } from 'vuex';
export default {
    components: {
        vHeader,
        vSidebar,
        vTags
    },
    setup(){
        let store=useStore()
        let tagsList=computed(()=>{
            return store.state.tagsList.map(item => item.name);
        })
        let collapse=computed(()=>{
            return store.state.collapse
        })
        return {tagsList,collapse}
    }
};
</script>
