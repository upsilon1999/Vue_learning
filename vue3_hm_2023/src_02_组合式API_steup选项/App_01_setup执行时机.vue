<script>
//setup
//1.执行时机，比beforeCreate还要早
//2.由于比create还要早，setup函数中，获取不到this(this是undefined)
export default {
  setup () {
    console.log("setup函数");
  },
  beforeCreate () {
    console.log("beforeCreate函数");
  }
}
</script>