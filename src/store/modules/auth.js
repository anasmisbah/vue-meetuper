export default {
    namespaced:true,
    actions:{
        loginWithEmailAndPassword ({state,commit},form) {
            console.log(form); 
        },
        registerUser({state,commit},form){
            console.log(form);
        }
    }

}