
<template>
  <vs-sidebar click-not-close position-right parent="body" default-index="1" color="primary" class="add-new-data-sidebar items-no-padding" spacer v-model="isSidebarActiveLocal">
    <div class="mt-6 flex items-center justify-between px-6">

        <h4>{{$t('edit_data')}}</h4>
        <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <VuePerfectScrollbar class="scroll-area--data-list-add-new pt-4 pb-6" :settings="settings">
        <div class="vx-col w-full mb-base" style="padding:20px">
           <form-wizard
                  ref="checkoutWizard"
                  color="rgba(var(--vs-primary), 1)"
                  :title="null"
                  :subtitle="null"
                  :hide-buttons="true"  v-if="renderComponent">

                  <!-- tab 1 content -->

                  <tab-content :title="$t('general_data')" icon="feather icon-shopping-cart" class="mb-5" :before-change="validStep1">
                          <div class="mt-3">
                            <div class="vx-row">
                                <div class="vx-col md:w-1/2 w-full mt-5">
                                    <label>{{$t('std_vehicle_id')}} <span class="require">*</span></label>
                                    <vs-input v-model="vehicle.std_vehicle_id" class="w-full" :danger="invalid.std_vehicle_id"/>
                                    <div class="error" v-if="invalid.std_vehicle_id">{{$t('std_vehicle_id')}}</div>
                                </div>
                                <div class="vx-col md:w-1/2 w-full mt-5">
                                    <label>{{$t('vehicle_book_id')}}</label>
                                    <vs-input v-model="vehicle.vehicle_book_id" class="w-full"/>
                                </div>
                            </div>
                            <div class="vx-row">
                                <div class="vx-col md:w-1/2 w-full mt-5">
                                    <label>{{$t('possessor_type')}}</label>
                                    <vs-input v-model="vehicle.possessor_type" class="w-full"/>
                                    <!-- <div class="error" v-if="invalid.std_vehicle_id">{{$t('std_vehicle_id')}}</div> -->
                                </div>
                                <div class="vx-col md:w-1/2 w-full mt-5">
                                    <label>{{$t('possessor_organize_name')}}</label>
                                    <vs-input v-model="vehicle.possessor_organize_name" class="w-full"/>
                                </div>
                            </div>
                            <div class="vx-row">
                                <div class="vx-col md:w-1/6 w-full mt-5">
                                    <label>{{$t('possessor_prefix')}}</label>
                                    <vs-input v-model="vehicle.possessor_prefix" class="w-full"/>
                                    <!-- <div class="error" v-if="invalid.std_vehicle_id">{{$t('std_vehicle_id')}}</div> -->
                                </div>
                                <div class="vx-col md:w-1/3 w-full mt-5">
                                    <label>{{$t('possessor_name')}}</label>
                                    <vs-input v-model="vehicle.possessor_name" class="w-full"/>
                                </div>
                                <div class="vx-col md:w-1/2 w-full mt-5">
                                    <label>{{$t('possessor_surname')}}</label>
                                    <vs-input v-model="vehicle.possessor_surname" class="w-full"/>
                                </div>
                            </div>
                            <div class="vx-row">
                                <div class="vx-col md:w-1/4 w-full mt-5">
                                    <label>{{$t('vehicle_check_year')}} </label>
                                    <vs-input v-model="vehicle.vehicle_check_year" class="w-full"/>
                                    <!-- <div class="error" v-if="invalid.std_vehicle_id">{{$t('std_vehicle_id')}}</div> -->
                                </div>
                                <div class="vx-col md:w-1/3 w-full mt-5">
                                    <label>{{$t('driver1')}}</label>
                                    <vs-input v-model="vehicle.driver1" class="w-full"/>
                                </div>
                                <div class="vx-col md:w-5/12 w-full mt-5">
                                    <label>{{$t('driver2')}}</label>
                                    <vs-input v-model="vehicle.driver2" class="w-full"/>
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
                                    <vs-input v-model="vehicle.address" class="w-full" />
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
                                    <vs-select autocomplete class="w-full" v-model="vehicle.tambon">
                                      <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in tambon_view" />
                                    </vs-select>
                                    <!-- <vs-input type="text" :label="$t('tambon')"  v-model="vehicle.now_tambon" class="w-full" /> -->
                                </div>

