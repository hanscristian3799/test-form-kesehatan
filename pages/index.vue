<template>
  <v-app style="background: #ffe899">
    <v-main>

      <div class="mx-5 my-3">

        <v-card fluid fill-height>
          <v-layout>
            <v-flex xs12>
              <v-card>
                <div class="amber">&nbsp;</div>
                <v-card-text> 
                  <v-layout align-center>
                    <v-flex>
                      <h3 class="display-1 black--text">Form Deklarasi Kesehatan Maybank Finance</h3>
                      <p class="red--text">*Required</p>
                    </v-flex>
                  </v-layout>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-card>

        <v-form
          ref="form"
          :value="valid" 
        >
          <v-card class="mt-5">
            <div class="pa-5">
              <v-layout>
                <v-flex>
                  <p>Name / Nama<label class="red--text">*</label> </p>
                  <v-text-field 
                    color="amber"
                    single-line
                    label="Nama"
                    :value="nama"
                    @input="changeNama"
                    required
                    :rules="[v => !!v || 'Mohon isi field ini']"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </div>
          </v-card>

          <v-card class="mt-5">
            <div class="pa-5">
              <v-flex>
                <p>Cabang / Kantor<label class="red--text">*</label> </p>
                <v-autocomplete
                  :items="listCabang"
                  single-line
                  :value="cabang"
                  label="Cabang/Kantor"
                  item-text="city"
                  @change="changeCabang"
                  :disabled="listCabang.length == 0"
                  required
                  :rules="[v => !!v || 'Mohon isi field ini']"
                ></v-autocomplete>
              </v-flex>
            </div>
          </v-card>

          <v-card class="mt-5">
            <div class="pa-5">
              <v-layout>
                <v-flex> 
                  <p>Phone Number / Nomor Telepon / HP<label class="red--text">*</label> </p>
                  <v-text-field 
                    color="amber"
                    single-line
                    label="Nomor Telepon"
                    :value="telepon"
                    required
                    @input="changeTelepon"
                    type="number"
                    :rules="[v => !!v || 'Mohon Diisi', (v) => v && v.length >= 7 || 'Panjang No Telepon Harus Lebih Besar dari 6', (v) => v && v.length <= 14 || 'Panjang No Telepon Harus Lebih Kecil dari 14']"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </div>
          </v-card>

          <v-card class="mt-5">
            <div class="pa-5">
              <v-layout>
                <v-flex> 
                  <p>Email Address / Alamat Email<label class="red--text">*</label> </p>
                  <v-text-field 
                    color="amber"
                    single-line
                    label="Email"
                    :value="email"
                    required
                    @input="changeEmail"
                    :rules="[v => !!v || 'Mohon Diisi', v => /.+@.+\..+/.test(v) || 'E-mail tidak valid',]"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </div>
          </v-card>

          <v-card class="mt-5">
            <div class="pa-5">
              <v-layout>
                <v-flex>
                  <p>Meetup with / Bertemu Dengan<label class="red--text">*</label> </p>
                  <v-radio-group :value="meetup" :mandatory="false" class="black--text" @change="changeMeetupValue" :rules="[v => !!v || 'Mohon Diisi']">
                    <v-radio color="amber" label="Customer Service (CS)" value="Customer Service"></v-radio>
                    <v-radio color="amber" label="Tim Collection" value="Tim Collection"></v-radio>
                    <v-radio color="amber" label="Tim Marketing" value="Tim Marketing"></v-radio>
                    <v-radio color="amber" label="Receptionist" value="Receptionist"></v-radio>
                    <v-radio color="amber" label="Management MIF" value="Management MIF"></v-radio>
                    <v-radio color="amber" label="Admin / ADH" value="Admin/ADH"></v-radio>
                    <v-row align="center" no-gutters>
                      <v-radio ref="others" @click="setFocus" color="amber" value="Others" label="Others: " hide-details class="shrink mr-2"></v-radio>
                      <v-text-field @input="setToCurrentradio" ref="reason" dense color="amber" :rules="reason_rules" :value="reason_desc"></v-text-field>
                    </v-row>
                  </v-radio-group>
                </v-flex>
              </v-layout>
            </div>
          </v-card>

          <v-card class="mt-5">
            <div class="pa-5">
              <v-layout>
                <v-flex>
                  <p>Apakah Anda sehat?<label class="red--text">*</label> </p>
                  <v-radio-group @change="changeSehat" :value="sehat" :mandatory="false" class="black--text" :rules="[v => !!v || 'Mohon Diisi']">
                    <v-radio color="amber" label="Ya" value=1></v-radio>
                    <v-radio color="amber" label="Tidak" value=0></v-radio>
                  </v-radio-group>
                </v-flex>
              </v-layout>
            </div>
          </v-card>
          
          <v-card class="mt-5">
            <div class="pa-5">
              <v-layout>
                <v-flex>
                  <p>Apakah dalam satu minggu terakhir Anda memiliki kontak langsung dengan keluarga, kerabat, atau orang yang memiliki gejala flu (batuk/pilek/nyeri tenggorokan/sesak nafas)?<label class="red--text">*</label> </p>
                  <v-radio-group @change="changeKontak" :value="kontak" :mandatory="false" class="black--text" :rules="[v => !!v || 'Mohon Diisi']">
                    <v-radio color="amber" label="Ya" value=0></v-radio>
                    <v-radio color="amber" label="Tidak" value=1></v-radio>
                  </v-radio-group>
                </v-flex>
              </v-layout>
            </div>
          </v-card>

          <v-card class="mt-5">
            <div class="pa-5">
              <v-layout>
                <v-flex>
                  <p>Apakah dalam satu minggu terakhir Anda mengalami demam dengan suhu badan diatas 37,5 derajat celcius?<label class="red--text">*</label> </p>
                  <v-radio-group @change="changeSuhu" :value="suhu" :mandatory="false" class="black--text" :rules="[v => !!v || 'Mohon Diisi']">
                    <v-radio color="amber" label="Ya" value=0></v-radio>
                    <v-radio color="amber" label="Tidak" value=1></v-radio>
                  </v-radio-group>
                </v-flex>
              </v-layout>
            </div>
          </v-card>

          <v-card class="mt-5">
            <div class="pa-5">
              <v-layout>
                <v-flex>
                  <p>Apakah Anda tinggal serumah dengan orang dalam pemantauan, pasien dalam pengawasan, atau orang yang telah terkonfirmasi COVID-19?<label class="red--text">*</label> </p>
                  <v-radio-group @change="changePdp" :value="tinggalpdp" :mandatory="false" class="black--text" :rules="[v => !!v || 'Mohon Diisi']">
                    <v-radio color="amber" label="Ya" value=0></v-radio>
                    <v-radio color="amber" label="Tidak" value=1></v-radio>
                  </v-radio-group>
                </v-flex>
              </v-layout>
            </div>
          </v-card>

          <v-card class="mt-5">
            <div class="pa-5">
              <v-layout>
                <v-flex>
                  <p>Apakah Anda tinggal serumah dengan orang yang sedang mengalami batuk/pilek/nyeri tenggorokan/sesak nafas?<label class="red--text">*</label> </p>
                  <v-radio-group @change="changeBatuk" :value="tinggalbatuk" :mandatory="false" class="black--text" :rules="[v => !!v || 'Mohon Diisi']">
                    <v-radio color="amber" label="Ya" value=0></v-radio>
                    <v-radio color="amber" label="Tidak" value=1></v-radio>
                  </v-radio-group>
                </v-flex>
              </v-layout>
            </div>
          </v-card>

          <v-card class="mt-5">
            <div class="pa-5">
              <v-layout>
                <v-flex>
                  <p>Deklarasi<label class="red--text">*</label> </p>
                  <v-checkbox class="black--text" color="amber" :rules="[v => !!v || 'Mohon Dicentang']" :value="checkbox" label="Saya menyatakan diri saya dalam keadaan sehat, tidak demam, tidak flu atau batuk dan sesak nafas ringan; dan tidak dalam pemantauan COVID-19">
                  </v-checkbox>
                </v-flex>
              </v-layout>
            </div>
          </v-card>

        </v-form>

        <v-btn @click="submit" color="yellow darken-4 white--text" class="mt-5">Submit</v-btn>

      </div>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios';
