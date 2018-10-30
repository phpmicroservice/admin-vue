import Vue from 'vue';
import lodash from 'lodash';
import Hashes from 'jshashes';
let hashMD5 = new Hashes.MD5

export default {
    get(key,de=null) {
        let new_key =hashMD5.hex(key);
        return Vue.ls.get(new_key,de);
    },
    set(key, value, expire = null, tags=[]) {
        if(tags.length>0){
            tags.push('buffer');
        }    
        let new_key =hashMD5.hex(key);
        this.tag_set(new_key,tags);
        return Vue.ls.set(new_key,value,expire);
    },
    remove(key) {
        let new_key =hashMD5.hex(key);
        return  Vue.ls.remove(new_key);
    },
    /**
     * 标签设置
     * @param key
     * @param tag
     */
    tag_set(key,tags){
        if(tags.length ==0){
            // 空数组 没有标签
            return true;
        }
        // 存在标签
        // console.log('tags',tags,key);
        for(let tag of tags) {
            // 读取旧的标签信息
            let jiu =this.get('t_'+tag,[]);
            jiu.push(key);
            let new39  =lodash.uniqWith(jiu, lodash.isEqual);
            this.set('t_'+tag,new39);
        }
    },
    /**
     *
     * @param tag_key
     */
    remove_tag(tag_key) {
        let $ket_list=this.get('t_'+tag_key);
        // console.log('$ket_list',$ket_list);
        for(let key of $ket_list) {      
            Vue.ls.remove(key);
        }
    },
    /**
     * 获取标签信息
     * @param {string} tag_key 
     */
    get_tag(tag_key){
           return  this.get('t_'+tag_key);
    }
};