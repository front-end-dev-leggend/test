<template >
  <div class="vx-col w-full mb-base" v-if="renderComponent">

    <edit-operating-unit :isSidebarActive="addNewDataSidebar" :operating_unit="operating_unit" @closeSidebar="addNewDataSidebar = false" />
    <vx-card>
        <vs-tabs>
            <vs-tab :label="$t('operation_unit_data')">
               <div class="mt-3">
                 <vs-table pagination max-items="10" search :data="operating_units">

                    <template slot="thead">
                      <vs-th sort-key="id" width="100px">{{$t('id')}}</vs-th>
                      <vs-th sort-key="zone">{{$t('zone')}}</vs-th>
                      <vs-th sort-key="unit_name">{{$t('unit_name')}}</vs-th>
                      <vs-th sort-key="department">{{$t('department_')}}</vs-th>
                      <vs-th sort-key="unit_type">{{$t('unit_type')}}</vs-th>
                      <vs-th sort-key="tel">{{$t('tel')}}</vs-th>
                      <vs-th sort-key="unit_tel">{{$t('status')}}</vs-th>
                      <vs-th>{{$t('view')}}</vs-th>
                      <vs-th>{{$t("edit")}}</vs-th>
                      <vs-th>{{$t("delete")}}</vs-th>
                    </template>

                    <template slot-scope="{data}">
                      <vs-tr :data="tr" :key="index" v-for="(tr, index) in data">



                        <vs-td :data="tr.operating_unit_id">
                          {{ tr.operating_unit_id }}
                        </vs-td>
                         <vs-td :data="tr.zone">
                          {{ tr.zone }}
                        </vs-td>
                        <vs-td :data="tr.operating_unit_name">
                          {{tr.operating_unit_name }}
                        </vs-td>

                        <vs-td :data="tr.department">
                          {{ tr.department }}
                        </vs-td>
                         <vs-td :data="tr.unit_type">
                          {{ tr.unit_type }}
                        </vs-td>
                        <vs-td :data="tr.tel">
                          {{ tr.tel }}
                        </vs-td>
                        <vs-td :data="tr.unit_status">
                          {{ tr.unit_status }}
                        </vs-td>
                        <vs-td>
                          <feather-icon icon="SearchIcon" class="cursor-pointer w-6 h-6" size="small"></feather-icon>

                        </vs-td>
                        <vs-td>
                          <feather-icon icon="EditIcon" class="cursor-pointer w-6 h-6" size="small" @click="operating_unit=tr;addNewDataSidebar=true"></feather-icon>
                        </vs-td>
                        <vs-td>
                          <feather-icon icon="Trash2Icon" class="cursor-pointer w-6 h-6" size="small" @click="delete_operating_unit(tr)"></feather-icon>
                        </vs-td>
                      </vs-tr>
                    </template>
                  </vs-table>
               </div>
            </vs-tab>
            <vs-tab :label="$t('operation_unit_register')">
              <div class="mt-3">
                  <div class="vx-row">
                    <div class="vx-col md:w-1/2 w-full mt-5">
                        <label>{{$t('operating_unit_name')}} <span class="require">*</span></label>
                        <vs-input type="text" v-model="operating_unit_name" class="w-full" :danger="invalid.operating_unit_name"/>
                        <div class="error" v-if="invalid.operating_unit_name">{{$t("operating_unit_name_alert")}}</div>
                    </div>
                     <div class="vx-col md:w-1/2 w-full mt-5">
                        <label>{{$t('department_')}} <span class="require">*</span></label>
                        <vs-input v-model="department" class="w-full" :danger="invalid.department" />
                        <div class="error" v-if="invalid.department">{{$t("department_alert")}}</div>
                    </div>
                </div>
                <div class="vx-row">

                    <div class="vx-col md:w-1/2 w-full mt-5">
                        <label>{{$t('zone_bangkok')}}</label>
                        <vs-input v-model="zone" class="w-full"  />

                    </div>
                    <div class="vx-col md:w-1/6 w-full mt-5">
                        <label>{{$t('unit_type')}}</label>
                        <ul class="centerx">
                            <li>
                              <vs-radio v-model="unit_type" vs-value="1">พื้นฐาน</vs-radio>
                            </li>
                            <li>
                              <vs-radio v-model="unit_type" vs-value="2">ชั้นสูง</vs-radio>
                            </li>
                        </ul>
                    </div>
                    <div class="vx-col md:w-1/6 w-full mt-5">
                        <label>{{$t('unit_size')}} </label>
                        <ul class="centerx">
                            <li>
                              <vs-radio v-model="unit_size" vs-value="3">แม่โซน</vs-radio>
                            </li>
                            <li>
                              <vs-radio v-model="unit_size" vs-value="4">ลูกโซน</vs-radio>
                            </li>
                        </ul>

                    </div>
                    <div class="vx-col md:w-1/6 w-full mt-5">
                        <label>{{$t('unit_status')}} </label>
                        <ul class="centerx">
                            <li>
                              <vs-radio v-model="unit_status" vs-value="5">พร้อม</vs-radio>
                            </li>
                            <li>
                              <vs-radio v-model="unit_status" vs-value="6">ไม่พร้อม</vs-radio>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="vx-row">
                    <div class="vx-col md:w-1/3 w-full mt-5">
                        <label>{{$t('address')}}</label>
                        <vs-input v-model="address" class="w-full" />
                    </div>
                    <div class="vx-col md:w-1/6 w-full mt-5">
                        <label>{{$t('province')}}</label>
                        <vs-select autocomplete class="w-full" v-model="province">
                          <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in province_view" />
                        </vs-select>
                    </div>
                    <div class="vx-col md:w-1/6 w-full mt-5">
                        <label>{{$t('amphur')}}</label>
                        <vs-select autocomplete class="w-full" v-model="amphur">
                          <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in amphurs" />
                        </vs-select>
                    </div>
                    <div class="vx-col md:w-1/6 w-full mt-5">
                        <label>{{$t('tambon')}}</label>
                        <vs-select autocomplete class="w-full" v-model="tambon">
                          <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in tambon_view" />
                        </vs-select>
                        <!-- <vs-input type="text" :label="$t('tambon')"  v-model="now_tambon" class="w-full" /> -->
                    </div>


                    <div class="vx-col md:w-1/6 w-full mt-5">
                        <label>{{$t('postcode')}}</label>
                        <vs-select autocomplete class="w-full" v-model="postcode">
                          <vs-select-item :key="index" :value="item" :text="item" v-for="(item,index) in postcodes" />
                        </vs-select>
                        <!-- <vs-input type="text" :label="$t('postcode')"  v-model="now_postcode" class="w-full" /> -->
                    </div>
                </div>
                 <div class="vx-row">
                    <div class="vx-col md:w-1/3 w-full mt-5">
                        <label>{{$t('tel')}} </label>
                        <vs-input type="text" v-model="tel" class="w-full" />
                    </div>
                     <div class="vx-col md:w-1/6 w-full mt-5">
                        <label>{{$t('employee_number')}} </label>
                        <vs-input v-model="employee_number" class="w-full"  />
                    </div>
                    <div class="vx-col md:w-1/6 w-full mt-5">
                        <label>{{$t('ambulance_number')}} </label>
                        <vs-input type="text" v-model="ambulance_number" class="w-full" />
                    </div>
                     <div class="vx-col md:w-1/3 w-full mt-5">
                        <label>{{$t('manager_name')}} </label>
                        <vs-input v-model="manager_name" class="w-full"  />
                    </div>
                </div>
                <div class="vx-row">
                    <div class="vx-col md:w-1/2 w-full mt-5">
                        <label>{{$t('remark')}} </label>
                        <vs-input type="text" v-model="remark" class="w-full" />
                    </div>
                     <div class="vx-col md:w-1/4 w-full mt-5">
                        <label>{{$t('lat')}} </label>
                        <vs-input type="text" v-model="lat" class="w-full" disabled />
                    </div>
                     <div class="vx-col md:w-1/4 w-full mt-5">
                        <label>{{$t('lon')}} </label>
                        <vs-input type="text" v-model="lon" class="w-full" disabled />
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
                      <vs-button color="success" type="border" @click="save">{{$t('save')}}</vs-button>
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
  li{
    padding-top:10px;
    margin-right:10px;
    float:left;
  }
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
import EditOperatingUnit from './extra-components/EditOperatingUnit.vue'
export default {
  components: {
    EditOperatingUnit,
    Datepicker
  },
   data(){
      return {
        // operatoring_units:[],
           zoom: 8,
        center: [100.6037284, 13.6768896],
        rotation: 0,
        isSelectCoordinate:false,
        overlayCoordinate: [],
        submitted:false,
        renderComponent:true,
        addNewDataSidebar: false,
        operating_units:[],
        locale: this.$i18n.locale,
        operator:{},
        locations:[],
        tambons:[],
        provinces:[],
        operating_unit:{},
        operating_unit_name:"",department:"",zone:"",unit_type:"",unit_size:"",unit_status:"",address:"",tambon:"",amphur:"",province:"",postcode:"",tel:"",employee_number:"",ambulance_number:"",manager_name:"",remark:"",lat:"0",lon:"0",perform_count:"",decline_count:"",
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
       return this.$i18n.locale
     },
     invalid(){
       var c=(type)=>{
          return this.submitted&&this[type]==""
       }
       return {operating_unit_name:c("operating_unit_name"),department:c("department")}
     },
     isInvalid(){
       return this.invalid.operating_unit_name||this.invalid.department
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
       return this.locations.filter((item)=>item.en_amphur==this.amphur&&item.en_tambon==this.tambon).map((item)=>item.postcode)
     },
   },
   created(){
     this.getData();
     service.getExternalData("get_province").then((result)=>{
       console.log(result);
       if(!result.code){

         this.provinces=JSON.parse(JSON.stringify(result.data).replace(/\:null/gi, "\:\"\""));
         console.log("province",this.provinces);

       }else{
         this.$swal(result.message,'','error')
       }
     },err=>{
       console.log(err);
     })
   },
   methods: {
      forceRerender() {
        this.renderComponent = false;
        this.$nextTick(() => {
          this.renderComponent = true;
        });
      },
      myfunc(e){
        console.log(e);
        this.overlayCoordinate=e.coordinate;
        this.lon=this.overlayCoordinate[0];
        this.lat=this.overlayCoordinate[1];
        this.isSelectCoordinate=true;
      },
      save(){
        this.submitted=true;
        if(!this.isInvalid){
          alert(1);
          service.postData("add_operating_unit",{
            operating_unit_name:this.operating_unit_name,department:this.department,zone:this.zone,unit_type:this.unit_type,unit_size:this.unit_size-2>0?this.unit_size-2:"",unit_status:this.unit_status-4>0?this.unit_status-4:"",address:this.address,tambon:this.tambon,amphur:this.amphur,province:this.province,postcode:this.postcode,tel:this.tel,employee_number:this.employee_number,ambulance_number:this.ambulance_number,manager_name:this.manager_name,remark:this.remark,lat:this.lat,lon:this.lon
          }).then((result)=>{
            this.isSelectCoordinate=false;
            this.getData();
            this.forceRerender();
          },err=>{

          })
        }
      },
     getData(){
       service.getData("/get_operating").then((result)=>{
       console.log(result);
       if(!result.code){
         this.operating_units= JSON.parse(JSON.stringify(result.data).replace(/\:null/gi, "\:\"\""));
       }else{
          this.$swal(result.message,'','error')
       }
     })
     },
     delete_operating_unit(operating_unit){
        this.$swal({
          title:this.$t('delete_operating_unit_title'),
          text: this.$t('delete_text'),
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText:this.$t('cancel'),
          confirmButtonText:this.$t('confirm_delete'),
          showLoaderOnConfirm: true,
          preConfirm:()=>{
            return service.deleteData(`delete_operating_unit?operating_unit_id=${operating_unit.operating_unit_id}`).then((result)=>{

              return result;
            },err=>{
              throw new Error(err)
            })

          }
        }).then((result) => {
          if(result.code===false){
                this.$swal(
                  this.$t('deleted'),
                  '',
                  'success'
                ).then((result)=>{
                    this.getData();
               })
              }else{
                 this.$swal(result.message,'','error')
              }

        })
      },
   },
  watch: {
      lang(val){
        this.forceRerender();
      },
      operating_units(val){
        console.log(val);
      },
      addNewDataSidebar(val){
        if(!val){
          this.getData()
        }
      },
      province(val){
          // alert(val);

          service.getExternalData('/get_location?province='+val).then((result)=>{
            if(!result.code){
              this.locations=result.data;

            }
          },err=>{
            console.log(err);
          })
        },
    amphur(val){
          this.tambons=this.locations.filter((item)=>item.en_amphur==val);
          // console.log(card_tambons);
        },
    }
}
</script>