<!--
                                <div class="vx-col md:w-1/6 w-full mt-5">
                                    <label>{{$t('postcode')}}</label>
                                    <vs-select autocomplete class="w-full" v-model="vehicle.postcode">
                                      <vs-select-item :key="index" :value="item" :text="item" v-for="(item,index) in postcodes" />
                                    </vs-select>

                                </div> -->
                            </div>
                            <div class="vx-row">
                                <div class="vx-col md:w-1/2 w-full mt-5">
                                    <label>{{$t('department')}} <span class="require">*</span></label>
                                    <vs-select autocomplete class="w-full" v-model="vehicle.operating_unit_id" :danger="invalid.operating_unit_id">
                                      <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in departments_view" />
                                    </vs-select>
                                    <div class="error" v-if="invalid.operating_unit_id">{{$t("operating_unit_alert_id")}}</div>
                                    <!-- <vs-input type="text" v-model="vehicle.department" class="w-full" /> -->
                                </div>
                                <div class="vx-col md:w-1/2 w-full mt-5">
                                    <label>{{$t('department_type')}}</label>
                                    <vs-input v-model="vehicle.department_type" class="w-full"/>
                                </div>
                            </div>
                            <div class="vx-row">
                                <div class="vx-col md:w-1/4 w-full mt-5">
                                    <label>{{$t('vehicle_type')}} <span class="require">*</span></label>
                                    <vs-input v-model="vehicle.vehicle_type" class="w-full" :danger="invalid.vehicle_type" />
                                    <div class="error" v-if="invalid.vehicle_type">{{$t('vehicle_type_alert')}}</div>
                                </div>
                                <div class="vx-col md:w-1/4 w-full mt-5">
                                    <label>{{$t('vehicle_using_type')}}<span class="require">*</span></label>
                                    <vs-input v-model="vehicle.vehicle_using_type" :danger="invalid.vehicle_using_type" class="w-full"/>
                                    <div class="error" v-if="invalid.vehicle_using_type">
                                      {{$t("vehicle_using_type_alert")}}
                                    </div>
                                </div>
                                <div class="vx-col md:w-1/4 w-full mt-5">
                                    <label>{{$t('work_zone')}} </label>
                                    <vs-input v-model="vehicle.work_zone" class="w-full"/>
                                </div>
                                <div class="vx-col md:w-1/4 w-full mt-5">
                                    <label>{{$t('parking_point')}}</label>
                                    <vs-input v-model="vehicle.parking_point" class="w-full"/>
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
                                     <datepicker format="yyyy-MM-dd" v-model="vehicle.license_issue_date" style="width:100%" class="w-full"></datepicker>
                                </div>
                                <div class="vx-col md:w-1/3 w-full mt-5">
                                    <label>{{$t('license_expire_date')}}</label>
                                     <datepicker format="yyyy-MM-dd" v-model="vehicle.license_expire_date" style="width:100%" class="w-full"></datepicker>
                                </div>
                                <div class="vx-col md:w-1/3 w-full mt-5">
                                    <label>{{$t('check_result')}}</label>
                                    <vs-input v-model="vehicle.result" class="w-full"/>
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
                                     <datepicker format="yyyy-MM-dd" v-model="vehicle.plate_register_date" style="width:100%" class="w-full"></datepicker>
                                </div>
                                <div class="vx-col md:w-1/3 w-full mt-5">
                                    <label>{{$t('plate_number')}} <span class="require">*</span></label>
                                    <vs-input v-model="vehicle.plate_number" :danger="invalid.plate_number" class="w-full"/>
                                    <div class="error" v-if="invalid.plate_numer">{{$t('plate_number_alert')}}</div>
                                </div>
                                <div class="vx-col md:w-1/3 w-full mt-5">
                                    <label>{{$t('plate_province')}}</label>
                                    <vs-input v-model="vehicle.plate_province" class="w-full"/>
                                </div>
                            </div>
                            <div class="vx-row" >
                                <div class="vx-col md:w-1/3 w-full mt-5">
                                    <label>{{$t('car_type')}}</label>
                                    <vs-input v-model="vehicle.car_type" class="w-full"/>
                                </div>
                                <div class="vx-col md:w-1/3 w-full mt-5">
                                    <label>{{$t('vehicle_style')}}</label>
                                    <vs-input v-model="vehicle.vehicle_style" class="w-full"/>
                                </div>
                                <div class="vx-col md:w-1/3 w-full mt-5">
                                    <label>{{$t('brand_name')}}</label>
                                    <vs-input v-model="vehicle.brand_name" class="w-full"/>
                                </div>
                            </div>
                            <div class="vx-row" >
                                <div class="vx-col md:w-1/3 w-full mt-5">
                                    <label>{{$t('car_model')}}</label>
                                    <vs-input v-model="vehicle.car_model" class="w-full"/>
                                </div>
                                <div class="vx-col md:w-1/6 w-full mt-5">
                                    <label>{{$t('car_generation_year')}}</label>
                                    <vs-input v-model="vehicle.car_generation_year" class="w-full"/>
                                </div>
                                <div class="vx-col md:w-1/6 w-full mt-5">
                                    <label>{{$t('car_color')}}</label>
                                    <vs-input v-model="vehicle.car_color" class="w-full"/>
                                </div>
                                <div class="vx-col md:w-1/3 w-full mt-5">
                                    <label>{{$t('chossic_no')}}</label>
                                    <vs-input v-model="vehicle.chossic_no" class="w-full"/>
                                </div>
                            </div>
                            <div class="vx-row" >
                                <div class="vx-col md:w-1/3 w-full mt-5">
                                    <label>{{$t('chassis_position')}}</label>
                                    <vs-input v-model="vehicle.chassis_position" class="w-full"/>
                                </div>
                                <div class="vx-col md:w-1/3 w-full mt-5">
                                    <label>{{$t('engine_brand')}}</label>
                                    <vs-input v-model="vehicle.engine_brand" class="w-full"/>
                                </div>
                                <div class="vx-col md:w-1/3 w-full mt-5">
                                    <label>{{$t('engine_no')}}</label>
                                    <vs-input v-model="vehicle.engine_no" class="w-full"/>
                                </div>

                            </div>
                            <div class="vx-row" >
                                <div class="vx-col md:w-1/2 w-full mt-5">
                                    <label>{{$t('engine_no_position')}}</label>
                                    <vs-input v-model="vehicle.engine_no_position" class="w-full"/>
                                </div>
                                <div class="vx-col md:w-1/4 w-full mt-5">
                                    <label>{{$t('fuel')}}</label>
                                    <vs-input v-model="vehicle.fuel" class="w-full"/>
                                </div>
                                <div class="vx-col md:w-1/4 w-full mt-5">
                                    <label>{{$t('gas_no')}}</label>
                                    <vs-input v-model="vehicle.gas_no" class="w-full"/>
                                </div>

                            </div>
                            <div class="vx-row" >
                                <div class="vx-col md:w-1/6 w-full mt-5">
                                    <label>{{$t('piston_count')}}</label>
                                    <vs-input v-model="vehicle.piston_count" class="w-full"/>
                                </div>
                                <div class="vx-col md:w-1/3 w-full mt-5">
                                    <label>{{$t('piston_displacement')}}</label>
                                    <vs-input v-model="vehicle.piston_displacement" class="w-full"/>
                                </div>
                                <div class="vx-col md:w-1/6 w-full mt-5">
                                    <label>{{$t('horse_power')}}</label>
                                    <vs-input v-model="vehicle.horse_power" class="w-full"/>
                                </div>
                                <div class="vx-col md:w-1/6 w-full mt-5">
                                    <label>{{$t('axle_count')}}</label>
                                    <vs-input v-model="vehicle.axle_count" class="w-full"/>
                                </div>
                                <div class="vx-col md:w-1/6 w-full mt-5">
                                    <label>{{$t('tire_count')}}</label>
                                    <vs-input v-model="vehicle.tire_count" class="w-full"/>
                                </div>

                            </div>
                            <div class="vx-row" >
                                <div class="vx-col md:w-1/3 w-full mt-5">
                                    <label>{{$t('car_weight')}}</label>
                                    <vs-input v-model="vehicle.car_weight" class="w-full"/>
                                </div>
                                <div class="vx-col md:w-1/3 w-full mt-5">
                                    <label>{{$t('container_weight')}}</label>
                                    <vs-input v-model="vehicle.container_weight" class="w-full"/>
                                </div>

                                <div class="vx-col md:w-1/3 w-full mt-5">
                                    <label>{{$t('total_weight')}}</label>
                                    <vs-input v-model="vehicle.total_weight" class="w-full"/>
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
                  <!-- 5 -->
                  <tab-content :title="$t('car_image_data')" icon="feather icon-credit-card" class="mb-5" >

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
                                     <datepicker format="yyyy-MM-dd" v-model="vehicle.possesion_date" style="width:100%" class="w-full"></datepicker>
                                </div>
                                <div class="vx-col md:w-1/3 w-full mt-5">
                                    <label>{{$t('owner_name')}}</label>
                                     <vs-input v-model="vehicle.owner_name" class="w-full"/>
                                </div>
                                <div class="vx-col md:w-1/3 w-full mt-5">
                                    <label>{{$t('owner_card_id')}}</label>
                                    <vs-input v-model="vehicle.owner_card_id" class="w-full"/>
                                </div>
                            </div>
                            <div class="vx-row">
                                <div class="vx-col md:w-1/2 w-full mt-5">
                                    <label>{{$t('owner_dob')}}</label>
                                     <datepicker format="yyyy-MM-dd" v-model="vehicle.owner_dob" style="width:100%" class="w-full"></datepicker>
                                </div>
                                <div class="vx-col md:w-1/2 w-full mt-5">
                                    <label>{{$t('owner_nationality')}}</label>
                                     <vs-input v-model="vehicle.owner_nationality" class="w-full"/>
                                </div>

                            </div>
                            <div class="vx-row" >
                                <div class="vx-col md:w-1/4 w-full mt-5">
                                    <label>{{$t('owner_address')}}</label>
                                     <vs-input v-model="vehicle.owner_address" class="w-full"/>
                                </div>
                                <div class="vx-col md:w-1/4 w-full mt-5">
                                    <label>{{$t('owner_tel')}}</label>
                                     <vs-input v-model="vehicle.owner_tel" class="w-full"/>
                                </div>
                                <div class="vx-col md:w-1/4 w-full mt-5" >
                                    <label>{{$t('rental_agreement_no')}}</label>
                                     <vs-input v-model="vehicle.rental_agreement_no" class="w-full"/>
                                </div>
                                <div class="vx-col md:w-1/4 w-full mt-5">
                                    <label>{{$t('rent_date')}}</label>
                                      <datepicker format="yyyy-MM-dd" v-model="vehicle.rent_date" style="width:100%" class="w-full"></datepicker>
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
                  <tab-content :title="$t('check_vehicle_data')" icon="feather icon-credit-card" class="mb-5">

                       <div class="mt-3">
                            <div class="vx-row" >
                                <div class="vx-col md:w-1/2 w-full mt-5">
                                    <label>{{$t('draff_date')}}</label>
                                     <datepicker format="yyyy-MM-dd" v-modetl="vehicle.draff_date" style="width:100%" class="w-full"></datepicker>
                                </div>
                                <div class="vx-col md:w-1/2 w-full mt-5">
                                    <label>{{$t('edit_date')}}</label>
                                     <datepicker format="yyyy-MM-dd" v-model="vehicle.edit_date" style="width:100%" class="w-full"></datepicker>
                                </div>

                            </div>
                            <div class="vx-row">
                                <div class="vx-col md:w-1/3 w-full mt-5">
                                    <label>{{$t('data_status')}}</label>
                                    <vs-input v-model="vehicle.data_status" class="w-full"/>
                                </div>
                                <div class="vx-col md:w-1/3 w-full mt-5">
                                    <label>{{$t('source_data')}}</label>
                                     <vs-input v-model="vehicle.source_data" class="w-full"/>
                                </div>
                                <div class="vx-col md:w-1/3 w-full mt-5">
                                    <label>{{$t('outside_data_reference')}}</label>
                                     <vs-input v-model="vehicle.outside_data_reference" class="w-full"/>
                                </div>

                            </div>
                            <div class="vx-row" style="height:200px">
                              <div class="vx-col md:w-5/6 w-full mt-5">

                              </div>
                              <div class="vx-col md:w-1/6 w-full mt-5">
                                   <vs-button class="w-full" @click="save()">{{$t('edit')}}</vs-button>
                              </div>
                            </div>
                          </div>
                  </tab-content>
              </form-wizard>

        </div>
    </VuePerfectScrollbar>

  </vs-sidebar>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import Datepicker from 'vuejs-datepicker';
