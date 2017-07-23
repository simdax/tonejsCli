import Play from '@/lib/Play'
import Tone from 'tone'

var play = new Play()

export default {
  'q' () {
    this.mels.reschedule(Tone.Transport.position, '-')
    play.acc(0)
  },
  's' () {
    this.mels.reschedule(Tone.Transport.position, '+')
    play.acc(1)
  }
}
