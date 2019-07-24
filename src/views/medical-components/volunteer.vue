<template >
  <div class="vx-col w-full mb-base" v-if="renderComponent">

    <edit-volunteer :isSidebarActive="addNewDataSidebar" :newVolunteer="volunteer" @closeSidebar="addNewDataSidebar = false" />
    <vx-card>
        <vs-tabs>
            <vs-tab :label="$t('volunteer_data')">
               <div class="mt-3">
                    <!-- <pre>{{volunteer}}</pre> -->
                 <vs-table pagination max-items="10" search :data="volunteers">

                    <template slot="thead">
                      <vs-th sort-key="volunteer_id">{{$t('id')}}</vs-th>
                      <vs-th sort-key="name+surname">{{$t('name_surname')}}</vs-th>
                      <vs-th sort-key="operating_unit_name">{{$t('operating_unit_name')}}</vs-th>

                      <vs-th sort-key="contact_number">{{$t('contact_no')}}</vs-th>
                      <vs-th sort-key="now_tambon+now_amphur+now_province">{{$t('tambon_amphur_province')}}</vs-th>
                       <vs-th>{{$t('view')}}</vs-th>
                      <vs-th>{{$t("edit")}}</vs-th>
                      <vs-th>{{$t("delete")}}</vs-th>
                    </template>

                    <template slot-scope="{data}">
                      <vs-tr :data="tr" :key="index" v-for="(tr, index) in data">

                        <vs-td :data="tr.volunteer_id">
                          {{tr.volunteer_id}}
                        </vs-td>

                        <vs-td :data="tr.name+tr.surname">
                          {{ tr.name+" "+tr.surname }}
                        </vs-td>

                        <vs-td :data="tr.operating_unit_name">
                          {{ tr.operating_unit_name }}
                        </vs-td>

                        <vs-td :data="tr.contact_number">
                          {{ tr.contact_number }}
                        </vs-td>
                         <vs-td :data="tr.now_tambon+tr.now_amphur+tr.now_province">
                          {{ tr.now_tambon }},   {{ tr.now_amphur }},   {{ tr.now_province }}
                        </vs-td>
                        <vs-td>
                          <feather-icon icon="SearchIcon" class="cursor-pointer w-6 h-6" size="small"></feather-icon>

                        </vs-td>
                        <vs-td>
                          <feather-icon icon="EditIcon" class="cursor-pointer w-6 h-6" size="small" @click="volunteer=tr;addNewDataSidebar=true"></feather-icon>
                        </vs-td>
                        <vs-td>
                          <feather-icon icon="Trash2Icon" class="cursor-pointer w-6 h-6" size="small" @click="delete_volunteer(tr)"></feather-icon>
                        </vs-td>
                      </vs-tr>
                    </template>
                  </vs-table>
               </div>
            </vs-tab>
            <vs-tab :label="$t('volunteer_register')">
              <div class="mt-3">
                <div class="vx-row">
                      <div class="vx-col md:w-1/6 w-full mt-5">
                          <label>{{$t('prefix')}} <span class="require">*</span></label>
                         <vs-select class="w-full" v-model="newVolunteer.name_prefix" :danger="invalid.name_prefix">
                          <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in prefixs_view" />
                        </vs-select>
                        <div class="error" v-if="invalid.name_prefix">{{$t("prefix_alert")}}</div>
                      </div>
                      <div class="vx-col md:w-1/3 w-full mt-5">
                          <label>{{$t('name')}} <span class="require">*</span></label>
                          <vs-input v-model="newVolunteer.name" class="w-full"  :danger="invalid.name"/>
                          <div class="error" v-if="invalid.name">{{$t('name_alert')}}</div>
                      </div>
                      <div class="vx-col md:w-1/2 w-full mt-5">
                          <label>{{$t('surname')}} <span class="require">*</span></label>
                          <vs-input v-model="newVolunteer.surname" class="w-full"  :danger="invalid.surname"/>
                          <div class="error" v-if="invalid.surname">{{$t('surname_alert')}}</div>
                      </div>
                </div>
                <div class="vx-row">
                      <div class="vx-col md:w-1/2 w-full mt-5">
                          <label>{{$t('card_id')}} <span class="require">*</span></label>
                            <vs-input v-model="newVolunteer.card_id" class="w-full" :danger="invalid.card_id"/>
                              <div class="error" v-if="invalid.card_id">{{$t('card_id_alert')}}</div>
                      </div>

                </div>
                 <div class="vx-row">
                      <div class="vx-col md:w-1/2 w-full mt-5">
                          <label>{{$t('current_address')}}</label>
                      </div>
                </div>
                <div class="vx-row">
                    <div class="vx-col md:w-1/3 w-full mt-5">
                        <label>{{$t('address')}}</label>
                        <vs-input v-model="newVolunteer.now_address" class="w-full" />
                    </div>
                    <div class="vx-col md:w-1/6 w-full mt-5">
                        <label>{{$t('province')}}</label>
                        <vs-select autocomplete class="w-full" v-model="newVolunteer.now_province">
                          <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in province_view" />
                        </vs-select>
                        <!-- <vs-input type="text" :label="$t('province')"  v-model="newVolunteer.now_province" class="w-full" /> -->
                    </div>
                    <div class="vx-col md:w-1/6 w-full mt-5">
                        <label>{{$t('amphur')}}</label>
                        <vs-select autocomplete class="w-full" v-model="newVolunteer.now_amphur">
                          <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in now_amphurs" />
                        </vs-select>
                        <!-- <vs-input type="text" :label="$t('amphur')"  v-model="newVolunteer.now_amphur" class="w-full" /> -->
                    </div>
                    <div class="vx-col md:w-1/6 w-full mt-5">
                        <label>{{$t('tambon')}}</label>
                        <vs-select autocomplete class="w-full" v-model="newVolunteer.now_tambon">
                          <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in now_tambon_view" />
                        </vs-select>
                        <!-- <vs-input type="text" :label="$t('tambon')"  v-model="newVolunteer.now_tambon" class="w-full" /> -->
                    </div>


                    <div class="vx-col md:w-1/6 w-full mt-5">
                        <label>{{$t('postcode')}}</label>
                        <vs-select autocomplete class="w-full" v-model="newVolunteer.now_postcode">
                          <vs-select-item :key="index" :value="item" :text="item" v-for="(item,index) in now_postcodes" />
                        </vs-select>
                        <!-- <vs-input type="text" :label="$t('postcode')"  v-model="newVolunteer.now_postcode" class="w-full" /> -->
                    </div>
                </div>
                <div class="vx-row">
                      <div class="vx-col md:w-1/2 w-full mt-5">
                          <label>{{$t('card_address')}}</label>
                      </div>
                </div>
                <div class="vx-row">
                    <div class="vx-col md:w-1/3 w-full mt-5">
                        <label>{{$t('address')}}</label>
                        <vs-input v-model="newVolunteer.card_address" class="w-full" />
                    </div>
                    <div class="vx-col md:w-1/6 w-full mt-5">
                        <label>{{$t('province')}}</label>
                        <vs-select autocomplete class="w-full" v-model="newVolunteer.card_province">
                          <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in province_view" />
                        </vs-select>
                        <!-- <vs-input type="text" :label="$t('province')"  v-model="newVolunteer.now_province" class="w-full" /> -->
                    </div>
                    <div class="vx-col md:w-1/6 w-full mt-5">
                        <label>{{$t('amphur')}}</label>
                        <vs-select autocomplete class="w-full" v-model="newVolunteer.card_amphur">
                          <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in card_amphurs" />
                        </vs-select>
                        <!-- <vs-input type="text" :label="$t('amphur')"  v-model="newVolunteer.now_amphur" class="w-full" /> -->
                    </div>
                    <div class="vx-col md:w-1/6 w-full mt-5">
                        <label>{{$t('tambon')}}</label>
                        <vs-select autocomplete class="w-full" v-model="newVolunteer.card_tambon">
                          <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in card_tambon_view" />
                        </vs-select>
                        <!-- <vs-input type="text" :label="$t('tambon')"  v-model="newVolunteer.now_tambon" class="w-full" /> -->
                    </div>


                    <div class="vx-col md:w-1/6 w-full mt-5">
                        <label>{{$t('postcode')}}</label>
                        <vs-select autocomplete class="w-full" v-model="newVolunteer.card_postcode">
                          <vs-select-item :key="index" :value="item" :text="item" v-for="(item,index) in card_postcodes" />
                        </vs-select>
                        <!-- <vs-input type="text" :label="$t('postcode')"  v-model="newVolunteer.now_postcode" class="w-full" /> -->
                    </div>
                </div>
                <div class="vx-row">
                      <div class="vx-col md:w-1/2 w-full mt-5">
                        <label>{{$t('department')}} </label>
                        <vs-select autocomplete class="w-full" v-model="newVolunteer.operating_unit_id">
                          <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in departments_view" />
                        </vs-select>

                      </div>
                      <div class="vx-col md:w-1/4 w-full mt-5">
                          <label>{{$t('contact_no')}}</label>
                          <vs-input v-model="newVolunteer.contact_number" class="w-full"/>

                      </div>
                      <div class="vx-col md:w-1/4 w-full mt-5">
                          <label>{{$t('training')}}</label>
                          <vs-input v-model="newVolunteer.training" class="w-full" />

                      </div>
                </div>
                <div class="vx-row">
                      <div class="vx-col md:w-1/2 w-full mt-5">
                        <label>{{$t('skill')}} </label>
                        <vs-input v-model="newVolunteer.skill" class="w-full"/>
                      </div>
                      <div class="vx-col md:w-1/4 w-full mt-5">
                          <label>{{$t('remark')}}</label>
                          <vs-input v-model="newVolunteer.note" class="w-full"/>

                      </div>
                      <div class="vx-col md:w-1/4 w-full mt-5">
                          <label>{{$t('image')}}</label>
                           <vs-input type="file" id="file" ref="myFiles"  class="w-full"  @change="onFileChange" />

                      </div>
                </div>
              </div>
              <div class="mt-3">
                 <div class="vx-row">
                      <div class="vx-col md:w-1/2 w-full mt-5">
                          <label>{{$t('choose_position')}}</label>
                      </div>

                </div>
                <div class="vx-row">
                  <div class="vx-col md:w-1/4 w-full mt-5">
                          <label>{{$t('lat')}}</label>
                          <vs-input v-model="newVolunteer.lat" class="w-full" disabled/>
                      </div>
                      <div class="vx-col md:w-1/4 w-full mt-5">
                          <label>{{$t('lon')}}</label>
                          <vs-input v-model="newVolunteer.lon" class="w-full" disabled/>
                      </div>
                </div>
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
              <div class="mt-5">
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

