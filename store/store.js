export const state = () => ({
    nama: null,
    telepon: null,
    cabang: null,
    meetup: null, 
    reason_desc: null,
    totalScore: null
});

export const mutations = {
    setNama(state, payload){
        state.nama = payload;
    },
    setCabang(state, payload){
        state.cabang = payload;
    },
    setTelepon(state, payload){
        state.telepon = payload;
    },
    setMeetup(state, payload){
        state.meetup = payload;
    },
    setReason(state, payload){
        state.reason_desc = payload;
    },
    setTotalScore(state, payload){
        state.totalScore = payload;
    }
}