\include "./includes.ly"

melody = \relative c'' {
  \clef treble
  \key c \major
  \time 4/4

  \mel
}

text = \lyricmode {
}

upper = \relative c'' {
  \clef treble
  \key c \major
  \time 4/4

  \basseAccords
}

lower = \relative c {
  \clef bass
  \key c \major
  \time 4/4

  \basse
}

\score {
  <<
   \new ChordNames {
    \set chordChanges = ##t
    \basse
  }
  \new Voice = "mel" \with { 
    \remove "Note_heads_engraver"
    \consists "Completion_heads_engraver"
    \remove "Rest_engraver"
    \consists "Completion_rest_engraver"
  }  \melody
  \new Lyrics \lyricsto mel \text
  \new PianoStaff <<
  \new Staff = "upper" \upper
  \new Staff = "lower" \lower
  >>
  >>
  \layout {
    \context { \Staff \RemoveEmptyStaves }
  }
  \midi { }
}