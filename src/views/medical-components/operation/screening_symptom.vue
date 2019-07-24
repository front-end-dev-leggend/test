<template>
  <div class="vx-col w-full mb-base" v-if="renderComponent">
      <vx-card>
          <vs-tabs>
              <vs-tab :label="$t('screening_view')">
                  
              </vs-tab>
          </vs-tabs>
      </vx-card>
  </div>
</template>

<script>
import moment from "moment";
export default {
    components:{

    },data(){
        return{
            renderComponent:true
        }
    }
};
</script>

<style>
</style>
