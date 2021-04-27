<template>
    <div class="tags" v-if="showTags">
        <ul>
            <li
                class="tags-li"
                v-for="(item,index) in tagsList"
                :class="{'active': isActive(item.path)}"
                :key="index"
            >
                <router-link :to="item.path" class="tags-li-title">{{item.title}}</router-link>
                <span class="tags-li-icon" @click="closeTags(index)">
                    <i class="el-icon-close"></i>
                </span>
            </li>
        </ul>
        <!-- <div class="tags-close-box">
            <el-dropdown @command="handleTags">
                <el-button size="mini" type="primary">
                    标签选项
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <template #dropdown>
                    <el-dropdown-menu size="small">
                        <el-dropdown-item command="other">关闭其他</el-dropdown-item>
                        <el-dropdown-item command="all">关闭所有</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div> -->
    </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter,onBeforeRouteUpdate } from 'vue-router';
export default {
    setup(){
        let route=useRoute()
        let router=useRouter()
        let store=useStore()
        let tagsList=computed(()=>{
            return store.state.tagsList
        })
        let showTags=computed(()=>{
            return tagsList.value.length>0
        })
        function isActive(path) {
            return path === route.fullPath;
        }
        // 关闭单个标签
        function closeTags(index) {
            const delItem = tagsList.value[index];
            store.commit("delTagsItem", { index });
            const item = tagsList.value[index]
                ? tagsList.value[index]
                : tagsList.value[index - 1];
            if (item) {     
                delItem.path === route.fullPath &&
                    router.push(item.path);
            } else {
                router.push("/");
            }
        }
        // 关闭全部标签
        function closeAll() {
            store.commit("clearTags");
            router.push("/");
        }
        // 关闭其他标签
        function closeOther() {
            const curItem = tagsList.value.filter(item => {
                return item.path === route.fullPath;
            });
            store.commit("closeTagsOther", curItem);
        }
        // 设置标签
        function setTags(r) {
            const isExist = tagsList.value.some(item => {
                return item.path === r.fullPath;
            });
            if (!isExist) {
                if (tagsList.value.length >= 8) {
                    store.commit("delTagsItem", { index: 0 });
                }
                store.commit("setTagsItem", {
                    name: r.name,
                    title: r.meta.title,
                    path: r.fullPath
                });
            }
        }
        function handleTags(command) {
            command === "other" ? closeOther() : closeAll();
        }
        setTags(route);
        onBeforeRouteUpdate((to,from)=>{
           setTags(to);
        })
        onMounted(()=>{
            // console.log(route)
            
        })
        
      return {
          setTags,
          isActive,
          closeTags,
          tagsList,
          showTags,
          closeAll,
          closeOther,
          handleTags}  
    }
    
};
</script>


<style>
.tags {
    position: relative;
    height: 30px;
    overflow: hidden;
    background: #ffffff;
    padding-right: 120px;
    box-shadow: 0 5px 10px #e2dfdf;
}

.tags ul {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
}

.tags-li {
    float: left;
    margin: 3px 5px 2px 3px;
    border-radius: 3px;
    font-size: 12px;
    overflow: hidden;
    cursor: pointer;
    height: 23px;
    line-height: 23px;
    border: 1px solid #d2ddfc;
    background: #4fa1e9;
    padding: 0 5px 0 12px;
    vertical-align: middle;
    color: #303133;
    -webkit-transition: all 0.3s ease-in;
    -moz-transition: all 0.3s ease-in;
    transition: all 0.3s ease-in;
}

.tags-li:not(.active):hover {
    background: #0996f3;
}

.tags-li.active {
    color: #050505;;
}

.tags-li-title {
    float: left;
    max-width: 80px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-right: 5px;
    color: #666;
}

.tags-li.active .tags-li-title {
    color: #050505;;
}

.tags-close-box {
    position: absolute;
    right: 0;
    top: 0;
    box-sizing: border-box;
    padding-top: 1px;
    text-align: center;
    width: 110px;
    height: 30px;
    background: #fff;
    box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1);
    z-index: 10;
}
</style>