import service from '@/service/service';
import { setTimeout } from 'timers';
import { FormWizard, TabContent } from 'vue-form-wizard'
export default {
  props: {
    isSidebarActive: {
      type: Boolean,
      required: true
    },
    vehicle:{
      type:Object,
      required:true
    }
  },
  data() {
    return {
      renderComponent:false,
      vehicles:[],
      submitted:{step1:false,step2:false,step3:false,step4:false,step5:false,step6:false,step7:false},
        locations:[],
        vehicle:{},
        tambons:[],
        provinces:[],
        locale: this.$i18n.locale,
        departments:[],
      settings: { // perfectscrollbar settings
          maxScrollbarLength: 60,
          wheelSpeed: .60,
      },
    }
  },


  components: {
    Datepicker,
    VuePerfectScrollbar,
    FormWizard, TabContent
  },
    computed:{
      isSidebarActiveLocal: {
      get() {
        return this.isSidebarActive
      },
      set(val) {
        if(!val) {
          this.$emit('closeSidebar');
          this.initValues();
        }
      }
    },
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
    //  postcodes(){
    //    return this.locations.filter((item)=>item.en_amphur==this.amphur&&item.en_tambon==this.vehicle.tambon).map((item)=>item.postcode)
    //  },
     departments_view(){
          return this.departments.map((item)=>{
           return { value:item.operating_unit_id,text:item.operating_unit_name}
         })
     },
     url_font_img(){
          return "data:image/png;base64,"+this.vehicle.font_img
      },
      url_back_img(){
          return "data:image/png;base64,"+this.vehicle.back_img
      },url_left_img(){
          return "data:image/png;base64,"+this.vehicle.left_img
      },
      url_right_img(){
          return "data:image/png;base64,"+this.vehicle.right_img
      },
      url_inner_img(){
          return "data:image/png;base64,"+this.vehicle.inner_img
      },
      invalid(){
          var c=(type)=>{
              return this.vehicle[type]==""&&this.submitted.step1
          }
          var d=(type)=>{
              return this.vehicle[type]==""&&this.submitted.step2
          }
          var e=type=>{
            return this.vehicle[type]==""&&this.submitted.step4;
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
        save(){
          service.postData("update_vehicle",this.vehicle).then((result)=>{
            if(!result.code){
              this.isSidebarActiveLocal=false;
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

                this.vehicle[type]=base64.substring(index+7,base64.length);

              // this.image=this.image;
            }

          reader.readAsDataURL(file);
          console.log(e);
        },
    },
  watch: {
        vehicle(val){
          // alert(JSON.stringify(val))
          if(JSON.stringify(val)!="{}"&&val.province){
            this.province=val.province;
            this.amphur=val.amphur;
            service.getExternalData('/get_location?province='+this.province).then((result)=>{
            if(!result.code){
            this.locations=result.data;
              if(val.amphur){
                this.tambons=this.locations.filter((item)=>item.en_amphur==val.amphur);
              }
            }

          },err=>{
            console.log(err);
          })
          }
          this.forceRerender()
        },
        province(val){
          this.vehicle.province=val;
          service.getExternalData('/get_location?province='+val).then((result)=>{
            if(!result.code){
              this.locations=result.data;

            }
          },err=>{
            console.log(err);
          })
        },

       amphur(val){
          this.vehicle.amphur=val;
          this.tambons=this.locations.filter((item)=>item.en_amphur==val);
          // console.log(card_tambons);
        },
    }

}
</script>

<style lang="scss" scoped>
.add-new-data-sidebar {
  /deep/ .vs-sidebar--background {
    z-index: 52010;
  }

  /deep/ .vs-sidebar {
    z-index: 52010;
    width: 80%;
    max-width: 90vw;

    .img-upload {
      margin-top: 2rem;

      .con-img-upload {
        padding: 0;
      }

      .con-input-upload {
        width: 100%;
        margin: 0;
      }
    }
  }
}

.scroll-area--data-list-add-new {
    height: calc(100% - 4.3rem);
}
button{
    float:right;
    margin-right:10px;
  }

</style>
<style>
.require{
    color: red;
  }
  .vdp-datepicker input {
    padding: .7rem;
    font-size: 1rem;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    color: #626262;
    width: 100% !important;
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
    font-size:50%;
  }
</style>