</style>
<style>
    .error{
    color:red;
     font-size:80%;
  }
</style>

<script>
import Datepicker from 'vuejs-datepicker';
import service from '@/service/service';
import EditVolunteer from './extra-components/EditVolunteer.vue'
export default {
  components: {
    EditVolunteer,
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
        locations:[],
        now_locations:[],
        card_locations:[],
        now_tambons:[],
        card_tambons:[],
        departments:[],
        positions:[],
        volunteer:{},
        volunteers:[],
        provinces:[],
        departments:[],

        prefixs:service.prefixs,
        newVolunteer:JSON.parse('{"name_prefix":"","name":"","surname":"","card_id":"","now_address":"","now_tambon":"","now_amhpur":"","now_province":"","now_postcode":"","card_address":"","card_tambon":"","card_amphur":"","card_province":"","card_postcode":"","operating_unit_id":"","contact_number":"","training":"","skill":"","note":"","img":"","lat":"","lon":""}'),
        renderComponent:true,
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
     prefixs_view(){
        return this.prefixs.map((item)=>{
          if(this.$i18n.locale=='th'){
            return {value:item.id,text:item.th}
          }else{
            return {value:item.id,text:item.en}
          }
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
     departments_view(){
          return this.departments.map((item)=>{
           return { value:item.operating_unit_id,text:item.operating_unit_name}
         })
     },
    card_amphurs(){
       var temps= this.card_locations.map((item)=>{
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
     now_amphurs(){
       var temps= this.now_locations.map((item)=>{
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
     card_tambon_view(){
       var temps= this.card_tambons.map((item)=>{
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
     now_tambon_view(){
       var temps= this.now_tambons.map((item)=>{
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
     now_postcodes(){
       return this.now_locations.filter((item)=>item.en_amphur==this.now_amphur&&item.en_tambon==this.newVolunteer.now_tambon).map((item)=>item.postcode)
     },
     card_postcodes(){
        return this.card_locations.filter((item)=>item.en_amphur==this.card_amphur&&item.en_tambon==this.newVolunteer.card_tambon).map((item)=>item.postcode)
     },
     lang(){
       return this.$i18n.locale;
     },
     invalid(){
       var c=(type)=>{
         return this.newVolunteer[type]==""&&this.submitted
       }
       return {name_prefix:c("name_prefix"),name:c("name"),surname:c("surname"),card_id:c("card_id")}
     },
     isInvalid(){
       return this.invalid.name_prefix||this.invalid.name||this.invalid.surname||this.invalid.card_id
     },
    now_province(){
       return this.newVolunteer.now_province;
     },
     now_amphur(){
       return this.newVolunteer.now_amphur;
     },
     card_province(){
       return this.newVolunteer.card_province;
     },
     card_amphur(){
       return this.newVolunteer.card_amphur;
     }
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
      this.$swal('connection error','','error')
       console.log(err);
     })
     service.getData("get_operating").then((result)=>{
       console.log(result);
       if(!result.code){
         this.departments=result.data;
       }else{
         this.$swal(result.message,'','error');
       }
     },err=>{
       this.$swal('connection error','','error');
     })
   },
   methods: {
     getData(){
       service.getData("/get_volunteer").then((result)=>{
       console.log(result);
       if(!result.code){
         this.volunteers= JSON.parse(JSON.stringify(result.data).replace(/\:null/gi, "\:\"\""));
       }
     })
     },
     myfunc(e){
        console.log(e);
        this.overlayCoordinate=e.coordinate;
        this.newVolunteer.lon=this.overlayCoordinate[0];
        this.newVolunteer.lat=this.overlayCoordinate[1];
        this.isSelectCoordinate=true;
      },
    onFileChange(e) {
          const file = e.target.files[0];
          // this.url = URL.createObjectURL(file);
          console.log(this.url);
           var reader = new FileReader();

            reader.onload = (e)=> {
              // $('#blah').attr('src', e.target.result);
              console.log(e.target.result);
              var base64=e.target.result;
              var index=base64.indexOf('base64,');
              console.log(index)
              this.url=base64;
              this.newVolunteer.img=base64.substring(index+7,base64.length);
              // this.image=this.image;
                  }

                reader.readAsDataURL(file);
                console.log(e);
              }
       ,
      forceRerender() {
        // Remove my-component from the DOM
        this.renderComponent = false;

        this.$nextTick(() => {
          // Add the component back in
          this.renderComponent = true;
        });
      },
      delete_volunteer(volunteer){
        this.$swal({
          title:this.$t('delete_volunteer_title'),
          text: this.$t('delete_text'),
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText:this.$t('cancel'),
          confirmButtonText:this.$t('confirm_delete'),
          showLoaderOnConfirm: true,
          preConfirm:()=>{
            return service.deleteData(`delete_volunteer?volunteer_id=${volunteer.volunteer_id}`).then((result)=>{

              return result;
            },err=>{
              throw new Error(err)
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
                this.$swal(result.vaule.message,'','error');
              }
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
          service.postData('add_volunteer',this.newVolunteer).then((result)=>{
             this.$vs.loading.close("#button-with-loading > .con-vs-loading")
            if(!result.code){
              this.submitted=false;
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
            this.$i18n.locale = val;
            alert(val);

            // this.locale=val;

        },
        now_province(val){
          service.getExternalData('/get_location?province='+val).then((result)=>{
            if(!result.code){
              this.now_locations=result.data;
            }
          },err=>{
            console.log(err);
          })
        },
        now_amphur(val){
          this.now_tambons=this.now_locations.filter((item)=>item.en_amphur==val);
        },
        card_province(val){
          service.getExternalData('/get_location?province='+val).then((result)=>{
            if(!result.code){
              this.card_locations=result.data;
            }
          },err=>{
            console.log(err);
          })
        },
        card_amphur(val){
          this.card_tambons=this.card_locations.filter((item)=>item.en_amphur==val);
        },
        locale(val){
          this.forceRerender();
        }
    }
}
</script>

