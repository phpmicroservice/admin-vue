import Vue from 'vue';
import formModal from './formModal';
import delModal from './delModal';
import editor from './editor';
const components = {
    formModal,
    delModal,
    editor
}
const myComponents = {
    install: function(Vue){
        for(let i in components){
            Vue.component(i,components[i]);
        }
    }
}
export default myComponents
