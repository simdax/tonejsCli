import Play from '@/lib/Play'

var play = new Play()

export default {
  'q,l' () {
    this.record.reschedule('-')
    this.$refs.ronds.on(0)
    play.acc(0)
  },
  's,m' () {
    this.record.reschedule('+')
    this.$refs.ronds.on(1)
    play.acc(1)
  }
}
