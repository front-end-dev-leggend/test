<template >
  <div class="vx-col w-full mb-base" v-if="renderComponent">

    <edit-vehicle :isSidebarActive="addNewDataSidebar" :vehicle="vehicle" @closeSidebar="addNewDataSidebar = false" />
    <vx-card>
        <vs-tabs>
            <vs-tab :label="$t('vehicle_data')">
               <div class="mt-3">
                 <vs-table pagination max-items="10" search :data="vehicles">

                    <template slot="thead">
                      <vs-th sort-key="vehicle_id">{{$t('id')}}</vs-th>
                      <vs-th sort-key="plate_number">{{$t('plate_number')}}</vs-th>
                      <vs-th sort-key="operating_unit_name">{{$t('operating_unit_name')}}</vs-th>

                      <vs-th sort-key="tel">{{$t('contact_no')}}</vs-th>
                      <vs-th sort-key="data_status">{{$t('data_status')}}</vs-th>
                       <vs-th>{{$t('view')}}</vs-th>
                      <vs-th>{{$t("edit")}}</vs-th>
                      <vs-th>{{$t("delete")}}</vs-th>
                    </template>

                    <template slot-scope="{data}">
                      <vs-tr :data="tr" :key="index" v-for="(tr, index) in data">

                        <vs-td :data="tr.vehicle_id" style="width:150px;">
                          {{tr.vehicle_id}}
                        </vs-td>

                        <vs-td :data="tr.plate_number">
                          {{ tr.plate_number }}
                        </vs-td>

                        <vs-td :data="tr.operating_unit_namee">
                          {{ tr.operating_unit_name }}
                        </vs-td>

                        <vs-td :data="tr.tel">
                          {{ tr.tel }}
                        </vs-td>
                        <vs-td :data="tr.data_status">
                          {{ tr.data_status }}
                        </vs-td>
                        <vs-td>
                          <feather-icon icon="SearchIcon" class="cursor-pointer w-6 h-6" size="small"></feather-icon>

                        </vs-td>
                        <vs-td>
                          <feather-icon icon="EditIcon" class="cursor-pointer w-6 h-6" size="small" @click="vehicle=tr;addNewDataSidebar=true"></feather-icon>
                        </vs-td>
                        <vs-td>
                          <feather-icon icon="Trash2Icon" class="cursor-pointer w-6 h-6" size="small" @click="delete_vehicle(tr)"></feather-icon>
                        </vs-td>
                      </vs-tr>
                    </template>
                  </vs-table>
               </div>
            </vs-tab>
            <vs-tab :label="$t('vehicle_register')">
              <form-wizard
                  ref="checkoutWizard"
                  color="rgba(var(--vs-primary), 1)"
                  :title="null"
                  :subtitle="null"
                  :hide-buttons="true">

                  <!-- tab 1 content -->

                  <tab-content :title="$t('general_data')" icon="feather icon-shopping-cart" class="mb-5" :before-change="validStep1">
                          <div class="mt-3">
                            <div class="vx-row">
                                <div class="vx-col md:w-1/2 w-full mt-5">
                                    <label>{{$t('std_vehicle_id')}} <span class="require">*</span></label>
                                    <vs-input v-model="std_vehicle_id" class="w-full" :danger="invalid.std_vehicle_id"/>
                                    <div class="error" v-if="invalid.std_vehicle_id">{{$t('std_vehicle_id_alert')}}</div>
                                </div>
                                <div class="vx-col md:w-1/2 w-full mt-5">
                                    <label>{{$t('vehicle_book_id')}}</label>
                                    <vs-input v-model="vehicle_book_id" class="w-full"/>
                                </div>
                            </div>
                            <div class="vx-row">
                                <div class="vx-col md:w-1/2 w-full mt-5">
                                    <label>{{$t('possessor_type')}}</label>
                                    <vs-input v-model="possessor_type" class="w-full"/>
                                    <!-- <div class="error" v-if="invalid.std_vehicle_id">{{$t('std_vehicle_id')}}</div> -->
                                </div>
                                <div class="vx-col md:w-1/2 w-full mt-5">
                                    <label>{{$t('possessor_organize_name')}}</label>
                                    <vs-input v-model="possessor_organize_name" class="w-full"/>
                                </div>
                            </div>
                            <div class="vx-row">
                                <div class="vx-col md:w-1/6 w-full mt-5">
                                    <label>{{$t('possessor_prefix')}}</label>
                                    <vs-input v-model="possessor_prefix" class="w-full"/>
                                    <!-- <div class="error" v-if="invalid.std_vehicle_id">{{$t('std_vehicle_id')}}</div> -->
                                </div>
                                <div class="vx-col md:w-1/3 w-full mt-5">
                                    <label>{{$t('possessor_name')}}</label>
                                    <vs-input v-model="possessor_name" class="w-full"/>
                                </div>
                                <div class="vx-col md:w-1/2 w-full mt-5">
                                    <label>{{$t('possessor_surname')}}</label>
                                    <vs-input v-model="possessor_surname" class="w-full"/>
                                </div>
                            </div>
                            <div class="vx-row">
                                <div class="vx-col md:w-1/4 w-full mt-5">
                                    <label>{{$t('vehicle_check_year')}} </label>
                                    <vs-input v-model="vehicle_check_year" class="w-full"/>
                                    <!-- <div class="error" v-if="invalid.std_vehicle_id">{{$t('std_vehicle_id')}}</div> -->
                                </div>
                                <div class="vx-col md:w-1/3 w-full mt-5">
                                    <label>{{$t('driver1')}}</label>
                                    <vs-input v-model="driver1" class="w-full"/>
                                </div>
                                <div class="vx-col md:w-5/12 w-full mt-5">
                                    <label>{{$t('driver2')}}</label>
                                    <vs-input v-model="driver2" class="w-full"/>
                                </div>
                            </div>
                            <div class="vx-row" style="height:200px">
                              <div class="vx-col md:w-5/6 w-full mt-5">

                              </div>
                              <div class="vx-col md:w-1/6 w-full mt-5">
                                   <vs-button class="w-full" @click="submitted.step1=true;$refs.checkoutWizard.nextTab()">{{$t('next')}}</vs-button>
                              </div>
                            </div>
                          </div>
                  </tab-content>

                  <!-- tab 2 content -->
                  <tab-content :title="$t('address_data')" icon="feather icon-home" class="mb-5" :before-change="validStep2">

                    <div class="mt-3">
                            <div class="vx-row">
                                <div class="vx-col md:w-1/3 w-full mt-5">
                                    <label>{{$t('address')}}</label>
                                    <vs-input v-model="address" class="w-full" />
                                </div>
                                <div class="vx-col md:w-1/3 w-full mt-5">
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


                            </div>
                            <div class="vx-row">
                                <div class="vx-col md:w-1/2 w-full mt-5">
                                    <label>{{$t('department')}} <span class="require">*</span></label>
                                    <vs-select autocomplete class="w-full" v-model="operating_unit_id" :danger="invalid.operating_unit_id">
                                      <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in departments_view" />
                                    </vs-select>
                                    <div class="error" v-if="invalid.operating_unit_id">{{$t("department_alert")}}</div>
                                    <!-- <vs-input type="text" v-model="department" class="w-full" /> -->
                                </div>
                                <div class="vx-col md:w-1/2 w-full mt-5">
                                    <label>{{$t('department_type')}}</label>
                                    <vs-input v-model="department_type" class="w-full"/>
                                </div>
                            </div>
                            <div class="vx-row">
                                <div class="vx-col md:w-1/4 w-full mt-5">
                                    <label>{{$t('vehicle_type')}} <span class="require">*</span></label>
                                    <vs-input v-model="vehicle_type" class="w-full" :danger="invalid.vehicle_type"/>
                                    <div class="error" v-if="invalid.vehicle_type">{{$t('vehicle_type_alert')}}</div>
                                </div>
                                <div class="vx-col md:w-1/4 w-full mt-5">
                                    <label>{{$t('vehicle_using_type')}}<span class="require">*</span></label>
                                    <vs-input v-model="vehicle_using_type" class="w-full" :danger="invalid.vehicle_using_type"/>
                                    <div class="error" v-if="invalid.vehicle_using_type">{{$t('vehicle_using_type_alert')}}</div>
                                </div>
                                <div class="vx-col md:w-1/4 w-full mt-5">
                                    <label>{{$t('work_zone')}}</label>
                                    <vs-input v-model="work_zone" class="w-full"/>
                                </div>
                                <div class="vx-col md:w-1/4 w-full mt-5">
                                    <label>{{$t('parking_point')}}</label>
                                    <vs-input v-model="parking_point" class="w-full"/>
                                </div>
                            </div>

                            <div class="vx-row" style="height:200px">
                              <div class="vx-col md:w-5/6 w-full mt-5">

                              </div>
                              <div class="vx-col md:w-1/6 w-full mt-5">
                                   <vs-button class="w-full" @click="submitted.step2=true;$refs.checkoutWizard.nextTab()">{{$t('next')}}</vs-button>
                              </div>
                            </div>
                          </div>
                  </tab-content>

                  <!-- tab 3 content -->
                  <tab-content :title="$t('check_vehicle_data')" icon="feather icon-credit-card" class="mb-5">

                       <div class="mt-3">
                            <div class="vx-row">
                                <div class="vx-col md:w-1/3 w-full mt-5">
                                    <label>{{$t('license_issue_date')}}</label>
                                     <datepicker format="yyyy-MM-dd" v-model="license_issue_date" style="width:100%" class="w-full"></datepicker>
                                </div>
                                <div class="vx-col md:w-1/3 w-full mt-5">
                                    <label>{{$t('license_expire_date')}}</label>
                                     <datepicker format="yyyy-MM-dd" v-model="license_expire_date" style="width:100%" class="w-full"></datepicker>
                                </div>
                                <div class="vx-col md:w-1/3 w-full mt-5">
                                    <label>{{$t('check_result')}}</label>
                                    <vs-input v-model="result" class="w-full"/>
                                </div>
                            </div>
                            <div class="vx-row" style="height:250px;">
                              <div class="vx-col md:w-5/6 w-full mt-5">

                              </div>
                              <div class="vx-col md:w-1/6 w-full mt-5">
                                   <vs-button class="w-full" @click="$refs.checkoutWizard.nextTab()">{{$t('next')}}</vs-button>
                              </div>
                            </div>
                          </div>
                  </tab-content>
