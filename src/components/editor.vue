<template>
    <div>
        <div>
            <iframe style="border: 0"  scrolling="no" name="editor" :width="width" :height="height"
                    :src="url">
            </iframe>
        </div>    
    </div>
</template>


<script>
    import config from '../config/config';
    export default {
        data() {
            return {
                height: '0px',
                url: config.editor_url,
                // url:'http://localhost:8081/',
                content:this.value
            }
        },
        props: {
            width: {
                type: String,
                default: '100%'
            },
            article_id:{
                type:String,
                default:''
            },
            type:{
                type:String,
                default:''
            },
            sn:{
                type:String,
                default:''
            },
            saveKey:{
                type:Boolean,
                default:false
            }
        },
        watch:{
            saveKey(){
                if(this.saveKey){
                    //发送保存事件
                    window.frames['editor'].postMessage({
                        'event': 'save'
                    }, '*')
                }
            }
        },
        methods: {
            //高度改变事件
            changeBox(height){
                this.height=height;
            },        
            //编辑器准备完毕
            editorReady(text_content) {              
                window.frames['editor'].postMessage({
                    'event': 'byValues',
                    'data': {
                        sid:this.$ls.get("ws-token"),
                        article_id:this.article_id,
                        type:this.type,
                        sn:this.sn
                    }
                }, '*')
            },
            //处理保存事件
            save(status){
                if(status){
                    this.$emit("saveSuccess");
                }else{
                    this.$emit("saveError");
                }
                this.$emit("save");
            },
        },
        mounted() {
            //组件挂在到实例后调用
            window.addEventListener('message', (d) => {
                let data = d.data;                            
                switch (data.event) {   
                    //检测到准备完毕事件
                    case 'ready':
                    if(data.data.ready){
                        this.editorReady();
                    }
                    // 检测到高度改变事件             
                    case 'changeBox':
                    this.changeBox(data.data.height);
                    break;
                    // 检测到获取草稿事件
                    case 'getManuscript':
                    this.$emit("getManuscript",data.data.articleId);
                    break;
                    // // 检测到保存事件
                    case 'save':
                    this.save(data.data.status);
                    break;
                }
            })

        },
    }
</script>
