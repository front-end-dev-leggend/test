<template >
  <div class="vx-col w-full mb-base" v-if="renderComponent">

    <edit-pharmacy :isSidebarActive="addNewDataSidebar" :newPharmacy="pharmacy" @closeSidebar="addNewDataSidebar = false" />
    <vx-card>
        <vs-tabs>
            <vs-tab :label="$t('pharmacy_data')">
               <div class="mt-3">
                 <vs-table pagination max-items="10" search :data="pharmcies">

                    <template slot="thead">
                      <vs-th sort-key="pharmacy_id">{{$t('id')}}</vs-th>
                      <vs-th sort-key="name">{{$t('name')}}</vs-th>
                      <vs-th sort-key="location_name">{{$t('location_name')}}</vs-th>

                      <vs-th sort-key="medicine">{{$t('medicine')}}</vs-th>
                      <vs-th sort-key="contact_tel">{{$t('contact_no')}}</vs-th>
                       <vs-th>{{$t('view')}}</vs-th>
                      <vs-th>{{$t("edit")}}</vs-th>
                      <vs-th>{{$t("delete")}}</vs-th>
                    </template>

                    <template slot-scope="{data}">
                      <vs-tr :key="index" v-for="(tr, index) in data">

                        <vs-td :data="tr.pharmacy_id" style="width:100px;">
                          {{tr.pharmacy_id}}
                        </vs-td>

                        <vs-td :data="tr.name">
                          {{ tr.name }}
                        </vs-td>

                        <vs-td :data="tr.location_name" width="300px">
                          {{ tr.location_name }}
                        </vs-td>

                        <vs-td :data="tr.medicine">
                          {{ tr.medicine }}
                        </vs-td>
                         <vs-td :data="tr.contact_tel">
                          {{ tr.contact_tel }}
                        </vs-td>
                        <vs-td>
                          <feather-icon icon="SearchIcon" class="cursor-pointer w-6 h-6" size="small"></feather-icon>

                        </vs-td>
                        <vs-td>
                          <feather-icon icon="EditIcon" class="cursor-pointer w-6 h-6" size="small" @click="pharmacy=tr;addNewDataSidebar=true"></feather-icon>
                        </vs-td>
                        <vs-td>
                          <feather-icon icon="Trash2Icon" class="cursor-pointer w-6 h-6" size="small" @click="delete_pharmacy(tr)"></feather-icon>
                        </vs-td>
                      </vs-tr>
                    </template>
                  </vs-table>
               </div>
            </vs-tab>
            <vs-tab :label="$t('pharmacy_register')">
              <div class="mt-3">

                <div class="vx-row">
                   <div class="vx-col md:w-1/2 mt-5">
                        <label>{{$t('pharmacy_name')}} <span class="require">*</span></label>
                        <vs-input v-model="newPharmacy.name" class="w-full" :danger="invalid.name" />
                        <div class="error" v-if="invalid.name">{{$t("pharmacy_name_alert")}}</div>
                    </div>
                    <div class="vx-col md:w-1/4 mt-5">
                        <label>{{$t('contact_name')}} </label>
                        <vs-input v-model="newPharmacy.contact_name" class="w-full" />
                    </div>
                    <div class="vx-col md:w-1/4 mt-5">
                        <label>{{$t('contact_no')}} </label>
                        <vs-input v-model="newPharmacy.contact_tel" class="w-full" />
                    </div>

                </div>
                <div class="vx-row">
                  <div class="vx-col md:w-1/3 w-full mt-5">
                        <label>{{$t('address')}}</label>
                        <vs-input v-model="newPharmacy.address" class="w-full" />
                    </div>
                    <div class="vx-col md:w-1/6 w-full mt-5">
                        <label>{{$t('province')}}</label>
                        <vs-select autocomplete class="w-full" v-model="newPharmacy.province">
                          <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in province_view" />
                        </vs-select>
                    </div>
                    <div class="vx-col md:w-1/6 w-full mt-5">
                        <label>{{$t('amphur')}}</label>
                        <vs-select autocomplete class="w-full" v-model="newPharmacy.amphur">
                          <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in amphurs" />
                        </vs-select>
                    </div>
                    <div class="vx-col md:w-1/6 w-full mt-5">
                        <label>{{$t('tambon')}}</label>
                        <vs-select autocomplete class="w-full" v-model="newPharmacy.tambon">
                          <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in tambon_view" />
                        </vs-select>
                        <!-- <vs-input type="text" :label="$t('tambon')"  v-model="newHospital.now_tambon" class="w-full" /> -->
                    </div>


                    <div class="vx-col md:w-1/6 w-full mt-5">
                        <label>{{$t('postcode')}}</label>
                        <vs-select autocomplete class="w-full" v-model="newPharmacy.postcode">
                          <vs-select-item :key="index" :value="item" :text="item" v-for="(item,index) in postcodes" />
                        </vs-select>
                        <!-- <vs-input type="text" :label="$t('postcode')"  v-model="newHospital.now_postcode" class="w-full" /> -->
                    </div>
                </div>

                <div class="vx-row">
                   <div class="vx-col md:w-1/2 mt-5">
                        <label>{{$t('medicine')}}</label>
                        <vs-textarea v-model="newPharmacy.medicine" class="w-full" />
                    </div>
                    <div class="vx-col md:w-1/2 mt-5">
                        <label>{{$t('medical_supply')}} </label>
                        <vs-textarea v-model="newPharmacy.medical_supply" class="w-full" />
                    </div>


                </div>

                <div class="vx-row">
                      <div class="vx-col md:w-1/2 mt-5">
                        <label>{{$t('medical_equipment')}} </label>
                        <vs-textarea v-model="newPharmacy.medical_equipment" class="w-full" />
                    </div>
                    <div class="vx-col md:w-1/2 mt-5">
                        <label>{{$t('disaster_equipment')}} </label>
                        <vs-textarea v-model="newPharmacy.disaster_equipment" class="w-full" />
                    </div>
                </div>
                 <div class="vx-row">
                   <div class="vx-col md:w-1/2 mt-5">
                        <label>{{$t('remark')}}</label>
                        <vs-input v-model="newPharmacy.remark" class="w-full" />
                    </div>
                    <div class="vx-col md:w-1/4 mt-5">
                        <label>{{$t('lat')}}</label>
                        <vs-input v-model="newPharmacy.lat" class="w-full" disabled />
                    </div>
                    <div class="vx-col md:w-1/4 mt-5">
                        <label>{{$t('lon')}}</label>
                        <vs-input v-model="newPharmacy.lon" class="w-full" disabled />
                    </div>
                </div>
              </div>
              <div class="mt-3">
                <div class="vx-row" style="margin-top:20px">
                  <vl-map :load-tiles-while-animating="true" :load-tiles-while-interacting="true" style="height: 400px"  @click="myfunc($event)">
                    <vl-view :zoom.sync="zoom" :center.sync="center" :rotation.sync="rotation"></vl-view>

                    <vl-layer-tile id="osm">
                      <vl-source-osm></vl-source-osm>
                    </vl-layer-tile>

                    <vl-overlay v-if="isSelectCoordinate" id="overlay" :position="overlayCoordinate">
                      <template slot-scope="scope">
                        <div class="overlay-content">
                          <p v-if="false">{{scope}}</p>
                          <img :src="require(`@/assets/marker.png`)" alt="content-img" style="width:50px;height:50px;margin-top:-50px;margin-left:-25px;">
                        </div>
                      </template>
                    </vl-overlay>
                  </vl-map>
                </div>
              </div>
              <div class="mt-3">

                <div class="vx-row">
                    <div class="vx-col w-full mt-5">

                       <vs-button color="danger" type="border">{{$t('cancel')}}</vs-button>
                      <vs-button ref="loadableButton" id="button-with-loading" class="vs-con-loading__container" vslor="primary" @click="save">{{$t('save')}}</vs-button>
                    </div>
                </div>
              </div>
            </vs-tab>

        </vs-tabs>
    </vx-card>
  </div>
  <!-- <button>click</button> -->