<!-- tab 4 -->
                  <tab-content :title="$t('register_data')" icon="feather icon-credit-card" class="mb-5" :before-change="validStep4">

                       <div class="mt-3">
                            <div class="vx-row" >
                                <div class="vx-col md:w-1/3 w-full mt-5">
                                    <label>{{$t('plate_register_date')}}</label>
                                     <datepicker format="yyyy-MM-dd" v-model="plate_register_date" style="width:100%" class="w-full"></datepicker>
                                </div>
                                <div class="vx-col md:w-1/3 w-full mt-5">
                                    <label>{{$t('plate_number')}} <span class="require">*</span></label>
                                    <vs-input v-model="plate_number" class="w-full" :danger="invalid.plate_number"/>
                                    <div class="error" v-if="invalid.plate_number">
                                        {{$t("plate_number_alert")}}
                                    </div>
                                </div>
                                <div class="vx-col md:w-1/3 w-full mt-5">
                                    <label>{{$t('plate_province')}}</label>
                                    <vs-input v-model="plate_province" class="w-full"/>
                                </div>
                            </div>
                            <div class="vx-row" >
                                <div class="vx-col md:w-1/3 w-full mt-5">
                                    <label>{{$t('car_type')}}</label>
                                    <vs-input v-model="car_type" class="w-full"/>
                                </div>
                                <div class="vx-col md:w-1/3 w-full mt-5">
                                    <label>{{$t('vehicle_style')}}</label>
                                    <vs-input v-model="vehicle_style" class="w-full"/>
                                </div>
                                <div class="vx-col md:w-1/3 w-full mt-5">
                                    <label>{{$t('brand_name')}}</label>
                                    <vs-input v-model="brand_name" class="w-full"/>
                                </div>
                            </div>
                            <div class="vx-row" >
                                <div class="vx-col md:w-1/3 w-full mt-5">
                                    <label>{{$t('car_model')}}</label>
                                    <vs-input v-model="car_model" class="w-full"/>
                                </div>
                                <div class="vx-col md:w-1/6 w-full mt-5">
                                    <label>{{$t('car_generation_year')}}</label>
                                    <vs-input v-model="car_generation_year" class="w-full"/>
                                </div>
                                <div class="vx-col md:w-1/6 w-full mt-5">
                                    <label>{{$t('car_color')}}</label>
                                    <vs-input v-model="car_color" class="w-full"/>
                                </div>
                                <div class="vx-col md:w-1/3 w-full mt-5">
                                    <label>{{$t('chossic_no')}}</label>
                                    <vs-input v-model="chossic_no" class="w-full"/>
                                </div>
                            </div>
                            <div class="vx-row" >
                                <div class="vx-col md:w-1/3 w-full mt-5">
                                    <label>{{$t('chassis_position')}}</label>
                                    <vs-input v-model="chassis_position" class="w-full"/>
                                </div>
                                <div class="vx-col md:w-1/3 w-full mt-5">
                                    <label>{{$t('engine_brand')}}</label>
                                    <vs-input v-model="engine_brand" class="w-full"/>
                                </div>
                                <div class="vx-col md:w-1/3 w-full mt-5">
                                    <label>{{$t('engine_no')}}</label>
                                    <vs-input v-model="engine_no" class="w-full"/>
                                </div>

                            </div>
                            <div class="vx-row" >
                                <div class="vx-col md:w-1/2 w-full mt-5">
                                    <label>{{$t('engine_no_position')}}</label>
                                    <vs-input v-model="engine_no_position" class="w-full"/>
                                </div>
                                <div class="vx-col md:w-1/4 w-full mt-5">
                                    <label>{{$t('fuel')}}</label>
                                    <vs-input v-model="fuel" class="w-full"/>
                                </div>
                                <div class="vx-col md:w-1/4 w-full mt-5">
                                    <label>{{$t('gas_no')}}</label>
                                    <vs-input v-model="gas_no" class="w-full"/>
                                </div>

                            </div>
                            <div class="vx-row" >
                                <div class="vx-col md:w-1/6 w-full mt-5">
                                    <label>{{$t('piston_count')}}</label>
                                    <vs-input v-model="piston_count" class="w-full"/>
                                </div>
                                <div class="vx-col md:w-1/3 w-full mt-5">
                                    <label>{{$t('piston_displacement')}}</label>
                                    <vs-input v-model="piston_displacement" class="w-full"/>
                                </div>
                                <div class="vx-col md:w-1/6 w-full mt-5">
                                    <label>{{$t('horse_power')}}</label>
                                    <vs-input v-model="horse_power" class="w-full"/>
                                </div>
                                <div class="vx-col md:w-1/6 w-full mt-5">
                                    <label>{{$t('axle_count')}}</label>
                                    <vs-input v-model="axle_count" class="w-full"/>
                                </div>
                                <div class="vx-col md:w-1/6 w-full mt-5">
                                    <label>{{$t('tire_count')}}</label>
                                    <vs-input v-model="tire_count" class="w-full"/>
                                </div>

                            </div>
                            <div class="vx-row" >
                                <div class="vx-col md:w-1/3 w-full mt-5">
                                    <label>{{$t('car_weight')}}</label>
                                    <vs-input v-model="car_weight" class="w-full"/>
                                </div>
                                <div class="vx-col md:w-1/3 w-full mt-5">
                                    <label>{{$t('container_weight')}}</label>
                                    <vs-input v-model="container_weight" class="w-full"/>
                                </div>

                                <div class="vx-col md:w-1/3 w-full mt-5">
                                    <label>{{$t('total_weight')}}</label>
                                    <vs-input v-model="total_weight" class="w-full"/>
                                </div>
                            </div>
                            <div class="vx-row" style="height:200px">
                              <div class="vx-col md:w-5/6 w-full mt-5">

                              </div>
                              <div class="vx-col md:w-1/6 w-full mt-5">
                                   <vs-button class="w-full" @click="submitted.step4=true;$refs.checkoutWizard.nextTab()">{{$t('next')}}</vs-button>
                              </div>
                            </div>
                          </div>
                  </tab-content>
                  <!-- tab 5 -->
                  <tab-content :title="$t('car_image_data')" icon="feather icon-credit-card" class="mb-5">

                       <div class="mt-3">
                            <div class="vx-row" style="height:400px">
                                <div class="vx-col md:w-1/2 w-full mt-5">
                                      <div style="border:1px solid black;width:100%;height:100%;padding:20px;overflow:hidden;">
                                         <label>{{$t('font_img')}}</label>
                                         <vs-input type="file" id="file" ref="myFiles"  class="w-full"  @change="onFileChange($event,'font_img')" />
                                           <img style="height:300px;width:auto;max-width:100%;margin-top:10px;text-align:center;" :src="url_font_img" class="responsive rounded-lg" alt="">
                                      </div>

                                </div>
                                <div class="vx-col md:w-1/2 w-full mt-5">
                                    <div style="border:1px solid black;width:100%;height:100%;padding:20px;overflow:hidden;">
                                      <label>{{$t('back_img')}}</label>
                                      <vs-input type="file" id="file" ref="myFiles"  class="w-full"  @change="onFileChange($event,'back_img')" />
                                      <img style="height:300px;width:auto;max-width:100%;margin-top:10px;text-align:center;" :src="url_back_img" class="responsive rounded-lg" alt="">
                                    </div>
                                </div>
                            </div>
                            <div class="vx-row" style="height:400px">
                                <div class="vx-col md:w-1/2 w-full mt-5">
                                    <div style="border:1px solid black;width:100%;height:100%;padding:20px;overflow:hidden;">

                                          <label>{{$t('left_img')}}</label>
                                         <vs-input type="file" id="file" ref="myFiles"  class="w-full"  @change="onFileChange($event,'left_img')" />
                                          <img style="height:300px;width:auto;max-width:100%;margin-top:10px;text-align:center;" :src="url_left_img" class="responsive rounded-lg" alt="">

                                      </div>
                                </div>
                                <div class="vx-col md:w-1/2 w-full mt-5">
                                    <div style="border:1px solid black;width:100%;height:100%;padding:20px;overflow:hidden;">
                                        <label>{{$t('right_img')}}</label>
                                         <vs-input type="file" id="file" ref="myFiles"  class="w-full"  @change="onFileChange($event,'right_img')" />
                                        <img style="height:300px;width:auto;max-width:100%;margin-top:10px;text-align:center;" :src="url_right_img" class="responsive rounded-lg" alt="">
                                      </div>
                                </div>
                            </div>
                            <div class="vx-row" style="height:400px">
                                <div class="vx-col md:w-1/2 w-full mt-5">
                                    <div style="border:1px solid black;width:100%;height:100%;padding:20px;overflow:hidden;">
                                         <label>{{$t('inner_img')}}</label>
                                         <vs-input type="file" id="file" ref="myFiles"  class="w-full"  @change="onFileChange($event,'inner_img')" />
                                        <img style="height:300px;width:auto;max-width:100%;margin-top:10px;text-align:center;" :src="url_inner_img" class="responsive rounded-lg" alt="">
                                    </div>
                                </div>

                            </div>
                            <div class="vx-row" style="height:200px">
                              <div class="vx-col md:w-5/6 w-full mt-5">

                              </div>
                              <div class="vx-col md:w-1/6 w-full mt-5">
                                   <vs-button class="w-full" @click="$refs.checkoutWizard.nextTab()">{{$t('next')}}</vs-button>
                              </div>
                            </div>
                          </div>
                  </tab-content>
                  <tab-content :title="$t('owner_data')" icon="feather icon-credit-card" class="mb-5">

                       <div class="mt-3">
                            <div class="vx-row" >
                                <div class="vx-col md:w-1/3 w-full mt-5">
                                    <label>{{$t('possesion_date')}}</label>
                                     <datepicker format="yyyy-MM-dd" v-model="possesion_date" style="width:100%" class="w-full"></datepicker>
                                </div>
                                <div class="vx-col md:w-1/3 w-full mt-5">
                                    <label>{{$t('owner_name')}}</label>
                                     <vs-input v-model="owner_name" class="w-full"/>
                                </div>
                                <div class="vx-col md:w-1/3 w-full mt-5">
                                    <label>{{$t('owner_card_id')}}</label>
                                    <vs-input v-model="owner_card_id" class="w-full"/>
                                </div>
                            </div>
                            <div class="vx-row">
                                <div class="vx-col md:w-1/2 w-full mt-5">
                                    <label>{{$t('owner_dob')}}</label>
                                     <datepicker format="yyyy-MM-dd" v-model="owner_dob" style="width:100%" class="w-full"></datepicker>
                                </div>
                                <div class="vx-col md:w-1/2 w-full mt-5">
                                    <label>{{$t('owner_nationality')}}</label>
                                     <vs-input v-model="owner_nationality" class="w-full"/>
                                </div>

                            </div>
                            <div class="vx-row" >
                                <div class="vx-col md:w-1/4 w-full mt-5">
                                    <label>{{$t('owner_address')}}</label>
                                     <vs-input v-model="owner_address" class="w-full"/>
                                </div>
                                <div class="vx-col md:w-1/4 w-full mt-5">
                                    <label>{{$t('owner_tel')}}</label>
                                     <vs-input v-model="owner_tel" class="w-full"/>
                                </div>
                                <div class="vx-col md:w-1/4 w-full mt-5" >
                                    <label>{{$t('rental_agreement_no')}}</label>
                                     <vs-input v-model="rental_agreement_no" class="w-full"/>
                                </div>
                                <div class="vx-col md:w-1/4 w-full mt-5">
                                    <label>{{$t('rent_date')}}</label>
                                      <datepicker format="yyyy-MM-dd" v-model="rent_date" style="width:100%" class="w-full"></datepicker>
                                </div>
                            </div>

                            <div class="vx-row" style="height:200px">
                              <div class="vx-col md:w-5/6 w-full mt-5">

                              </div>
                              <div class="vx-col md:w-1/6 w-full mt-5">
                                   <vs-button class="w-full" @click="$refs.checkoutWizard.nextTab()">{{$t('next')}}</vs-button>
                              </div>
                            </div>
                          </div>
                  </tab-content>
                  <tab-content :title="$t('save_detail')" icon="feather icon-credit-card" class="mb-5">

                       <div class="mt-3">
                            <div class="vx-row" >
                                <div class="vx-col md:w-1/2 w-full mt-5">
                                    <label>{{$t('draff_date')}}</label>
                                     <datepicker format="yyyy-MM-dd" v-model="draff_date" style="width:100%" class="w-full"></datepicker>
                                </div>
                                <div class="vx-col md:w-1/2 w-full mt-5">
                                    <label>{{$t('edit_date')}}</label>
                                     <datepicker format="yyyy-MM-dd" v-model="edit_date" style="width:100%" class="w-full"></datepicker>
                                </div>

                            </div>
                            <div class="vx-row">
                                <div class="vx-col md:w-1/2 w-full mt-5">
                                    <label>{{$t('data_status')}}</label>
                                    <vs-input v-model="data_status" class="w-full"/>
                                </div>
                                <div class="vx-col md:w-1/3 w-full mt-5">
                                    <label>{{$t('source_data')}}</label>
                                     <vs-input v-model="source_data" class="w-full"/>
                                </div>
                                <div class="vx-col md:w-1/3 w-full mt-5">
                                    <label>{{$t('outside_data_reference')}}</label>
                                     <vs-input v-model="outside_data_reference" class="w-full"/>
                                </div>
                                <!-- <div class="vx-col md:w-1/3 w-full mt-5">
                                    <label>{{$t('perform_count')}}</label>
                                    <vs-input v-model="perform_count" class="w-full"/>
                                </div> -->
                            </div>
                            <div class="vx-row" style="height:200px">
                              <div class="vx-col md:w-5/6 w-full mt-5">

                              </div>
                              <div class="vx-col md:w-1/6 w-full mt-5">
                                   <vs-button class="w-full" @click="save()">{{$t('save')}}</vs-button>
                              </div>
                            </div>
                          </div>
                  </tab-content>
              </form-wizard>

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
import EditVehicle from './extra-components/EditVehicle.vue';
import { FormWizard, TabContent } from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'

