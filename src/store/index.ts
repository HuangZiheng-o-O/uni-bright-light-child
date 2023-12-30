import {defineStore, acceptHMRUpdate } from "pinia";

const useStore =  defineStore('main',{
    persist: {
      key: 'main',
        paths: ['account', 'childId', 'volunteerId', 'activeTab', 'token']
    },
    state: ()=>{
        return{
            account: '',
            childId: '',
            childName: '',
            volunteerId: '',
            volunteerName: '',
            taskId: '',
            activeTab: 0,
            token: '',
            loveProjectId: '',
            itemDetailID: '',
            itemDetailPointRequied: '',
            itemDetailName: ''
        }
    },
    getters:{

    },
    actions: {
        setActiveTab(tab: number){
            this.activeTab = tab;
        }
    }
})

export default useStore

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot))
}
