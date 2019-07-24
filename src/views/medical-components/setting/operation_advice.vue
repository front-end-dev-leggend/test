<template>
  <vx-card >

    <div class="vx-row">
       <h6> {{$t('screening_advice')}}</h6>
    </div>
    <div class="vx-row">

       <quill-editor v-model="advices.screening"></quill-editor>
    </div>
    <br><br>
    <div class="vx-row">
        <h6> {{$t('command_advice')}}</h6>
    </div>
    <div class="vx-row">
       <quill-editor v-model="advices.command"></quill-editor>
    </div>
     <br><br>
    <div class="vx-row">
        <h6>{{$t('reported_advice')}}</h6>
    </div>
    <div class="vx-row">
       <quill-editor v-model="advices.reported"></quill-editor>
    </div>
     <br><br>
    <br><br><br><br><br>
    <div class="vx-row" style="border-bottom:none">
           <div class="vx-col w-full mt-5">
              <vs-button color="danger" type="border">{{$t('cancel')}}</vs-button>
              <vs-button  ref="loadableButton" id="button-with-loading" class="vs-con-loading__container" vslor="primary" @click="save">{{$t('save')}}</vs-button>
       </div>
        </div>
      <!-- <div class="vx-row" style="border-bottom:none" v-html="advices.screening_advice">

        </div> -->

  </vx-card>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor';
import service from '@/service/service';
export default {
    components: {
      quillEditor,
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
        save(){
          service.postData("update_advice",this.advices).then((result)=>{
              if(!result.code){
                 this.$swal(this.$t('success_title'),'','success').then(result=>{
                  // this.getData();
                },err=>{
                    this.$swal(result.message,'','error');
                })
              }
           })
        }
    },
    watch:{

    }
}
</script>

<style lang="scss" scoped>
    button{
    float:right;
    margin-right:10px;
  }
  .vx-row:nth-child(even){
    margin-top:30px;
    margin-bottom:30px;
  }
</style>