export default {
  components: {
    EditVehicle,
    Datepicker,
    FormWizard,
      TabContent
  },
   data(){
      return {
        submitted:{step1:false,step2:false,step3:false,step4:false,step5:false,step6:false,step7:false},
        renderComponent:true,
        addNewDataSidebar: false,
        vehicles:[],
        locations:[],
        vehicle:{},
        tambons:[],
        provinces:[],
        locale: this.$i18n.locale,
        departments:[],
        source_data:"",owner_dob:"",vehicle_id:"",std_vehicle_id:"",vehicle_book_id:"",possessor_type:"",possessor_organize_name:"",possessor_prefix:"",possessor_name:"",possessor_surname:"",vehicle_check_year:"",driver1:"",driver2:"",address:"",tambon:"",amphur:"",province:"",operating_unit_id:"",department_type:"",vehicle_type:"",vehicle_using_type:"",work_zone:"",parking_point:"",license_issue_date:"",license_expire_date:"",result:"",plate_register_date:"",plate_number:"",plate_province:"",car_type:"",vehicle_style:"",brand_name:"",car_model:"",car_generation_year:"",car_color:"",chassis_no:"",chassis_position:"",engine_brand:"",engine_no:"",engine_no_position:"",fuel:"",gas_no:"",piston_count:"",piston_displacement:"",horse_power:"",axle_count:"",tire_count:"",car_weight:"",container_weight:"",total_weight:"",font_img:"",back_img:"",left_img:"",right_img:"",inner_img:"",possesion_date:"",owner_name:"",owner_card_id:"",owner_bod:"",owner_nationality:"",owner_address:"",owner_tel:"",rental_agreement_no:"",rent_date:"",draff_date:"",edit_date:"",data_status:"",outside_data_reference:"",perform_count:""

      }
   },
   computed:{
     lang(){
       return this.$i18n.locale
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

     departments_view(){
          return this.departments.map((item)=>{
           return { value:item.operating_unit_id,text:item.operating_unit_name}
         })
     },
     url_font_img(){
        return "data:image/png;base64,"+this.font_img
    },
    url_back_img(){
        return "data:image/png;base64,"+this.back_img
    },url_left_img(){
        return "data:image/png;base64,"+this.left_img
    },
    url_right_img(){
        return "data:image/png;base64,"+this.right_img
    },
    url_inner_img(){
        return "data:image/png;base64,"+this.inner_img
    },
    invalid(){
          var c=(type)=>{
              return this[type]==""&&this.submitted.step1
          }
          var d=(type)=>{
              return this[type]==""&&this.submitted.step2
          }
          var e=type=>{
            return this[type]==""&&this.submitted.step4;
          }
          return {std_vehicle_id:c("std_vehicle_id"),operating_unit_id:d("operating_unit_id"),vehicle_type :d("vehicle_type"),vehicle_using_type:d("vehicle_using_type"),plate_number:e("plate_number")}
    },
    isInvalidStep1(){
      return this.invalid.std_vehicle_id;
    },
    isInvalidStep2(){
      return this.invalid.operating_unit_id||this.invalid.vehicle_type||this.invalid.vehicle_using_type
    },
    isInvalidStep4(){
      return this.invalid.plate_number;
    }
   },
   created(){
     this.getData();
     service.getExternalData("get_province").then((result)=>{
       console.log(result);
       if(!result.code){

         this.provinces=JSON.parse(JSON.stringify(result.data).replace(/\:null/gi, "\:\"\""));
         console.log("province",this.provinces);

       }
     },err=>{
       console.log(err);
     })
     service.getData("get_operating").then((result)=>{
       console.log(result);
       if(!result.code){
         this.departments=result.data;
       }
     })
   },
   methods: {
     onFileChange(e,type) {
          const file = e.target.files[0];
          // alert(2);
          // this.url = URL.createObjectURL(file);
          console.log(this.url);
           var reader = new FileReader();

            reader.onload = (e)=> {
              // $('#blah').attr('src', e.target.result);
              console.log(e.target.result);
              var base64=e.target.result;
              var index=base64.indexOf('base64,');
              console.log(index)
                // if(type=="font_img")

                this[type]=base64.substring(index+7,base64.length);

              // this.image=this.image;
            }

          reader.readAsDataURL(file);
          console.log(e);
        },
      forceRerender() {
        this.renderComponent = false;
        this.$nextTick(() => {
          this.renderComponent = true;
        });
      },
      getData(){
        service.getData("/get_vehicle").then((result)=>{
          if(!result.code){
           this.vehicles= JSON.parse(JSON.stringify(result.data).replace(/\:null/gi, "\:\"\""));
          }
        })
      },
      validStep1(){
        return new Promise((resolve,reject)=>{
          if(this.isInvalidStep1){
            reject("please input standard vehicle id");
          }else{
            // alert(2);
            resolve(true)
          }
        })
      },
      validStep2(){
        return new Promise((resolve,reject)=>{
          if(this.isInvalidStep2){
            reject("please input standard vehicle id");
          }else{
            // alert(2);
            resolve(true)
          }
        })
      },
      validStep4(){
        return new Promise((resolve,reject)=>{
          if(this.isInvalidStep4){
            reject("please input standard vehicle id");
          }else{
            // alert(2);
            resolve(true)
          }
        })
      },
      save(){
        service.postData('/add_vehicle',{
            vehicle_id:this.vehicle_id,std_vehicle_id:this.std_vehicle_id,vehicle_book_id:this.vehicle_book_id,possessor_type:this.possessor_type,possessor_organize_name:this.possessor_organize_name,possessor_prefix:this.possessor_prefix,possessor_name:this.possessor_name,possessor_surname:this.possessor_surname,vehicle_check_year:this.vehicle_check_year,driver1:this.driver1,driver2:this.driver2,address:this.address,tambon:this.tambon,amphur:this.amphur,province:this.province,operating_unit_id:this.operating_unit_id,department_type:this.department_type,vehicle_type:this.vehicle_type,vehicle_using_type:this.vehicle_using_type,work_zone:this.work_zone,parking_point:this.parking_point,license_issue_date:this.license_issue_date,license_expire_date:this.license_expire_date,result:this.result,plate_register_date:this.plate_register_date,plate_number:this.plate_number,plate_province:this.plate_province,car_type:this.car_type,vehicle_style:this.vehicle_style,brand_name:this.brand_name,car_model:this.car_model,car_generation_year:this.car_generation_year,car_color:this.car_color,chassis_no:this.chassis_no,chassis_position:this.chassis_position,engine_brand:this.engine_brand,engine_no:this.engine_no,engine_no_position:this.engine_no_position,fuel:this.fuel,gas_no:this.gas_no,piston_count:this.piston_count,piston_displacement:this.piston_displacement,horse_power:this.horse_power,axle_count:this.axle_count,tire_count:this.tire_count,car_weight:this.car_weight,container_weight:this.container_weight,total_weight:this.total_weight,font_img:this.font_img,back_img:this.back_img,left_img:this.left_img,right_img:this.right_img,inner_img:this.inner_img,possesion_date:this.possesion_date,owner_name:this.owner_name,owner_card_id:this.owner_card_id,owner_bod:this.owner_bod,owner_nationality:this.owner_nationality,owner_address:this.owner_address,owner_tel:this.owner_tel,rental_agreement_no:this.rental_agreement_no,rent_date:this.rent_date,draff_date:this.draff_date,edit_date:this.edit_date,data_status:this.data_status,outside_data_reference:this.outside_data_reference,perform_count:this.perform_count,source_data:this.source_data
        }).then((result)=>{
          if(!result.code){
            this.getData();
            this.forceRerender();
          }
        },err=>{
          console.log(err);
        })
      },
      delete_vehicle(vehicle){
        this.$swal({
          title:this.$t('delete_vehicle_title'),
          text: this.$t('delete_vehicle_text'),
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText:this.$t('cancel'),
          confirmButtonText:this.$t('confirm_delete'),
          showLoaderOnConfirm: true,
          preConfirm:()=>{
            return service.deleteData(`delete_vehicle?vehicle_id=${vehicle.vehicle_id}`).then((result)=>{

              return result;
            },err=>{
              throw new Error(err)
            })

          }
        }).then((result) => {
          if(!result.code){
                this.$swal(
                  this.$t('deleted'),
                  '',
                  'success'
                ).then(result=>{
                   this.getData();
                })
              }

        })
      }
    },
  watch: {
      lang(val){
        this.forceRerender();
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
      addNewDataSidebar(val){
        if(!val){
          this.getData();
        }
      }
    }
}
</script>