export default { 
  data(){
    return{
      tinggalpdp: null,
      tinggalbatuk: null,
      nama: null,
      email: null,
      telepon: null,
      meetup: null, 
      sehat: null, 
      kontak: null, 
      suhu: null,
      checkbox: false,
      valid: false,
      reason_desc: null,
      reason_rules: [v => !!v || 'Mohon isi field ini'],
      cabang: null,
      listCabang: [
        "Cabang Tangerang", "Head Office dan Cabang Jakarta Pusat", "SPU Gorontalo", 	
        "Cabang Manado", "Cabang Makassar",	"Cabang Banjarmasin", "Cabang Balikpapan", "Cabang Samarinda", 	
        "SPU Pontianak", "SPU Palangkaraya", "SPU Lombok","SPU Jember", "Cabang Denpasar", "Cabang Malang", 
        "Cabang Surabaya", "Cabang Solo", "Cabang Yogyakarta", "Cabang Semarang", "SPU Purwokerto", 
        "Cabang Cirebon", "Cabang Bandung","Cabang Karawang", "Cabang Bogor", "Cabang Depok","SPU Cikarang", 
        "Cabang Cibubur", "Cabang Bekasi", "SPU Cilegon", "Cabang Bintaro", "Cabang Jakarta Selatan", 
        "Cabang Jakarta Barat", "Cabang Jakarta Utara", "Cabang Lampung", "Cabang Bangka", "Cabang Palembang", 	
        "Cabang Jambi", "Cabang Batam", "SPU Duri", "Cabang Pekanbaru", "Cabang Padang", "Cabang Medan", 
        "Cabang Aceh"
      ]
    }
  },
  methods: {
    changeNama(value) {
      this.nama = value;
    },
    changeCabang(value){
      this.cabang = value;
    },
    changeEmail(value){
      this.email = value;
    },
    changeTelepon(value) {
      this.telepon = value; 
    },
    changeMeetupValue(value){
      if(value === "Others") {
        this.reason_rules = [v => !!v || 'Mohon isi field ini'];
      }else{
        this.reason_rules = [];
      }
      this.meetup = value;
    }, 
    changeSehat(value) {
      this.sehat = value;
    },
    changeKontak(value) {
      this.kontak = value;
    },
    changeSuhu(value) {
      this.suhu = value;
    },
    changePdp(value){
      this.tinggalpdp = value;
    },
    changeBatuk(value){
      this.tinggalbatuk = value;
    },
    setFocus(){
      if (!this.reason_desc) {
        this.reason_rules = [v => !!v || 'Mohon isi field ini'];
      }
      this.$nextTick(() => this.$refs.reason.focus());
    },
    setToCurrentradio(event){
      if (event == "") {
        this.reason_rules = [v => !!v || 'Mohon isi field ini'];
      }
      this.meetup = "Others";
      this.reason_desc = event;
    },
    submit(){
      this.valid = this.$refs.form.validate();
      if (this.valid) {
        let totalScore = parseInt(this.tinggalpdp) + parseInt(this.tinggalbatuk) + 
        parseInt(this.sehat) + parseInt(this.suhu) + parseInt(this.kontak);
        
        this.$store.commit('store/setNama', this.nama);
        this.$store.commit('store/setTelepon', this.telepon);
        this.$store.commit('store/setEmail', this.email);
        this.$store.commit('store/setCabang', this.cabang);
        this.$store.commit('store/setMeetup', this.meetup);
        if (this.meetup == "Others") {
          this.$store.commit('store/setReason', this.reason_desc);
        }
        this.$store.commit('store/setTotalScore', totalScore);
        this.$router.push('/hasil');
      }else{
        console.log("not valid");
      }
    }
  }
}
</script>

<style scoped>
  .black--text /deep/ label {
      color: black;
  }
  ::v-deep input::-webkit-outer-spin-button,
  ::v-deep input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
</style>
 	
	
