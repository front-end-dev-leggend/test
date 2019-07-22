<template>
    	<div class="vx-col w-full mb-base">
			<vx-card>
          <iframe style="height:100vh" width="100%" src="https://www.sanook.com/news/tag/%E0%B8%AD%E0%B8%B8%E0%B8%9A%E0%B8%B1%E0%B8%95%E0%B8%B4%E0%B9%80%E0%B8%AB%E0%B8%95%E0%B8%B8/" name="iframe_a"></iframe>

			</vx-card>
      <!-- <div class="vx-col w-full lg:w-1/3 sm:w-1/2 mb-base">
                <vx-card :title="card_9.title" :subtitle="card_9.subtitle">
                    <template slot="actions">
                        <feather-icon icon="MoreVerticalIcon" svgClasses="w-6 h-6 text-grey"></feather-icon>
                    </template>
                    <img :src="require(`@/assets/images/pages/${card_9.img}`)" alt="content-img" class="responsive rounded-lg">
                    <div class="flex mt-6 flex-wrap">
                        <span class="flex mr-6"><feather-icon class="cursor-pointer" icon="ThumbsUpIcon" svgClasses="text-success stroke-current h-6 w-6"></feather-icon><span class="ml-2">368</span></span>
                        <span class="flex mr-6"><feather-icon class="cursor-pointer" icon="MessageSquareIcon" svgClasses="text-primary stroke-current h-6 w-6"></feather-icon><span class="ml-2">341</span></span>
                        <span class="flex mr-6"><feather-icon class="cursor-pointer" icon="ThumbsDownIcon" svgClasses="text-danger stroke-current h-6 w-6"></feather-icon><span class="ml-2">53</span></span>
                    </div>
                </vx-card>
            </div> -->
		</div>
</template>
<style>

  /* .vs-select--input {
      color:rgb(255, 159, 67);;


  } */
  .img{
    width:100%;
    height:145px;
  }
  /* .con-select .vs-select--input {
    padding: 10px;
    font-size: 1rem;
    border: 1px solid rgb(255, 159, 67);
} */
</style>
<script>
var textLength=40;
var subtitleLength=85;
export default {
  data(){
      return {
        locale: this.$i18n.locale,
        news:1,
        newsOption:{
          en:[
            {text: 'Latest News', value: 1},
            {text: 'All News', value: 2}

          ],
          th:[
            {text: 'ล่าสุด', value: 1},
            {text: 'ทั้งหมด', value: 2}
          ]
        },
        card_9: {
                title: 'Vuesax Admin Loer adfkjlsfdlkdfjaldddddddddddddddddddddddddddddddddddddddddddddddsdfjlkfjsldfjldkfjsdlf',
                subtitle: 'by Pixinvent Creative Studio sdfljsafdlasd sdsdsafdcsfsdfasdfasdfasdfc sdf sdfsssssssssssssssssssssssssssssssssssaaaaaaaaaaaaaaaaa  sdfs df  sdf s df sadf sa d sa fd af dsf a sf sa fd sfd  af sa df sa df s fs d  s f sfdlfdjlkaskjfdl;kafj alksdjflkakdjf lsdfjalkdjls kjfdsldjflskdflkasdfmlk',
                img: 'content-img-4.jpg',
                footer_text_1_icon: 'ThumbsUpIcon',
                footer_text_1: 368,
                footer_text_2_icon: 'MessageSquareIcon',
                footer_text_2: 341,
                footer_text_3_icon: 'ThumbsDownIcon',
                footer_text_3: 23,
            },
        card_8: {
                title: 'Vuesax Admin Loer adfkjlsfdlkdfjalsdfjlkfjsldfjldkfjsdlf',
                subtitle: 'English Conversation เรียนได้ตั้งแต่พื้นฐานถึงระดับสูงเรียนได้ตั้งแต่พื้นฐานถึงระดับสูงเรียนได้ตั้งแต่พื้นฐานถึงระดับสูงเรียนได้ตั้งแต่พื้นฐานถึงระดับสูง',
                img: 'content-img-3.jpg',
                footer_text_1_icon: 'ThumbsUpIcon',
                footer_text_1: 368,
                footer_text_2_icon: 'MessageSquareIcon',
                footer_text_2: 341,
                footer_text_3_icon: 'ThumbsDownIcon',
                footer_text_3: 23,
            }
      }
  },
  computed:{
    news_option(){
      return this.newsOption[this.$i18n.locale];
    },
    listed(){
      let list=[];
      for(var i=0;i<10;i++){
        list.push(this.card_9);
        list.push(this.card_8);
      }
      return list;
    },
    computed_listed(){
      return this.listed.map((item=>{
        if(item.title.length>textLength+3){
          item.title=item.title.substring(0,textLength)+"..."
        }
        if(item.subtitle.length>subtitleLength+3){
          item.subtitle=item.subtitle.substring(0,subtitleLength)+"..."
        }
        return item;
      }))
    }
  },
  watch: {
        locale(val) {
            this.$i18n.locale = val;
            alert(val);
            // this.locale=val;

        }
    }
}
</script>

<style>

</style>
