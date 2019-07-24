<template>
  <div class="vx-col w-full mb-base">
			<vx-card>
         <vs-collapse type="margin" accordion>

            <vs-collapse-item>

                <div slot="header">{{$t('emergency_medecine_data')}}</div>

                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque rhoncus eros tortor, non fringilla lectus cursus et. Fusce vel nisi ante. Aliquam sit amet lectus pharetra, luctus mi sed, aliquet felis. Mauris a tortor viverra, ornare tellus in, consectetur leo.
                <br><br>
                Etiam nec nunc nec nisl luctus tincidunt efficitur vitae elit. Vestibulum iaculis nibh commodo neque ultrices lobortis. Cras magna massa, pretium vitae mattis varius, pharetra nec massa. Aliquam ac ex enim. Quisque consequat dui libero, vel blandit lorem porttitor sit amet. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nullam sed lobortis nisl, quis eleifend metus.
            </vs-collapse-item>

            <vs-collapse-item>

                <div slot="header">{{$t('emergency_hospitalize_Lead_symptom_type')}}</div>

                Nunc auctor et leo vitae suscipit. Nullam aliquet purus scelerisque enim hendrerit tristique. Maecenas tincidunt dui arcu, a aliquet nisl venenatis vitae. Praesent mauris ligula, porta at maximus ac, rutrum vitae sapien. Donec a sapien id erat dapibus dignissim sodales in est. Donec gravida dapibus sapien at sollicitudin. Maecenas iaculis quam ex,
                <br><br>
                eu aliquam erat sagittis eget. Suspendisse mollis felis nec ipsum vehicula, at posuere libero viverra. Nam hendrerit dapibus eleifend. Aliquam elit nulla, tincidunt pellentesque enim mollis, consectetur placerat enim. Integer condimentum tristique ante et ullamcorper. Mauris placerat pretium ex. Nam aliquam sed tortor sit amet
                <br><br>
                efficitur. Mauris quis faucibus nulla. Pellentesque egestas non ipsum vel maximus.
            </vs-collapse-item>

             <vs-collapse-item>

                <div slot="header">{{$t('injuring_hospital_lead_sypmtom_type')}}</div>

                Nunc auctor et leo vitae suscipit. Nullam aliquet purus scelerisque enim hendrerit tristique. Maecenas tincidunt dui arcu, a aliquet nisl venenatis vitae. Praesent mauris ligula, porta at maximus ac, rutrum vitae sapien. Donec a sapien id erat dapibus dignissim sodales in est. Donec gravida dapibus sapien at sollicitudin. Maecenas iaculis quam ex,
                <br><br>
                eu aliquam erat sagittis eget. Suspendisse mollis felis nec ipsum vehicula, at posuere libero viverra. Nam hendrerit dapibus eleifend. Aliquam elit nulla, tincidunt pellentesque enim mollis, consectetur placerat enim. Integer condimentum tristique ante et ullamcorper. Mauris placerat pretium ex. Nam aliquam sed tortor sit amet
                <br><br>
                efficitur. Mauris quis faucibus nulla. Pellentesque egestas non ipsum vel maximus.
            </vs-collapse-item>


            <vs-collapse-item>

                <div slot="header">{{$t('testing_befor_operator')}}</div>

                Suspendisse aliquet condimentum diam, sed aliquam nisl dapibus et. Aliquam euismod ullamcorper dolor eu imperdiet. Nullam eget odio at magna gravida suscipit sed vestibulum odio. Maecenas porta elit vel lectus molestie, eget aliquam enim feugiat. Vivamus nec faucibus nisl. Nunc venenatis tempus finibus.
            </vs-collapse-item>
            <vs-collapse-item>

                <div slot="header">{{$t('summarize_patient_detail')}}</div>

                Suspendisse aliquet condimentum diam, sed aliquam nisl dapibus et. Aliquam euismod ullamcorper dolor eu imperdiet. Nullam eget odio at magna gravida suscipit sed vestibulum odio. Maecenas porta elit vel lectus molestie, eget aliquam enim feugiat. Vivamus nec faucibus nisl. Nunc venenatis tempus finibus.
            </vs-collapse-item>
            <vs-collapse-item>

                <div slot="header">{{$t("necessary_information")}}</div>

                Suspendisse aliquet condimentum diam, sed aliquam nisl dapibus et. Aliquam euismod ullamcorper dolor eu imperdiet. Nullam eget odio at magna gravida suscipit sed vestibulum odio. Maecenas porta elit vel lectus molestie, eget aliquam enim feugiat. Vivamus nec faucibus nisl. Nunc venenatis tempus finibus.
            </vs-collapse-item>
            <vs-collapse-item>

                <div slot="header">{{$t("help_patient_data")}}</div>

                Suspendisse aliquet condimentum diam, sed aliquam nisl dapibus et. Aliquam euismod ullamcorper dolor eu imperdiet. Nullam eget odio at magna gravida suscipit sed vestibulum odio. Maecenas porta elit vel lectus molestie, eget aliquam enim feugiat. Vivamus nec faucibus nisl. Nunc venenatis tempus finibus.
            </vs-collapse-item>
            <vs-collapse-item >

                <div slot="header">{{$t("screening_advice")}}</div>

                <div class="mt-5" style="overflow:scroll">
                  <div v-html="advices.screening"></div>
                </div>
            </vs-collapse-item>
             <vs-collapse-item>
                <div slot="header">{{$t("command_advice")}}</div>
                <div class="mt-5">
                  <div v-html="advices.command"></div>
                </div>
            </vs-collapse-item>
            <vs-collapse-item style="overflow:scroll">
                <div slot="header">{{$t("reported_advice")}}</div>
                <div class="mt-5">
                  <div v-html="advices.reported"></div>
                </div>
            </vs-collapse-item>
        </vs-collapse>
			</vx-card>
  </div>


</template>

<script>

import service from '@/service/service';
export default {
    components: {
      // quillEditor,
    },
    data(){
      return{
        advices:{},
        content:"",
      }
    },
    computed:{

    },
    created(){
        service.getData("get_advice").then((result)=>{
          var {screening_advice,command_advice,reported_advice}=result.data[0];
          this.advices={screening:screening_advice,command:command_advice,reported:reported_advice};
        })
    },
    methods:{

    },
    watch:{

    }
}
</script>

<style>

</style>
