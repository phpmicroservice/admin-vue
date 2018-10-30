<template>
    <div>
        <template v-for="(item, index) in menuList">
            <div style="text-align: center;" :key="index">
                <Dropdown transfer v-if="item.children.length !== 1" placement="right-start" :key="index" @on-click="changeMenu">
                    <Button style="width: 70px;margin-left: -5px;padding:10px 0;" type="text">
                        <Icon v-if="item.native_icon" :size="20" :color="iconColor" :type="item.icon"></Icon>
                        <i v-else :class="[item.icon]" :style="{'color':iconColor}"></i> 
                    </Button>
                    <DropdownMenu style="width: 200px;" slot="list">
                        <template v-for="(child, i) in item.children">
                            <DropdownItem :name="child.name" :key="i">
                                <Icon v-if="child.native_icon" :type="child.icon"></Icon>
                                <i v-else :class="[child.icon]"></i> 
                                <span style="padding-left:10px;">{{ itemTitle(child) }}</span>
                            </DropdownItem>
                        </template>
                    </DropdownMenu>
                </Dropdown>
                <Dropdown transfer v-else placement="right-start" :key="index" @on-click="changeMenu">
                    <Button @click="changeMenu(item.children[0].name)" style="width: 70px;margin-left: -5px;padding:10px 0;" type="text">
                        <Icon v-if="item.native_icon" :size="20" :color="iconColor" :type="item.children[0].icon || item.icon"></Icon>
                        <i v-else-if="item.children[0].icon" :class="[item.children[0].icon]" :style="{'color':iconColor}"></i>
                        <i v-else :class="[item.icon]" :style="{'color':iconColor}"></i>
                    </Button>
                    <DropdownMenu style="width: 200px;" slot="list">
                        <DropdownItem :name="item.children[0].name" :key="'d' + index">
                            <Icon v-if="item.native_icon" :type="item.children[0].icon || item.icon"></Icon>
                            <i v-else-if="item.children[0].icon" :class="[item.children[0].icon]"></i>
                            <i v-else :class="[item.icon]" :key="'menuicon' + item.name"></i> 
                            <span style="padding-left:10px;">{{ itemTitle(item.children[0]) }}</span>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </template>
    </div>
</template>

<script>
export default {
    name: 'sidebarMenuShrink',
    props: {
        menuList: {
            type: Array
        },
        iconColor: {
            type: String,
            default: 'white'
        },
        menuTheme: {
            type: String,
            default: 'darck'
        }
    },
    methods: {
        changeMenu (active) {
            this.$emit('on-change', active);
        },
        itemTitle (item) {
            if (typeof item.title === 'object') {
                return this.$t(item.title.i18n);
            } else {
                return item.title;
            }
        }
    }
};
</script>
<style lang="less">
@import '../../../../styles/css/font-awesome.css';
</style>
