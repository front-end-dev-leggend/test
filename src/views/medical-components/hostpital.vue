<template >
  <div class="vx-col w-full mb-base" v-if="renderComponent">

    <edit-hospital :isSidebarActive="addNewDataSidebar" :newHospital="hospital" @closeSidebar="addNewDataSidebar = false" />
    <vx-card>
        <vs-tabs>
            <vs-tab :label="$t('hospital_data')">
               <div class="mt-3">
                 <vs-table pagination max-items="10" search :data="hospitals">

                    <template slot="thead">
                      <vs-th sort-key="hospital_id">{{$t('id')}}</vs-th>
                      <vs-th sort-key="hospital_name">{{$t('hospital_name')}}</vs-th>
                      <vs-th sort-key="type_name">{{$t('type_name')}}</vs-th>
                      <vs-th sort-key="tel">{{$t('tel')}}</vs-th>
                       <vs-th>{{$t('view')}}</vs-th>
                      <vs-th>{{$t("edit")}}</vs-th>
                      <vs-th>{{$t("delete")}}</vs-th>
                    </template>

                    <template slot-scope="{data}">
                      <vs-tr :data="tr" :key="index" v-for="(tr, index) in data">

                        <vs-td :data="tr.hospital_id">
                          {{tr.hospital_id}}
                        </vs-td>

                        <vs-td :data="tr.hospital_name">
                          {{ tr.hospital_name }}
                        </vs-td>

                        <vs-td :data="tr.type_name">
                          {{ tr.type_name}}
                        </vs-td>

                        <vs-td :data="tr.tel">
                          {{ tr.tel }}
                        </vs-td>
                        <vs-td>
                          <feather-icon icon="SearchIcon" class="cursor-pointer w-6 h-6" size="small"></feather-icon>

                        </vs-td>
                        <vs-td>
                          <feather-icon icon="EditIcon" class="cursor-pointer w-6 h-6" size="small" @click="hospital=tr;addNewDataSidebar=true"></feather-icon>
                        </vs-td>
                        <vs-td>
                          <feather-icon icon="Trash2Icon" class="cursor-pointer w-6 h-6" size="small" @click="delete_hospital(tr)"></feather-icon>
                        </vs-td>
                      </vs-tr>
                    </template>
                  </vs-table>
               </div>
            </vs-tab>
            <vs-tab :label="$t('hospital_register')">
              <div class="mt-3">
                <div class="vx-row">
                    <div class="vx-col md:w-1/2 w-full mt-5">
                        <label>{{$t('hospital_name')}} <span class="require">*</span></label>
                        <vs-input type="text" v-model="newHospital.hospital_name" class="w-full" :danger="invalid.hospital_name"/>
                        <div class="error" v-if="invalid.hospital_name">{{$t("hospital_name_alert")}}</div>
                    </div>
                    <div class="vx-col md:w-1/2 w-full mt-5">
                       <label>{{$t('hospital_department')}} </label>
                         <vs-select class="w-full" v-model="newHospital.under_status" >
                          <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in under_status" />
                        </vs-select>
                    </div>

                </div>
                <div class="vx-row">
                    <div class="vx-col md:w-1/2 w-full mt-5">
                        <label>{{$t('hospital_type')}}</label>
                        <vs-select class="w-full" v-model="newHospital.hospital_type" >
                          <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in hospital_types" />
                        </vs-select>
                        <!-- <vs-input type="text" v-model="newHospital.hospital_type" class="w-full"/> -->
                    </div>
                    <div class="vx-col md:w-1/2 w-full mt-5">
                       <label>{{$t('bed_count')}}  <span class="require">*</span></label>
                        <vs-input type="text" v-model="newHospital.bed_count" :danger="invalid.bed_count" class="w-full"/>
                        <div class="error" v-if="invalid.bed_count">{{$t("bed_count_alert")}}</div>
                    </div>

                </div>
                <div class="vx-row">

                    <div class="vx-col md:w-1/2 w-full mt-5">
                       <label>{{$t('potential')}}</label>
                        <vs-input type="text" v-model="newHospital.potential" class="w-full"/>
                    </div>
                    <div class="vx-col md:w-1/2 w-full mt-5">
                       <label>{{$t('tel')}}</label>
                        <vs-input type="text" v-model="newHospital.tel" class="w-full"/>
                    </div>
                </div>
                <div class="vx-row">
                    <div class="vx-col md:w-1/3 w-full mt-5">
                        <label>{{$t('address')}}</label>
                        <vs-input v-model="newHospital.address" class="w-full" />
                    </div>
                    <div class="vx-col md:w-1/6 w-full mt-5">
                        <label>{{$t('province')}}</label>
                        <vs-select autocomplete class="w-full" v-model="newHospital.province">
                          <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in province_view" />
                        </vs-select>
                    </div>
                    <div class="vx-col md:w-1/6 w-full mt-5">
                        <label>{{$t('amphur')}}</label>
                        <vs-select autocomplete class="w-full" v-model="newHospital.amphur">
                          <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in amphurs" />
                        </vs-select>
                    </div>
                    <div class="vx-col md:w-1/6 w-full mt-5">
                        <label>{{$t('tambon')}}</label>
                        <vs-select autocomplete class="w-full" v-model="newHospital.tambon">
                          <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in tambon_view" />
                        </vs-select>
                        <!-- <vs-input type="text" :label="$t('tambon')"  v-model="newHospital.now_tambon" class="w-full" /> -->
                    </div>


                    <div class="vx-col md:w-1/6 w-full mt-5">
                        <label>{{$t('postcode')}}</label>
                        <vs-select autocomplete class="w-full" v-model="newHospital.postcode">
                          <vs-select-item :key="index" :value="item" :text="item" v-for="(item,index) in postcodes" />
                        </vs-select>
                        <!-- <vs-input type="text" :label="$t('postcode')"  v-model="newHospital.now_postcode" class="w-full" /> -->
                    </div>
                </div>
                <div class="vx-row">

                    <div class="vx-col md:w-1/4 w-full mt-5">
                       <label>{{$t('lat')}}</label>
                        <vs-input type="text" v-model="newHospital.lat" class="w-full" disabled/>
                    </div>
                    <div class="vx-col md:w-1/4 w-full mt-5">
                       <label>{{$t('tel')}}</label>
                        <vs-input type="text" v-model="newHospital.lon" class="w-full" disabled/>
                    </div>
                </div>
              </div>
              <div class="mt-3">
                <div class="vx-row">
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
                      <vs-button  ref="loadableButton" id="button-with-loading" class="vs-con-loading__container" vslor="primary" @click="save">{{$t('save')}}</vs-button>
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
import EditHospital from './extra-components/EditHospital.vue'
export default {
  components: {
    EditHospital,
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
        hospital:{},
        hospitals:[],
        renderComponent:true,
        locations:[],
        tambons:[],
        provinces:[],
        under_status:service.under_status,
        hospital_types:service.hospital_types,
        newHospital:{},
        addNewDataSidebar: false,

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
     locale(){
       return this.$i18n.locale;
     },
     invalid(){
       var c=(type)=>{
         return this.newHospital[type]==""&&this.submitted
       }
       return {hospital_name:c("hospital_name"),bed_count:c("bed_count")}
     },
     isInvalid(){
       return this.invalid.hospital_name||this.invalid.bed_count
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
       return this.locations.filter((item)=>item.en_amphur==this.newHospital.amphur&&item.en_tambon==this.newHospital.tambon).map((item)=>item.postcode)
     },
    now_province(){
       return this.newHospital.province;
     },
     now_amphur(){
       return this.newHospital.amphur;
     },

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
       this.newHospital=JSON.parse('{"hospital_id":"","hospital_name":"","under_status":"","hospital_type":"","bed_count":"","potential":"","tel":"","address":"","tambon":"","amphur":"","province":"","postcode":"","lat":"","lon":""}')
     },
     getData(){
       service.getData("/get_hospital_master").then((result)=>{
       console.log(result);
       if(!result.code){
         this.hospitals= JSON.parse(JSON.stringify(result.data).replace(/\:null/gi, "\:\"\""));
        this.hospitals=this.hospitals.map((item)=>{
          var test=this.hospital_types.filter((type)=>type.value==item.hospital_type);

          if(test.length>0){
              item.type_name=test[0].text;
          }else{
            item.type_name="";
          }
           return item;
         })
       }
     })
     },
     delete_hospital(hospital){
       this.$swal({
          title:this.$t('delete_hospital_title'),
          text: this.$t('delete_text'),
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText:this.$t('cancel'),
          confirmButtonText:this.$t('confirm_delete'),
          showLoaderOnConfirm: true,
          preConfirm:()=>{
            return service.deleteData(`delete_hospital?hospital_id=${hospital.hospital_id}`).then((result)=>{

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
     myfunc(e){
        console.log(e);
        this.overlayCoordinate=e.coordinate;
        this.newHospital.lon=this.overlayCoordinate[0];
        this.newHospital.lat=this.overlayCoordinate[1];
        this.isSelectCoordinate=true;
      },
      forceRerender() {
        // Remove my-component from the DOM
        this.renderComponent = false;

        this.$nextTick(() => {
          // Add the component back in
          this.renderComponent = true;
        });
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

            service.postData('add_hospital',this.newHospital).then((result)=>{
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
      }
    },
  watch: {
        addNewDataSidebar(val){
          if(val==false){
            this.getData();
          }
        },
        locale(val) {
            this.forceRerender();

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

