export const myMixins = {
  methods: {
   showName(){
     alert(this.name)
   } 
  },
  mounted() {
    console.log('挂载了')
  },
}
export const myMixins2 = {
  data(){
    return {
      x: 100,
      y: 200
    }
  }
}  