</template>
<style lang="scss" scoped>
  button{
    float:right;
    margin-right:10px;
  }
  .require{
    color: red;
  }
  .vdp-datepicker input {
    padding: .7rem;
    font-size: 1rem;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    color: #626262;
    width: 100%;
  }
  .danger input {
    padding: .7rem;
    font-size: 1rem;
    border-radius: 5px;
    border: 1px solid red;
    color: #626262;
    width: 100%;
  }
   .error{
    color:red;
     font-size:80%;
  }
</style>


<script>
import Datepicker from 'vuejs-datepicker';
import service from '@/service/service';
import EditPharmacy from './extra-components/EditPharmacy.vue'
export default {
  components: {
    EditPharmacy,
    Datepicker
  },
   data(){
      return {
        zoom: 8,
        submitted:false,
        center: [100.6037284, 13.6768896],
        rotation: 0,
        isSelectCoordinate:false,
        overlayCoordinate: [],
        pharmcies:[],
        renderComponent:true,
        addNewDataSidebar: false,
        submitted:false,
        locations:[],
        tambons:[],
        provinces:[],
        newPharmacy:{},
        pharmacy:{},
         'tableList': [
        'vs-th: Component',
        'vs-tr: Component',
        'vs-td: Component',
        'thread: Slot',
        'tbody: Slot',
        'header: Slot'
      ],


      }
   },

   computed:{
     lang(){
       return this.$i18n.locale;
     },
     amphurs(){
       var temps= this.locations.map((item)=>{
          if(this.$i18n.locale=='th'){
            return JSON.stringify({value:item.en_amphur,text:item.th_amphur})
         }else{
            return JSON.stringify({ value:item.en_amphur,text:item.en_amphur})
         }
       });
       return temps.filter((x, i, a) => a.indexOf(x) == i).map((item)=>{
         return JSON.parse(item);
       })
     },
     province_view(){
       if(this.$i18n.locale=='th'){
         return this.provinces.map((item)=>{
            return { value:item.en_province,text:item.th_province}
          })
       }else{
         return this.provinces.map((item)=>{
           return { value:item.en_province,text:item.en_province}
         })
       }
     },
     tambon_view(){
       var temps= this.tambons.map((item)=>{
          if(this.$i18n.locale=='th'){
            return JSON.stringify({value:item.en_tambon,text:item.th_tambon})
         }else{
            return JSON.stringify({ value:item.en_tambon,text:item.en_tambon})
         }
       });
       return temps.filter((x, i, a) => a.indexOf(x) == i).map((item)=>{
         return JSON.parse(item);
       })
     },
     postcodes(){
       return this.locations.filter((item)=>item.en_amphur==this.newPharmacy.amphur&&item.en_tambon==this.newPharmacy.tambon).map((item)=>item.postcode)
     },
    now_province(){
       return this.newPharmacy.province;
     },
     now_amphur(){
       return this.newPharmacy.amphur;
     },
     invalid(){
       var c=type=>{
         return this.submitted&&this.newPharmacy[type]=="";
       };
       return {name:c("name")}
     },
     isInvalid(){
       return this.invalid.name;
     }
   },
   created(){
     this.getData();
     this.initValue();
     service.getExternalData("get_province").then((result)=>{
            console.log(result);
            if(!result.code){

              this.provinces=JSON.parse(JSON.stringify(result.data).replace(/\:null/gi, "\:\"\""));
              console.log("province",this.provinces);

            }else{
              this.$swal(result.message,'','error')
            }
          },err=>{
            this.$swal('connection error','','error')
            console.log(err);
          })
   },
   methods: {
     initValue(){
          this.newPharmacy=JSON.parse('{"pharmacy_id":"","name":"","address":"","tambon":"","amphur":"","province":"","postcode":"","contact_name":"","contact_tel":"","medicine":"","medical_supply":"","medical_equipment":"","disaster_equipment":"","remark":"","lat":"","lon":""}')
     },
     myfunc(e){
        console.log(e);
        this.overlayCoordinate=e.coordinate;
        this.newPharmacy.lon=this.overlayCoordinate[0];
        this.newPharmacy.lat=this.overlayCoordinate[1];
        this.isSelectCoordinate=true;
      },
     getData(){
       service.getData("/get_pharmacy").then((result)=>{
       console.log(result);
       if(!result.code){
         this.pharmcies= JSON.parse(JSON.stringify(result.data).replace(/\:null/gi, "\:\"\""));
         this.pharmcies.map((item)=>{
           item.location_name=item.address+ " "+ item.tambon+" "+ item.amphur+" "+item.province+" "+item.postcode;
           return item;
         })
       }
     })
     },
     save(){
          this.submitted=true;
          if(!this.isInvalid){
            this.$vs.loading({
                  background: this.backgroundLoading,
                  color: this.colorLoading,
                  container: "#button-with-loading",
                  scale: 0.45
            })

            service.postData('add_pharmacy',this.newPharmacy).then((result)=>{
              this.$vs.loading.close("#button-with-loading > .con-vs-loading")
              if(!result.code){
                this.submitted=false;
                this.initValue(),
                this.getData();
                this.forceRerender();
              }else{
                this.$swal(result.message,'','error');
              }
            },err=>{
              this.$vs.loading.close("#button-with-loading > .con-vs-loading")
              this.$swal('connection error','','error');
            })
          }
      },
      delete_pharmacy(pharmacy){
       this.$swal({
          title:this.$t('delete_pharmacy_title'),
          text: this.$t('delete_text'),
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText:this.$t('cancel'),
          confirmButtonText:this.$t('confirm_delete'),
          showLoaderOnConfirm: true,
          preConfirm:()=>{
            return service.deleteData(`delete_pharmacy?pharmacy_id=${pharmacy.pharmacy_id}`).then((result)=>{

              return result;
            },err=>{
              return {code:true,message:"connection error"}
            })

          }
        }).then((result) => {
          if(result.value){
             if(!result.value.code){
                this.$swal(
                  this.$t('deleted'),
                  '',
                  'success'
                ).then(result=>{
                   this.getData();
                })
              }else{
                this.$swal(result.value.message,'','error');
              }
          }

        })
     },
      forceRerender() {
        // Remove my-component from the DOM
        this.renderComponent = false;

        this.$nextTick(() => {
          // Add the component back in
          this.renderComponent = true;
        });
      },

    },
  watch: {
        addNewDataSidebar(val){
          if(val==false){
            this.getData();
          }
        },
        locale(val) {
            this.$i18n.locale = val;
            alert(val);
        },
        now_province(val){
          service.getExternalData('/get_location?province='+val).then((result)=>{
            if(!result.code){
              this.locations=result.data;
            }
          },err=>{
            console.log(err);
          })
        },
        now_amphur(val){
          this.tambons=this.locations.filter((item)=>item.en_amphur==val);
        },

    }
}
</script>

