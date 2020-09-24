<template>
   <v-app style="background: #ffe899">
           <v-container fluid fill-height class="pa-5">
                <v-layout row wrap align-center>
                <v-flex xs12 >
                <v-card class="pa-3" align="center" justify="center">
                    <v-layout align-center>
                    <v-flex>
                        <h2>{{ nama }}</h2>
                        <h2>{{ telepon }}</h2>
                        <h2>{{ email }}</h2>
                        <h2>Cabang : {{ cabang }}</h2> 
                        <h2 v-if="meetup != 'Others'">Bertemu Dengan: {{ meetup }}</h2> 
                        <h2 v-else>Bertemu Dengan: {{ reason }}</h2>
                        <h3 v-if="isLulus" class="display-1 green--text">Anda lulus Screening</h3>
                        <h3 v-else class="display-1 red--text">Anda Tidak Lulus Screening</h3>
                        <h3 class="black--text">Terima Kasih</h3> 
                        </v-flex>
                    </v-layout>
                </v-card>
                </v-flex>
                </v-layout>
           </v-container>
   </v-app>
</template>

<script>
export default {
    data(){
        return {
            isLulus : null
        }
    },
    computed: {
        nama(){
          return this.$store.state.store.nama;
        },
        telepon(){
          return this.$store.state.store.telepon;
        },
        email(){
          return this.$store.state.store.email;
        },
        cabang(){
          return this.$store.state.store.cabang;
        },
        meetup(){
          return this.$store.state.store.meetup;
        },
        reason(){
            return this.$store.state.store.reason_desc;
        },
        totalScore(){
          return this.$store.state.store.totalScore;
        },
    },
    methods: {
       
    },
    created(){
        if(this.totalScore == 5){
                this.isLulus = true;
        }else{
            this.isLulus = false;
        }
    }
}
</script>
