const customPlugin = {

    //1. add global method or property
    install:function (Vue,options) {
        Vue.myGlobalMethod = function () {
            alert('I am global method')
        }

        Vue.myCustomProperty = 'I am CUstom Property'

        // 2 add global asset
        Vue.directive('blue-color',{
            bind(el,binding){
                el.style.color = 'blue'
            }
        })

        //3. inject some component options, mixins
        Vue.mixin({
            data() {
                return {
                    custom_message:'RAAAWR'
                }
            },
            created() {
                console.log('Custom mixin created');
                    
            },
            methods: {
                scream(){
                    alert(this.custom_message)
                }
            },
        })

        // add an instance method or property
        Vue.prototype.$customMethod = function () {
            alert('I am custom instance method')
        }
    }

    
}

export default customPlugin